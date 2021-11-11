---
layout: link
category: links
body_id: links
date: 2021-11-11 18:25:00-00:00
highlight_code: true
title: MapboxGL Now Supports Non-Mercator Projections
description: "Link: https://www.mapbox.com/blog/mapbox-gl-js-v2-6"
link: https://www.mapbox.com/blog/mapbox-gl-js-v2-6
---

Mapbox GL’s [latest release](https://github.com/mapbox/mapbox-gl-js/releases/tag/v2.6.0) introduces support for additional map projections that developers can use to create web maps:

- [Albers](https://en.wikipedia.org/wiki/Albers_projection)
- [Equal Earth](https://en.wikipedia.org/wiki/Equal_Earth_projection)
- [Equirectangular](https://en.wikipedia.org/wiki/Equirectangular_projection)
- [Lambert conformal conic](https://en.wikipedia.org/wiki/Lambert_conformal_conic_projection)
- [Natural Earth](https://en.wikipedia.org/wiki/Natural_Earth_projection), and
- [Winkel tripel](https://en.wikipedia.org/wiki/Winkel_tripel_projection)

The additions break with a long-lasting custom in interactive web mapping. Web maps are typically rendered using the Mercator projection, primarily for practical reasons: A square map is easier to divide into tiles. And Mercator preserves angles which is essential for navigation, the primary use case for early web maps.  

Every web projection has trade-offs.  [Mercator inflates areas towards the poles](https://twitter.com/mourner/status/1458169026170048517):

> […] Mercator heavily distorts sizes on a global scale, inflating shapes the farther away they are from the equator. This is why most people living in the Internet era think that Greenland is as big as Africa, even though it’s actually 14 (!) times smaller.

But non-conformal projections, in large scales, distort shapes towards the edges of the map. Mapbox’ implementation solves this problem by seamlessly transitioning from the selected projection to Mercator in higher zoom levels, minimising distortions at every zoom level.[^1] You get the best of both worlds. 

The new map projections open up new possibilities for interactive thematic mapping, especially for maps of continents or the whole world.

[^1]: I created an [Observable notebook](https://observablehq.com/@oliverroick/mapboxgl-custom-projections) to demonstrate different projections, their configuration, and how a map transitions between projections while zooming. 