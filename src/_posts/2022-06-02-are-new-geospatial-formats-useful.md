---
layout: link
category: links
body_id: links
date: 2022-06-02 17:26:00+10:00
highlight_code: true
title: Are New Geospatial Formats Useful?
description: "Link: https://macwright.com/2022/05/30/new-formats.html"
link: https://macwright.com/2022/05/30/new-formats.html
---

Tom MacWright explores whether newer geo-data formats, like [FlatGeobuf](/links/2022/flatgeobuf-implementers-guide.html), Zarr, GeoParquet, Arrow, or COGs, are useful for applications making frequent updates to the data. 

The post dives deep into some of the characteristics of these data formats, including compression, random access, and random writes, and concludes that they are optimised for reading data and that the benefits for writes are limited:

> I like these new formats and I’ll support them, but do they benefit a usecase like  [Placemark](https://www.placemark.io/) ? If you’re on the web, and have data that you expect to update pretty often, are there wins to be had with new geospatial formats? I’m not sure.
