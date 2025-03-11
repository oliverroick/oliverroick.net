---
category: portfolio
layout: portfolio
title: Leaflet.Deflate
description: A Leaflet plugin to deflate features in lower zoom levels.
dates: since 2015
links:
  - label: Source on GitHub
    href: https://github.com/oliverroick/Leaflet.Deflate
tech:
  - LeafletJS
  - Jest
  - Terser
---

It’s a common problem with interactive dynamic web maps. Zoom the map out too far and features become illegible because their pixel size becomes too small.

![](/img/portfolio/leaflet-deflate.gif)

Leaflet.Deflate is a plugin for mapping library [LeafletJS](https://leafletjs.com) that improves the readability of large-scale web maps. It substitutes polygons and lines with markers when their screen size falls below a defined threshold.
