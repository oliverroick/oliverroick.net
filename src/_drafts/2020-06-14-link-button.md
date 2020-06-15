---
layout: post
title:  "A link is a link; a button is a button"
date:   2020-06-14 10:00:00+01:00
category: "thoughts"
body_id: blog
description: 
---

Designers tend to design call to actions to look like buttons even though clicking on them just opens a new page. To submit forms, you place a button at the bottom of the form. These buttons may look the same but they behave in a different way when you click them: One opens a new page, the other executes a certain functionality. 

Engineers strive to optimise their code and remove duplication as much as as possible. With today's front-end frameworks we abstract functionality into components and reuse it wherever you see fit. Both the link and the button look the same so we implement it in a `Button` component. How it behaves is defined by the properties you pass. Provide a URL to open a new page, pass an `onClick` handler and it executes some JavaScript code. 

Imagine you are a lawyer and decided to wear a checked flannel shirt and overalls to court instead of a suit. What do you call yourself? A lumberjack that does lawyer work or a lawyer in a lumberjack outfit?

Components should be abstracted according to what they do, not how they look. It's a component's job that defines the lines of separation to other, similar components. 

In the example above, we have to render a `button` HTML element and bind the `onClick` handler if we want to use the button in a form. For a link, we render an `a` element including the corresponding `src` attribute. Image, we are using react-router. Then have third case to render a `Link` component for internal navigation. The internal logic gets messy quickly. Likewise, what if you need a link that looks like a classic link: blue, underlined text. Would that be a new component? 

To remove duplication of visual representation, we use CSS. A class `button` can be applied to pretty much any element to make it look like a button.
