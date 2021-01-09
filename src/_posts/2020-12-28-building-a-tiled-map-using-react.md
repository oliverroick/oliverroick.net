---
layout: post
title:  "Building a tiled map using React"
alternate: An utterly pointless side project
date:   2020-12-28 10:00:00+00:00
category: writing
body_id: blog
description: An utterly pointless side project
---

There is a version of [Murphy's Law](https://en.wikipedia.org/wiki/Murphy%27s_law) that goes like this: 

> If there is a wrong way to do something, then someone will do it.

It can easily be applied to modern-day web development: If there is a way to build something using React someone will do it. 

I am no different than your average, bearded hipster developer, who works in some old warehouse in East London. When I came across an [Observable notebook](https://observablehq.com/@mourner/simple-web-map), which explains how modern web mapping libraries work, one of the first thoughts that crossed my mind was that this could be built using React. 

And that's what I did. I built a [React app that displays tiled maps](https://github.com/oliverroick/react-tile-map) and allows humans to pan and zoom. Because we're in a global pandemic, and there's not much else to do. 

What an utterly pointless and ridiculous exercise. 

Using React to solve the problem of displaying a map and moving it around on the screen is, of course, far from ideal. React is good to divide a user interface into components, for putting boxes into boxes: A map has layers, which have tiles. React isn't helpful to do the heavy lifting needed for interactive maps: Converting coordinates between geographic and screen coordinate systems and scaling that to display thousands of complex vector geometries. 

You should never ship a solution like this to production. It solves a problem that has been solved before. [OpenLayers](https://openlayers.org/) and [LeafletJS](https://leafletjs.com/) are libraries that do web maps very well. These libraries are feature-rich and come with a much smaller footprint. The production build of my solution, which does next to nothing, weighs 140kb. LeafletJS, which covers pretty much any feature you will ever need weighs about the same[^1]. 

But the effort wasn't wasted. There are reasons why this and similar projects exist even though they will never be used by anyone. Creating for the sake of creating is fun, and it's not something you get to do a lot in your day job as a software developer. There is no need to justify decisions. It's a safe way to try out an idea without the consequences of a potential failure. If you lose interest, you just go back to playing Fortnite. Quite similar to the way children explore the world and learn. In the end, I have learned something — I have a better understanding of the fundamentals of mapping libraries and I know that oit should not have been built in the first place. 

On that note, I need to start thinking about my next project. I might write a tiled-map solution using Vue. Or Svelte. Elm anyone?

[^1]: Unzipped that is, according to [leafletjs.com](https://leafletjs.com/).
