---
layout: post
title:  "Introducing Community Maps 2.0 to #geomob London"
date:   2014-05-21 10:00:00
category: writing
image: conference
body_id: blog
---

Last week, I introduced Community Maps 2.0 to the [London #geomob](http://geomobldn.org/). You can find the slides and a brief summary of the talk here.

=====

{% post_update %}
The original version of this post included the slides of the talk embedded from Speakerdeck. The embedded snippet was not compliant with accessibilty standards so I decided to remove it from this page. You can still [view the slides on Speakerdeck](https://speakerdeck.com/oliverroick/community-maps-2-dot-0).
{% endpost_update %}

## What is Community Maps?

Community Maps is about mapping geographic information by volunteers. Unlike [OpenSteetMap](http://osm.org/), where contributors are creating a dataset of everything in the world, Community Maps is about small communities, with a small geographic scope. These communities collect geographic data to make a difference in their area by identifying issues, participate in decision making processes, influencing politics and track progress. 

The data collected is therefore mainly about personal opinions and not hard data. For instance, in the hand-drawn map ([slide #7](https://speakerdeck.com/oliverroick/community-maps-2-dot-0?slide=7)), we can find expressions like "noise", "ah, normal pavement", "oh my goodness, this is very narrow" or a shiny 24h-McDonald's. This very much illustrates the information that is being collected by the communities.

Community Maps has existed for quite some time now and we have run several projects with a wide variety of communities. For instance, a noise mapping project in the Royal Docks area around London's City Airport helped to prove that airplane traffic significantly contributes to the noise level in that area. In Poland, we helped a community to map dog fouling issues and we were able to employ the collected information to decide where to place new dog fouling bins as part of infrastructure development programmes. 

In the seven years of running the existing version of Community Maps, we successfully run 64 projects with more than 2000 users who contributed about 20.000 observations since 2007. 

## Community Maps 2.0

However, after seven years, we decided for a re-built of the platform. The reason for this is mainly an outdated architecture  that is difficult to maintain and to extend. 

We analysed the requirements for participatory mapping and came up with a new [data model](https://speakerdeck.com/oliverroick/community-maps-2-dot-0?slide=18): Each project defines a certain number of  _observation types_ with a set of _fields_, which are used to define the data that is expected to be captured. Each field defines a data type (e.g., text field, numeric fields) and the values allowed to contribute. The observation types are used to validate contributions and to build forms to guide the user through the contribution process on client side. _Observations_ are the centrepiece of Community Maps. They are contributed to a project and have a _location_. The reason why we separated location and observations is to allow different users to express personal opinions on the same location. Further, all users in a project can comment on observations. That way we allow for discussions and finding consent 	about the different opinions. The contributions to a project can be accessed through _views_. Views are similar to views known from database management systems and provide a access to a subset of the project's overall data. Using _user groups_ assigned to views, projects administrators are able to define, which users can access what part of the data set. 

Also, we decided to completely de-couple back-end and front-end. This provides us enough flexibility to allow for a variety of third-party applications to collect and store data with Community Maps. Third-party applications can be built on top of a REST-ful API that employs JSON for data exchange.

Another aim was to create a user-friendly interface to help users to easily set-up new projects. 

## What's next

A first alpha version will be released soon. You can use the instance of Community Maps we will be running on our servers or download the code and deploy it yourself. The whole back-end will be open-sourced on [Github](https://github.com/ExCiteS/opencommunitymaps). We encourage you to contribute by forking the code or submitting issues. 

Also, get in touch with us via [Twitter](https://twitter.com/ucl_excites) or subscribe to [our user list](https://groups.google.com/forum/#!forum/opencommunitymaps) to stay up-to-date. 
