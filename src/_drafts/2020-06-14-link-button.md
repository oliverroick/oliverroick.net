---
layout: post
title:  "A link is a link, a button is a button"
date:   2020-06-14 10:00:00+01:00
category: "thoughts"
body_id: blog
description: 
---

Designers tend to design call to actions to look like buttons even though clicking on them just opens a new page. To submit forms you place a button at the of the form. These buttons may look just like the call to action but they behave in a different way: They don't open a new page, they executed a certain functionality when you click on them. 

Engineers strive to optimise their code and remove duplication as much as as possible. With today's front-end frameworks you can build a component and reuse it wherever you see fit. Something that looks like a button can be implemented into a `Button` component. Provide it with a URL to open a new page, pass an `onClick` handler and it executes some JavaScript code. 

The component's internal logic quickly gets messy. What if you have link that should look like a classic link: blue, underlined text? Use react-router? Then you would have a third option: Render a `Link` component to open a new page inside your web app.

Imagine you are a lawyer and decided one day to wear a checked flannel shirt and overalls to court instead of a suit. What do you call yourself? A lumberjack that does lawyer work or a lawyer in a lumberjack outfit?

Components should abstracted according to what they do not how they look. 