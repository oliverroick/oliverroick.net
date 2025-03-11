---
layout: post
title:  "Giving Feedback"
description: Why regular and consistent feedback is a core tenet of good software.
date:   2016-09-06 09:30:00+02:00
image: thoughts
category: writing
highlight_code: true
body_id: blog
---

Giving the right feedback in software is difficult. Knowing when to display messages, how many messages to show and getting the wording right is a piece of art. You want to give sufficient information about the state of the system, but also don’t want to overload users with too many messages.

=====

When we were discussing info messages (success, warnings, and errors) and their timing, a coworker suggested not to show any success messages. If the page changes and there is no error message shown, the action was successful.

While this sounded logical to me at the time, I didn’t agree. Too many time, I have seen users get confused when there is no feedback on their previous action.

The problem is because of varying conceptual models (something I understood only recently when reading Don Norman’s [_The Design of Everyday Things_](http://www.jnd.org/books/design-of-everyday-things-revised.html)). A conceptual model is like a mental map people have in their minds about how a system works. People form conceptual models based on what they see when they use a system; i.e., its interface design and what this tells about how things work, and other sources, manuals, and documentation, for example.

A developer has a different, much more detailed conceptual model of the system they built than people using it. Developers know the system inside-out, whereas users only have an external view. The developer knows that there won’t be a success info when an action went ok; something they can infer from having inside knowledge of the system. The user, on the other hand, does not have this information — they expect feedback. Has the system recorded that I pressed the button? Is the new item created and stored in the database? These are usually reactions when there is not explicit feedback.

Hence the necessity for giving feedback. All the time, about everything.

Giving feedback when an action fails is an excellent opportunity to improve the user’s conceptual model. If a system requires complex input, detailed and well-written error messages and warnings will help users to avoid the same mistakes when they have to do the same task again. They learn about the internals of the system and what it expects — their conceptual model improves.

Logging of these errors is important too. Not only because we find out about bugs that need fixing, but also because we can learn how well our interface communicates. If a similar error occurs multiple times, then there might be a need to change the system to align with the user’s conceptual model or to improve the design to communicate better.
