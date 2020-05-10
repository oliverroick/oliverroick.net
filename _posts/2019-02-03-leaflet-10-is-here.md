---
layout: post
title:  "Leaflet.Deflate 1.0 is here"
date:   2019-02-03 15:00:00+02:00
category: "code"
body_id: blog
description: Announcing the release Leaflet.Deflate 1.0
---

The first iteration of Leaflet.Deflate was the result of some experiments we did during my time at [UCL ExCiteS](https://www.ucl.ac.uk/excites) when we tried to improve the legibility of the web maps on the Community Maps platform. While this first version and its following iterations worked well for many use cases, it never integrated well with Leaflet’s core concepts and thus other Leaflet plugins – especially since Leaflet 1.0 was released. For a good two years now, I periodically worked on improving Leaflet.Deflate, making it more stable, performant and – above all – integrate better with Leaflet and Leaflet plugins. So without further ado: [Leaflet.Deflate 1.0](https://github.com/oliverroick/Leaflet.Deflate) is here. 

=====

Leaflet.Deflate is a small library; there is just a handful of noteworthy changes and improvements:

- A complete rewrite of the library’s core concepts. Leaflet.Deflate now extends from `L.FeatureGroup`. It behaves like a proper layer. You can add features to the layer before you add the layer to the map. You can use it with layer-switcher controls. Also, it integrates better with plugins such as [Leaflet.Draw](https://github.com/Leaflet/Leaflet.draw) or [Leaflet.PolylineDecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator). 
- Improvement of performance of large datasets. We’re only deflating and inflating the features in the maps current viewport. 
- Custom markers. You can define them either by passing a custom icon or through a function allowing you to create markers based on a feature’s properties. 
- I added support for events, tooltips, and pop-ups. 

For different reasons, it has taken way to long to get that release done. I didn’t know the internals of Leaflet very well, in particular, how `FeatureGroup`s work. It just took too long to get the implementation in shape. Moreover, I don’t use the library much my projects these days so I could only work on it during non-work hours.

With this release, however, I feel that Leaflet.Deflate is in pretty good shape. It’s a sound basis for improvements so updates should follow more frequently in the future. Thanks to everyone for raising issues with me; getting to know different contexts in which Leaflet.Deflate is used helped to drive the development forward. 
