---
layout: post
title:  "A link is a link; a button is a button"
date:   2020-06-14 10:00:00+01:00
category: "thoughts"
body_id: blog
description: 
---

When I was young, we started building websites without table layouts and [`marquee` elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee). [Semantic HTML](https://en.wikipedia.org/wiki/Semantic_HTML) was a cornerstone of that movement. It meant to use HTML, so the resulting markup only describes the structure of a page. Any presentational elements are removed, and the visual presentation of the content would be in the realm of CSS. 

With the advent of JavaScript frameworks in the last couple of years, we seem to have forgotten about this approach. 

Here is an example: The designer designs a call-to-action to look like a button even though clicking on it just opens a new page. On the same page, we have form, including a submit button. These buttons may look the same but they behave in different ways: One opens a new page, the submits the form. 

Engineers strive to optimise their code and remove duplication as much as as possible. A website is abstracted into a series of components. Both the link and the button look the same so we implement it in a `Button` component. How it behaves is defined by the properties you pass. Provide a URL to open a new page, pass an `onClick` handler and it executes some JavaScript code. 

Imagine you are a lawyer and decided to wear a checked flannel shirt and overalls to court instead of a suit. What do you call yourself? A lumberjack that does lawyer work or a lawyer in a lumberjack outfit?

Components should be abstracted according to what they do, not how they look. It's a component's job that defines the lines of separation to other, similar components. 

In the example above, we have to render a `button` HTML element and bind the `onClick` handler if we want to use the button in a form. For a link, we render an `a` element including the corresponding `src` attribute. Image, we are using react-router. Then have third case to render a `Link` component for internal navigation. The internal logic gets messy quickly. Likewise, what if you need a link that looks like a classic link: blue, underlined text. Would that be a new component? 

To remove duplication of visual representation, we use CSS. A class `button` can be applied to pretty much any element to make it look like a button.
