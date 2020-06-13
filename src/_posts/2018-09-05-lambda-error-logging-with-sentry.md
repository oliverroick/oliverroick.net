---
layout: post
title:  "Lambda Error Logging with Sentry"
date:   2018-09-06 19:30:00+02:00
category: "code"
highlight_code: true
body_id: blog
---

{% post_update %}
The solution discussed here uses Raven, Sentry's discontinued JavaScript SDK. Since I published the post, [@sentry/node](https://www.npmjs.com/package/@sentry/node) has been released, which [makes logging on AWS Lambda](https://docs.sentry.io/platforms/node/serverless/) a lot simpler.
{% endpost_update %}

Every unhandled exception is a bug in your software. Things will go wrong in your Lambda function, and you want to know about it. 

AWS provides extensive logging for Lambda functions via [Cloudwatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html), but it is a cumbersome job to sift through all the logs, identify the exceptions and group similar errors for a bug report. [Sentry](https://sentry.io/) makes this job easier. Setting up Sentry error logging for a Lambda function is not as straightforward as, say, using a Django middleware. This post explores how we have set up error logging with Sentry for a JavaScript Lambda handler. 

=====

## Building a wrapper
[`Raven`](https://github.com/getsentry/sentry-javascript), a library maintained by Sentry, abstracts away all the hard parts of sending errors to Sentry. What we need to take care of is to: 

1. Catch all unhandled exceptions, 
2. Pass them to Sentry using `Raven`, 
3. Return the appropriate HTTP response to the client, and
4. Ensure that the Lambda handler terminates correctly. 

The natural way to achieve handling of all exceptions in a Lambda handler is to wrap it in a `try..catch` block. Server-less APIs usually consist of several endpoints; we want to apply error handling to all Lambda handlers without repeating to much boilerplate code. Ideally, we would implement error handling in a wrapper module, that we can apply to each Lambda handler in our application. 

{% highlight javascript %}
// lambdaHandler.js

import sentryHandler from 'sentry';

const lambdaHandler = async handler(event) => {
  body: "Success",
  statusCode: 200
}

export default sentryHandler(lambdaHandler);
{% endhighlight %}

Instead of directly exporting the handler function, we export the return value of `SentryWrapper.handler`, which returns a function that executes  `lambdaHandler` while also catching all errors raised during execution. 

How this works becomes more clear when we look at  `SentryWrapper` itself:

{% highlight javascript %}
// sentry.js

export default sentryHandler(lambdaHandler) {
  return asnyc (event) => {
    try {
      return await lambdaHandler(event);
    } catch (error) {
      // reporting the error
    }
  }
}
{% endhighlight %}

`sentryHandler`  is a higher-order function, that takes the  `lambdaHandler` as an argument and returns a function that executes `lambdaHandler`. Since we’re exporting the returned result in `lambdaHandler.js`, the returned function is as the Lambda handler, which in turn executes the original `lambdaHandler`. The only difference is the `try..catch` block around it. 

Now that we have set up basic error handling, we can take care of reporting the error to Sentry. The library `Raven`, maintained by Sentry, provides the functionality we need to report errors to Sentry. So it’s a matter of setting up the `Raven` client and reporting the error using `Raven.captureException`. In the example below, we’re reading the Sentry DSN from the environment variable `SENTRY_DSN`. 

{% highlight javascript %}
// sentry.js

export default sentryHandler(lambdaHandler) {
  return asnyc (event) => {
    try {
      return await lambdaHandler(event);
    } catch (error) {
      Raven.config(process.env.SENTRY_DSN).install();
      Raven.captureException(error);
    }
  }
}
{% endhighlight %}

`Raven.captureException` is an asynchronous function and the Lambda handler doesn’t wait for its successful execution. Since `Raven.captureException` doesn’t return a value, it considers all operations completed and completes the execution of the Lambda handler itself, which also terminates all ongoing asynchronous operations. The error is never logged with Sentry. 

`captureException`, however, accepts a function as a second parameter, which acts as the callback after the error is logged with Sentry. We can use that to ensure the error reported before terminating the Lambda handler. By returning a `Promise` after we caught an exception we can force the Lambda execution to stay active until the `Promise` is resolved or rejected. We can resolve the `Promise` inside the `captureException` callback; i.e., as soon as the exception was successfully logged with Sentry. Resolving the `Promise` with an HTTP 500 error response also allows us to notify the client about the error. We extend our previous example accordingly:

{% highlight javascript %}
// sentry.js

export default sentryHandler(lambdaHandler) {
  return asnyc (event) => {
    try {
      return await lambdaHandler(event);
    } catch (error) {
      Raven.config(process.env.SENTRY_DSN).install();

      return new Promise((resolve) => {
        Raven.captureException(error, () => {
          resolve({
            body: JSON.stringify({
              err: error.message,
              msg: 'An error has occured. Our developers have been informed.'
            }),
            statusCode: 500
          });
        });
      });  
    }
  }
}
{% endhighlight %}

## Source maps
If you use TypeScript or ES2016 to write your application, you’re going to deploy compiled source to AWS. The stack trace on Sentry then shows the compiled, unreadable code, which difficult to debug. Source maps provide the mapping from the compiled code to the original source, thus allowing you to debug the original, usually more readable source. Whatever processing tool you use, there is usually a way to enable the creation of source maps next to the compiled sources. With Webpack it’s as simple as enabling `devtool: 'source-map'` in the Webpack config. 

To use source maps on Sentry, we need to upload the source maps as artefacts to Sentry. Artefacts exist in the context of a release; for each release, you use a different set of source maps. It’s important to specify the release both for when you upload source maps as artefacts and when you log an error. I won’t go into the details of uploading source maps to Sentry as they have already [documented various ways](https://docs.sentry.io/clients/javascript/sourcemaps/) of doing that. Again, we have used Webpack to build our code and the plugin  [`SentryPlugin`](https://github.com/getsentry/sentry-webpack-plugin) to upload artefacts during the build process. 

Since the source maps are attached to a release in Sentry, we need to identify the release deployed to out Lambda function. The current release is defined when setting up the `Raven` client.

{% highlight javascript %}
Raven.config(process.env.SENTRY_DSN, {
  release: '1.0'
}).install();
{% endhighlight %}

The final thing that is left to do is to normalise the paths of the script that we send to Sentry so the source maps can be mapped accordingly. The naming of source maps uploaded to Sentry follows the path in the output directory of the built scripts. If the file that contains the error is built to `/app_path/dist/projects/create.js` then Sentry expects to find the source map under `~/projects/create.js.map`, which is how the artefact is named in Sentry. 

On AWS Lambda, however, the script is usually hosted under `/var/task/`, resulting in the path `/var/task/projects/create.js`. In the event of an exception, this is the path that appears on the corresponding stack trace, so Sentry won’t be able to resolve the built code to its original source. It can’t find a source map called `/var/task/projects/create.js.map`. 

Fortunately, we can rewrite the path using in a `dataCallback` function, which is defined in the Raven config and allows us to rewrite the data that is sent to Sentry. [Sentry’s documentation on TypeScript](https://docs.sentry.io/clients/node/typescript/) already provides us with a good example of how to do the rewrite. When we run our app on AWS, we can assume that the `root` directory resolves to `/var/task`, so we can use a constant here instead of working out the directory dynamically. 

After adding the data callback, the final result should look like this:

{% highlight javascript %}
// sentry.js

const getSourceMaps = (data) => {
  const stacktrace: any = data.exception && data.exception[0].stacktrace;
  if (stacktrace && stacktrace.frames) {
    stacktrace.frames.forEach((frame: any) => {
      frame.filename = 'app:///' + path.relative('/var/task/', frame.filename);
    });
  }

  return data;
};

export default sentryHandler(lambdaHandler) {
  return asnyc (event) => {
    try {
      return await lambdaHandler(event);
    } catch (error) {
      Raven.config(process.env.SENTRY_DSN, {
        release: '1.0',
        dataCallback: getSourceMaps,
      }).install();

      return new Promise((resolve) => {
        Raven.captureException(error, () => {
          resolve({
            body: JSON.stringify({
              err: error.message,
              msg: 'An error has occured. Our developers have been informed.'
            }),
            statusCode: 500
          });
        });
      });  
    }
  }
}
{% endhighlight %}
