---
layout: post
title:  "Introducing SuperSimpleEvents"
description: Extending JavaScript objects with eventing functionality.
date:   2014-10-12 10:00:00
image: code
category: writing
highlight_code: true
---

Across various personal and professional projects, I needed a simple solution to extend prototypes with eventing functionality in JavaScript that is independent from third-party extensions. [SuperSimpleEvents](https://github.com/oliverroick/SuperSimpleEvents) is my solution — a super simple event emitter for JavaScript.

=====

Usage is simple:

(1) Extend your prototypes with eventing functions

{% highlight javascript %}
function YourPrototype() {
    // Do stuff here
}

// Extend the prototype
YourPrototype.prototype = new EventEmitter();

// Reset the constructor to YourPrototype
YourPrototype.constructor = YourPrototype;
{% endhighlight %}

(2) Register an event listener

{% highlight javascript %}
function callback(params) {
    // do something with the params returned by the event emitter
    console.log(params.something); // new-value
}

var emitter = YourPrototype();
emitter.registerListener('something:changed', callback);
{% endhighlight %}

(3) Remove an event listener

{% highlight javascript %}
emitter.removeListener('event-name', callback);
{% endhighlight %}

(4) Emit an event

{% highlight javascript %}
YourPrototype.prototype.changeSomething() = function () {
    // Change something

    this.emitEvent('something:changed', {something: 'new-value'})
}
{% endhighlight %}

Simple as that. Get in touch, if you want to know more.
