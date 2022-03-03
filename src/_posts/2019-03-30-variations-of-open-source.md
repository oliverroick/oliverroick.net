---
layout: post
title:  "Variations of Open Source"
date:   2019-03-30 08:30:00+02:00
image: thoughts
category: writing
body_id: blog
description: One is about giving back, the other is about business.
---

There are two types of open-source: Problem-driven open-source projects and business-driven projects. 

Problem-driven open-source projects are created to solve a problem; the solution is distributed openly for others to use. Their creators and maintainers have a true open-source mindset; the projects have no strings attached. You can use the software on its own; the software doesn’t depend on any other services to be useful. Examples for this are manifold: Use Django to build a web application; use GDAL to convert geographic data between different formats; use QGIS to analyse geo-information or design a map. 

Business-driven open-source projects are released under an open license – you can use the software for free, dig into the source code and provide improvements; all attributes which they share with problem-driven open-source projects. However, you can use business-driven open-source projects only in the context of other, usually proprietary services. Take, for example, [esri-leaflet](https://github.com/Esri/esri-leaflet). It allows you to include maps served from an ArcGIS service into a Leaflet map. It’s technically open-source, but it’s useless if you don’t have an ArcGIS license. The purpose of these projects is not to solve a problem and freely distribute the solution – the purpose of these projects is to increase the market share of proprietary systems by providing convenient interfaces that developers know and love. 

The possibilities of problem-driven open source are virtually limitless. Users expose the software to a sheer number of use cases. As a result, it gets better over time as problems are identified and fixed and new features are added to support these different use cases.

Business-driven open source is limited by the functionality and problems of its dependency software. If you want to add a new feature to the open-source library, it needs to be supported the dependency software. If you provide a bug fix to the open-source library, the fix is worthless if the same problem propagates through to the dependency software. You will always depend on their schedule.

As a developer coming from solely working with problem-driven open source into the business-driven world, this is a painful realisation. It’s like getting your feet cut off – the coffee shop is just across the street, you know how to get there to get a coffee, but you’ll have to wait for the carer to wheel you over in a wheelchair. 
