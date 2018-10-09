---
layout: post
title:  "Looping AWS Step Functions"
date:   2018-10-09 16:30:00+02:00
category: "code"
highlight_code: true
body_id: blog
---

I recently started tinkering with [Step Functions](https://aws.amazon.com/step-functions/) for a pet project, [Nea](https://github.com/oliverroick/nea). For performance reasons, I wanted to download and process individual feeds in parallel using instances of the same Lambda function. This isn't currently possible using Step Functions building blocks, so I implemented a workaround by designing a loop into my Step Functions state machine. 

=====

Nea is a service that takes a list of feed URLs, parses the sources, and sends me an email with all posts from last seven days. The application is implemented using a series of Lambda functions; one that downloads and parses a feed, one that combines the results and creates the email content, and one that sends the email; state transitions are managed using Step Functions. 

In one of the first iterations, all feeds were processed inside one Lambda function. In a loop, we downloaded and processed each feed and then passed the combined result to the following Lambda, which works well for a small list of feeds. Since we’re downloading the feeds via the Web, we need to consider network latencies – a large number of feeds can easily lead to a timeout of the Lambda execution. 

What I wanted to do instead, was to process each of the feeds individually, one per Lambda execution. We take a list of 20 feeds and kick off 20 instances of the same Lambda function for parallel processing, each of them dealing with one feed, and then combine individual results. 

![Parallel Processing in Lambda](/img/step-functions-loop-1.png)

Unfortunately, parallel processing is restricted to [one use case](https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-parallel-state.html): Using the same input and process it in different ways. For example, you could find the shortest route using different routing engines; with a start- and endpoint as input that you pass to three different Lambda functions calculating individual results in parallel. 

Using the building blocks that Step Functions provide us, we can solve the problem using the best of both worlds: Leveraging a [Choice State](https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-choice-state.html) to decide whether to run the preceding state again or whether to pass the results to the next state, we can build a loop that executes one Lambda function at a time to process feeds individually.

![Step Functions Loop](/img/step-functions-loop-2.png)

The configuration shows how such a state machine can be designed. It is somewhat similar for [GOTO statements](https://en.wikipedia.org/wiki/Goto) in older programming languages. 

```json
{
  "StartAt": "GetBlog",
  "States": {
    "GetBlog": {
      "Type": "Task",
      "Resource": "${getBlogArn}",
      "Next": "LoopFeedsChoice"
    },
    "LoopFeedsChoice": {
      "Type": "Choice",
      "Choices": [{
        "Variable": "$.urls",
        "NumericEquals": -1,
        "Next": "ComposeResults"
      }],
      "Default": "GetBlog"
    },
    "ComposeResults": {
      "Type": "Task",
      "Resource": "${composeResultsArn}",
      "Next": "SendEmail"
    },
    "MoreLambdas" : {

    }
  }
}
```
 
The list of feed URLs, which we need to process, is passed with the `urls` field of the event data. Inside `GetBlog`, we remove one URL from `urls`, download and process the feed and add the result to another list that stores the results. The `LoopFeedsChoice`  checks whether the contents of the URLs field equals `-1` and then passes the event data to `ComposeResults` if there are no more elements in the list. Inside `GetBlog`, we need to make sure `urls` is set to `-1` when we remove the last URL from `urls`. 

There are some caveats to this pattern. We need to make sure the data returned from the Lambda inside the loop is formatted correctly. That means besides returning the processed results, we also need to mutate the input data and add it to the return value. In the example above, we need to remove the feed URL that we just processed from the `urls` input. 

Another caveat to consider is that AWS charges you per transition in a Step functions state machine. If you want to process list with a large number of items or you want to execute more than one Lambda function in a loop, then the number of transitions can multiply. In those cases, this approach probably is not feasible. 
