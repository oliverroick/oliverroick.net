---
layout: link
category: links
body_id: links
date: 2021-08-14 13:00:00+01:00
highlight_code: true
title: Leaflet.Deflate 2.1 is now available
description: "Link: https://github.com/oliverroick/Leaflet.Deflate/releases/tag/v2.1.0"
link: https://github.com/oliverroick/Leaflet.Deflate/releases/tag/v2.1.0
---

A new release of Leaflet.Deflate is now available. Leaflet.Deflate 2.1 introduces a new option, `greedyCollapse`, to specify when features will collapse. 

With `greedyCollapse` set to `true`, a feature collapses when either its width or height falls below the specified threshold. This is the default, and it matches the behaviour from previous versions. Set `greedyCollapse` to `false`, and features will collapse only of both width and height fall below the specified threshold. This behaviour comes in handy when you have many “long” features on your map. 

The following animation illustrates the behaviour:

<figure>
    <img src="/img/greedy-deflate.gif" alt="Animation showing the effect of greedyCollapse in Leaflet.Deflate">
    <figcaption>Background tiles: © <a href="https://www.mapbox.com/feedback/">Mapbox</a>. Map data: © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.</figcaption>
</figure>

The <b>top polygon</b> collapses when one of the sides' length is bolow the threshold. This is the default behaviour. With <code>greedyCollapse: false</code>, the <b>bottom polygon</b> collapses at a lower zoom level when both sides' length are below the threshold.



---

My thanks to [Simonas Gildutis](https://github.com/simonasdev) for contributing the new feature. 