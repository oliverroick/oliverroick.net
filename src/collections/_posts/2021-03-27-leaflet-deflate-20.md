---
layout: post
title: Leaflet.Deflate 2.0 is now available
description: New markercluster options, a smaller package and more documentation.
date:   2021-03-27 11:00:00+00:00
category: news
---

I published a [new release of Leaflet.Deflate](https://github.com/oliverroick/Leaflet.Deflate/releases/tag/v2.0.0). Leaflet.Deflate is a plugin for the web-mapping library [Leaflet](https://leafletjs.com). It improves the readability of feature-heavy maps by converting features to markers on smaller zoom levels.

Version 2.0 includes a breaking change and a couple of more minor improvements:

* Following a [previous release](https://github.com/oliverroick/Leaflet.Deflate/releases/tag/v1.4.0) that introduced a new way to inject layers to control how deflated features are displayed, I removed options `markerCluster` and `markerClusterOptions` from the API. This change will affect you if you are using [Leaflet.Markercluster](https://github.com/Leaflet/Leaflet.markercluster) to group markers. To upgrade to the new API, initialise a `MarkerClusterGroup` and inject it via the `markerLayer` option. [Follow the example code to see how it’s done](https://github.com/oliverroick/Leaflet.Deflate#cluster-markers).
* The unpacked size of the package is now 42.8 kB — down from 10.9 MB. I removed the examples and other files which are not necessary to install and run the library. All examples can still be accessed via the repository.
* According to NPM's download statistics, a significant number of developers still run older versions, including the now four-and-a-half year old 0.3. I have updated the README to make it easier to find and access [documentation for older releases](https://github.com/oliverroick/Leaflet.Deflate#previous-releases). You really should upgrade to a later version, though, if you’re still using 0.3.
