---
layout: post
title:  "Leaflet.Deflate 1.2"
date:   2020-01-19 20:00:00+00:00
category: "code"
body_id: blog
---

It has been about a year since I released [Leaflet.Deflate 1.0](/code/2019/leaflet-10-is-here.html). Back then, I spent a considerable amount of time to whip the library into shape. 

Leaflet.Deflate is in a good state. Downloads on NPM went up, the number of bug reports went down, people rarely ask for new features and [seem to like it](https://github.com/oliverroick/Leaflet.Deflate/stargazers). There is no need for frequent releases, which is a good thing. It indicates maturity and stability.

Nevertheless, there is work to do now and then, resulting in the release of [Leaflet.Deflate 1.2](https://www.npmjs.com/package/Leaflet.Deflate/v/1.2.0). The latest release contains two changes: 

* You can now specify a [`CircleMarker`](https://leafletjs.com/reference-1.6.0.html#circlemarker) for deflated features. The behaviour is very similar to using standard markers. You can specify `CircleMarker` options [using an object or a function](https://github.com/oliverroick/Leaflet.Deflate#circlemarkers). 
* I fixed a bug that resulted in an infinite loop when calculating the zoom level at which we switch to the deflated version of a feature. The bug affected users using custom map projections only.

Beyond that, some changes do not affect Leaflet.Deflate's functionality directly:

* I reviewed the README and fixed typos, improved the wording, and cleaned up some examples, and
* I updated the dependencies to their latest versions, which only affects you when you develop for Leaflet.Deflate. 

---

With that, I will attend to other projects again unless someone [files a bug or requests a new feature](https://github.com/oliverroick/Leaflet.Deflate/issues). All input is welcome. 
