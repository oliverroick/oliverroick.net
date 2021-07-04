---
layout: link
category: links
body_id: links
date: 2021-07-04 11:31:00+01:00
highlight_code: true
title: Probably gonna need this
description: 
link: https://simonwillison.net/2021/Jul/1/pagnis/
---

There is work that looks like overhead for a personal project or seems to hold you back at the beginning of a professional project but will pay off later in the product lifecycle. Simon Willison calls them PAGNIs — probably are gonna need it.

> When should you over-ride YAGNI? When the cost of adding something later is so dramatically expensive compared with the cost of adding it early on that it’s worth taking the risk. On [sic] when you know from experience that an initial investment will pay off many times over.

Test automation, continuous integration and automated deployment are non-negotiable PAGNIs. API pagination, time-stamping records, and logging API traffic are others I didn’t think of initially but are just as important. 

Logging request payloads proved to be especially valuable in previous projects I worked on. Tracking down bugs that only affect certain users is almost impossible if you do not know what data clients send to your backend. Plus, we were able to recover hundreds of transactions in the aftermath of an incident. 