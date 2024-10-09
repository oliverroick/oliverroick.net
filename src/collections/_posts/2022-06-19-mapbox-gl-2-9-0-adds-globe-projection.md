---
layout: link
category: links
body_id: links
date: 2022-06-19 08:25:00+10:00
highlight_code: true
title: Mapbox GL JS 2.9.0 Adds Globe Projection
description: "Link: https://github.com/mapbox/mapbox-gl-js/releases/tag/v2.9.0"
link: https://github.com/mapbox/mapbox-gl-js/releases/tag/v2.9.0
---

Mapbox GL JS’ latest release (v2.9.0) adds a new globe projection, which enables presenting web maps in a way that allows viewers to interact with geographic data much like you would interact with a physical globe. 

<figure class="grid">
  <picture>
    <source srcset="/img/blog/globe.webp, /img/blog/globe@2x.webp 2x" type="image/webp">
    <source srcset="/img/blog/globe.jpg, /img/blog/globe@2x.jpg 2x" type="image/jpeg"> 
    <img src="/img/blog/globe@2x.jpg" alt="A globe rendered with Mapbox GL JS, showing Africa in the center.">
  </picture>
  <figcaption>
    <cite>Background tiles: © Mapbox. Map data: © OpenStreetMap contributors.</cite>
  </figcaption>
</figure>

From the release notes:

> This new projection displays the map as a 3d globe and can be enabled by either passing `projection: globe` to the map constructor or by calling `map.setProjection(‘globe’)`. All layers are supported by globe except for Custom Layers and Sky.

The globe projection is a continuation from [custom projections](/links/2021/mapboxgl-now-supports-non-mercator-projections.html), which were introduced a couple of months ago and, for the first time, allowed creating  interactive web maps using projections other than Web Mercator. While custom projections were ideal to present data restricted to countries or continents and without the hefty distortions that come with Web Mercator, the globe projection allows to do the same but on a global scale; ideal to present global data sets like visualisations of climate change. 
