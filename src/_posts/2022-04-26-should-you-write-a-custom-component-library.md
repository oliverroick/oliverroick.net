---
layout: post
category: writing
body_id: blog
date: 2022-04-26 18:25:00+01:00
highlight_code: true
title: Should You Write a Custom Component Library?
description: Probably not. You’re likely just reimplementing solutions to problems that have been solved elsewhere. 
---

Software developers want to solve every problem from first principles. Only when we control every aspect of a solution and every line of code can we sleep at night because we know our opinions are appropriately considered.

And so, every organisation builds a custom component library. Obviously, every organisation faces problems so unique that a custom solution is warranted. Because the problem requires a particular approach that must fit the organisation’s philosophy and way of working—or so we’d like to think.

Throughout my career, I worked in different teams building very different products. I’ve worked in a startup creating building public-facing products, made software to support everyday internal operations of a national charity, and consulted for the public sector. We were building a component library in each of these settings, usually from scratch without dependencies. And in each of these settings, we discussed the same questions: Should we even do it — should we write your own component library? If so, where should we start? Should we build from a blank slate, or should we base our work on existing solutions?

Most in-house developed component libraries aren’t built to address functional requirements but to standardise how products look. The libraries are created to give developers the tools to build websites according to standards set out by a design team so designers can focus on solving new design problems. The functionality required to make the components usable is implemented as a by-product, so components provide more benefits than just a bundled set of CSS rules.

Like with anything front-end these days, many open-source component libraries already exist.  Some focus on implementing user interactions or accessibility features but do not include any UI design, such as [Headless UI](https://headlessui.dev), [React Aria](https://react-spectrum.adobe.com/react-aria/), or [Reach UI](https://reach.tech). Others provide full-featured and designed components, like [Chakra UI](https://chakra-ui.com); these components are usually themable so that they can be adapted to the product’s needs. And there are libraries, like [Tailwind CSS](https://tailwindcss.com), that focus on the UI but do not provide any functionality. 

With these existing solutions in mind, you probably don’t want to build and maintain a component library. At least you don’t want to make one from scratch without relying on any existing solutions. The majority of components you add to your library have already been implemented many times over: Buttons, modals, accordions, combo boxes, tabs or form elements. Not one of these components is unique to your project. Why not rely on an established library and learn how to theme it according to your in-house design standards? You’ll save time that you can spend on building additional components that are unique to your project’s needs? At Development Seed, most projects include maps, often requiring a layer switcher to add and remove data layers from the map display. That’s the component worth building because you won’t find it in a generic library.

There are, of course, exceptions. Institutions offering thousands of websites and services with precise accessibility and user experience requirements are better off maintaining in-house component libraries. Organisations like the [Government Digital Service](https://www.gov.uk/government/organisations/government-digital-service) spend hours researching user expectations and testing implementations so their services are accessible to anyone, independent of background or age. These organisations sweat the details of how errors in forms should be presented or how changes to an accordion’s state should be announced in screen readers. To roll out improvements quickly across many of their services, they need complete control over their UI components.

Your scrappy startup doesn’t do any of this. You might as well rely on an existing solution that is battle-tested. People have used open-source libraries in various contexts and provided feedback that the maintainers included in improvements. This work takes time and is labour-intensive. It requires many iterations to get it right. If you build a product, your product manager probably won’t give you the time to do this the right way. If you work in consulting, you’re already operating under a tight timeline. Open-source UI libraries surely are more thought-through and robust than anything you can ever build with your four-person front-end team. 

Starting with an open-source component library, instead of creating yet another one, allows you to focus on the aspects of your project that are genuinely unique. Re-inventing the wheel, and implementing patterns that have been solved, on the other hand, removes focus from the critical elements of your work. Invest your time into solving the problems that aren’t already solved.  