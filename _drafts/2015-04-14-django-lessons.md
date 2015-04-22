---
layout: post
title:  "What I wish I would have know when I started Django"
date:   2015-04-14 10:00:00
category: thoughts
---

When I started building Django applications some 18 months ago, I wish I had known some things that the usual introduction tutorials don't tell you. These things revolve around how to design and implement parts of an application — moreover it's that knowledge that comes in handy as soon as you know the very basics and start to develop your app. This post summarises what I learned the hard way and what would have made my life a lot easier if I had known it from the start.

=====

#### Do your research — There are lots of re-usable libraries out there

Many things you're likely to implement, have been addressed before. There are lots of libraries out there that provide commonly used functionality that you can simply re-use, without having to worry about implementing and testing them yourself.

For instance, the following packages have been extremely valuable for me:

- [django-model-utils](https://django-model-utils.readthedocs.org/en/latest/) extends Django models and managers with time stamps, status fields or model inheritance. It provides essential functionality that you're very likely going to need.
- [django-rest-framework](http://www.django-rest-framework.org/). Are you building a REST API? Use Django Rest Framework! DRF provides views, parsers, serialisers, and, and, and. It's pretty much the one library you'll need when building API.
- [django-allauth](https://github.com/pennersr/django-allauth) introduces email verification, multiple emails per account, it simplifies password changes and provides everything needed for third-party authentication via Twitter, Facebook, Google and the like.
- [django-oauth-toolkit](https://github.com/evonove/django-oauth-toolkit) is what you should use, if you plan to implement OAuth for your API. It handles all tokens and implements all API endpoints needed for the infamous OAuth dance.
- [factory-boy](http://factoryboy.readthedocs.org/en/latest/) let's you build easy-to-use factories to instantiate models to use with tests.

There are plenty more, have a look at [Django Packages](https://www.djangopackages.com/). It's a good starting point to find the library you need.

#### On writing testable code

Views are incredibly difficult to test. To make sure your code is testable, keep your views as free from any business logic as possible. Put everything that is related to querying subsets of your model instances into bespoke managers, everything related to updating the model instance should go into your models and all things serialisation should go into your serialisers.

Start with testing your models thoroughly. Then work your way up to the managers and serialisers. When testing the views, try to focus on testing the if URLs and views are linked up correctly and if you get the correct responses and error messages are returned for the request. You could understand these tests as integration tests for your application, while all other tests (those for models, managers and serlizers) are your unit tests.

#### Class-based views are hard (sometimes)

Class-based views can save you heaps of time if you create, update and delete your model instances without any additional requirements. Class-based views are also the best option if you need to share some functionality across several views; we all know that DRY is a more than just a good practice. However, if you require bespoke functionality other than simply updating your model instances, using class-based views can add a tremendous amount of complexity to your code — especially when your models are complex and have many relations to other models.

Function-based views can be an equally good option. They are easy to implement, easy to understand for other developers and are usually a lot less complex than class-based views.

If you think class-based views are the better choice for your case, have a look at [Luke Plant's approach to class-based views](http://lukeplant.me.uk/blog/posts/my-approach-to-class-based-views/); there are a lot of good ideas in his article.

#### Setup a CI environment right from the start

Continuous integration is a concept whereby every commit is automatically
installed and tested in an independent environment. You could see it as an additional sanity check; your code is tested in a clean
environment and if it works there, it's likely that your code works everywhere.

Tools like [Travis-CI](https://travis-ci.org/) have made continuous integration
easy (and it's free for open-source projects). On the same note, there are more
tools out there that integrate with Travis and help keeping the code quality at a high level:

- [Requires.io](https://requires.io/) checks your requirements (either in requirements.txt or setup.py) and tells you whether your packages are up-to-date, outdated and even if they become insecure. There's an email alert you can sign up to, that notifies you as soon as something changes.

- [coveralls.io](https://coveralls.io/) checks the test coverage of your code. It is basically the same thing tools like [coverage](http://nedbatchelder.com/code/coverage/) do, but it checks all commits made to your repository and it automatically comments how coverage has changed on a pull requests.

- [landscape.io](https://landscape.io/) provides code quality measures for your Python code. It checks for coding errors, styling flaws and code smells (things that aren't really wrong, but look like they could need some improvements) and therefore helps you keep your code neat and clean.

#### Package from the start if you intend to make releases

If you plan to release your project as an open-source library or application prepare your code base for packaging right from the start. It's easy to start coding at first, not worrying about releases and versioning at first — but trust me, it can require a great deal of refractoring work to turn your project into something you can package and release via Pypi.

So take two or three hours right at the beginning, [look into what is required](https://packaging.python.org/en/latest/distributing.html) to create a package and create the structure to do it early on.
