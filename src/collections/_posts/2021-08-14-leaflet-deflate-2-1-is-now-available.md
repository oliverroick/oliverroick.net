---
layout: post
category: news
date: 2021-08-14 13:00:00+01:00
highlight_code: true
title: Leaflet.Deflate 2.1 is now available
description: The latest release introduces the new greedyCollapse option.
---

A [new release of Leaflet.Deflate](https://github.com/oliverroick/Leaflet.Deflate/releases/tag/v2.1.0) is now available. Leaflet.Deflate 2.1 introduces a new option, `greedyCollapse`, to specify when features will collapse.

With `greedyCollapse` set to `true`, a feature collapses when either its width or height falls below the specified threshold. This is the default, and it matches the behaviour from previous versions. Set `greedyCollapse` to `false`, and features will collapse only of both width and height fall below the specified threshold. This behaviour comes in handy when you have many “long” features on your map.

<figure>
    <img src="/img/greedy-deflate.gif" alt="Animation showing the effect of greedyCollapse in Leaflet.Deflate">
    <figcaption>The <b>top polygon</b> collapses when one of the sides' length is below the threshold. This is the default behaviour. Without greedyCollapse, the <b>bottom polygon</b> collapses at a lower zoom level when both sides' length are below the threshold. <cite>(Background tiles: © <a href="https://www.mapbox.com/feedback/">Mapbox</a>. Map data: © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors)</cite></figcaption>
</figure>

---

My thanks to [Simonas Gildutis](https://github.com/simonasdev) for contributing the new feature.
