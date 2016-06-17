---
layout: post
title:  "A better fetch"
date:   2016-06-17 20:00:00+02:00
category: "code"
highlight_code: true
body_id: blog
---

I recently tried to make `Fetch` work with a REST API. Here’s what I found.

=====

The [WHATWG Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) is a replacement of `XMLHttpRequest` as the standard to retrieve resources across a network. Compared to `XMLHttpRequest`, `Fetch` provides a simplified and cleaner API that relies on promises instead of callbacks. 

Its use is straightforward:

{% highlight javascript %}
fetch('/some/url')
  .then((response) => {
    if (response.status >= 200 && response.status < 400) {
      return response.json()
    } else {
      return response.statusText
    }
  })
  .then(processResponse)
{% endhighlight %}

`fetch` returns a Promise containing a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Response_objects). The `Response` can be evaluated based on its status code. In the example above, we return the response body when the request was successful and the response status if not. 

In this implementation, however, it is not possible to handle unsuccessful requests _and_ process the response at the same time. When working with REST APIs, the response contains crucial details about the error. These details should be made available to the user. 

Consider a form to register as a new user. The new user attempts to register with an existing username; something you cannot validate on client-side. After submitting the form via the API, the server responds with status code `400`; the response contains details which user input caused the problem:

{% highlight http %}
HTTP/1.1 400 OK
Content-Type: application/json

{
  "error": {
    "username": "Another user has already registered 
                 with this user name."
  }
}
{% endhighlight %}

One could obviously return the error response using `response.json()` just like you would process a successful response. But there is no way to tell whether the request was successful or has failed in the following `.then()`, other than parsing the response itself. And we loose response metadata, such as the status code. If the server responds with status `401 Unauthorized` the client can handle that and redirect the user to a login page. This is very difficult to achieve if you don’t have response metadata available.

If the `Promise` was rejected whenever the request failed and then response content and some metadata were returned instead of another `Promise`, the error could be handled in the Promise’s rejection handler.

{% highlight javascript %}
request('/some/url/').
  .then(
    (success) => console.log(success),
    (error) => console.log(error.code, error.content)
  )
{% endhighlight %}

So I went ahead and built [`better-fetch`](https:/github.com/oliverroick/better-fetch). It’s a tiny library that behaves as described above. Consider it as an experiment for now, as I have yet to use this approach in production.
