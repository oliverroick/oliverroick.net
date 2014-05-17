---
layout: post
title:  "My #geomob London talk on Community Maps 2.0"
date:   2014-05-14 10:00:00
category: talks
---

Recently, I gave a talk on a [#geomob London](http://geomobldn.org/) event to introduce Community Maps 2.0. You can read a summary of the talk here.

=====

<script async class="speakerdeck-embed" data-id="d3b8d2e0bd7c013141513eaa9c70471f" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

#### What is Community Maps?

Community Maps is about mapping geographic information by volunteers. Unlike [OpenSteetMap](http://osm.org/), where contributors try to create a dataset of everything in the world, Community Maps is about small communities, with a small geographic scope, who collect geographic data to make a difference in their area by identifying issues, participate in decision making processes, influencing politics and track progress. 

The data collected is therefore predominantly personal opinions and not hard data. This illustration depicts, what kind of information is collected. In the hand-drawn map, we can find expressions like "noise", "ah, normal pavement", "oh my goodness, this is very narrow" or a shiny 24h-McDonald's. 

Community Maps has existed for quite some time now and we have run several projects in a wide variety of communities. For instance, a noise mapping project in the Royal Docks area around London's City Airport helped to prove that airplane traffic significantly contributes to the noise level in that area. In Poland, we helped a community to map dog fouling issues and we were able to employ the collected information to decide where to place new dog fouling bins as part of infrastructure development programmes. 

Using the existing version of Community Maps, we successfully run 64 projects with more than 2000 users who contributed about 20.000 observations since 2007. 

#### Community Maps 2.0

However, after seven years, we decided for a re-built of the platform. We analysed the requirements for participatory mapping and came up with a new data model: Each projects defines a set of so-called _observation types_ with a set of _fields_, which are used to define the data that is expected to be captured. Each field defines a data type (e.g., text field, numeric fields) and the values allowed to contribute. The observation types are used to validate contributions and to build forms to guide the user through the contribution process. _Observations_ are the centrepiece of Community Maps. They are contributed to a project and have a _location_. The reason why we separated location and observations is to allow different users to express personal opinions on the same location. Further, all user in a project can comment on observations. That way we allow for discussions and finding consent 	about the different opinions. The contributions to a project can be access through _views_. Views are similar to views know from database management systems and provide a access to a subset of the project's overall data. Using _user groups_ assigned to views, projects administrators are able to define, which users can access what part of the data set. 

Also, we decided to completely decouple back-end and front-end. This provides us enough flexibility to allow for a variety of third-party applications to collect and store data with Community Maps. Third-party applications can be built on top of a REST-ful API that employs JSON for data exchange.

Another aim was to create a user-friendly interface to help users to easily set-up new projects. 

#### What's next

A first alpha version will be released soon. You can use the instance of Community Maps we will be running on our servers or download the code and deploy it yourself. The whole back-end will be open-sourced on [Github](https://github.com/ExCiteS/opencommunitymaps). We encourage you to contribute by forking the code or submitting issues. 

Also, [follow us on Twitter](https://twitter.com/ucl_excites) or subscribe to [our user list](https://groups.google.com/forum/#!forum/opencommunitymaps) to stay up-to-date. 