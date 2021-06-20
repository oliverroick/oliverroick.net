---
layout: link
category: links
body_id: links
date: 2021-06-20 15:51:00+01:00
highlight_code: true
title: PostGIS at 20, The Beginning
description: 
link: http://blog.cleverelephant.ca/2021/05/postgis-20-years.html
---

Paul Ramsey, the creator of PostGIS, looks back on the early days of the spatial database extension for Postgres:

> When Dave had a working prototype, we hooked it up to our little applet and the thing **sang**. It was wonderfully quick, even when we loaded up quite large tables, zooming around the spatial data and drawing our maps. This is something we’d only seen on fancy XWindows displays on UNIX workstations and now were were doing it in an applet on ordinary PC. It was quite amazing.

Around 2004, after exclusively doing GIS only in [ArcInfo](https://en.wikipedia.org/wiki/ArcInfo), I worked on an online atlas for a local environment agency. We used PostGIS, MapServer and the [Rosa Java applet](http://www.maptools.org/rosa/) in the front-end, all duct-taped together by some pretty awful PHP code. Nevertheless, there were solutions now that allowed us to put interactive maps on websites. Being able to store and retrieve data from a performing open-source database was one of the foundations that made modern-day Web GIS possible. 

I‘ve hardly worked with any other spatial database since, other than occasionally toying around with CouchDB or SpatialLite. 