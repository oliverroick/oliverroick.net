---
layout: post
title:  "Advice for the Django novice"
date:   2015-04-30 10:00:00
image: thoughts
category: writing
body_id: blog
---

So you have mastered the basics of Django. You know what Models, Views and Forms are and how to use them. It's time to get real and build your first proper application. When I was at that stage some 2 years ago, I wish I had already know some things I have learned since then. It's not necessarily about how to design and implement your application — it's that "I wish I had known that before" stuff. Here's what I learned.

=====

## Do your research

Many things you're likely to implement, have been addressed before. There are lots of libraries out there that provide commonly used functionality that you can simply re-use, without having to worry about implementing and testing them yourself.

For instance, the following packages have been extremely valuable for me:

- [django-allauth](https://github.com/pennersr/django-allauth) introduces email verification, multiple emails per account, it simplifies password changes and provides everything needed for third-party authentication via Twitter, Facebook, Google and the like.
- [django-model-utils](https://django-model-utils.readthedocs.org/en/latest/) extends Django models and managers with time stamps, status fields or model inheritance. It provides essential functionality that you're very likely going to need.
- [django-rest-framework](https://www.django-rest-framework.org/). Are you building a Web API? Use Django Rest Framework! DRF provides views, parsers, serialisers, and, and, and. It's pretty much the one library you'll need when building a Web API.
- [django-oauth-toolkit](https://github.com/evonove/django-oauth-toolkit) is what you should use, if you plan to implement OAuth for your API. It handles all tokens and implements all API endpoints needed for the infamous OAuth dance.
- [factory-boy](http://factoryboy.readthedocs.org/en/latest/) let's you build easy-to-use factories to create model instances that you can use in your tests.

There are plenty more — have a look at [Django Packages](https://www.djangopackages.com/), it's a good starting point to find the library you need.

## Writing testable code

Views are difficult to test and testing views is pretty slow. Simplify your coding life by keeping your views as free from any business logic as possible. Put everything that is related to querying subsets of your model instances into bespoke managers, everything related to updating the model instance should go into your models and all things serialisation should go into your serialisers.

Start with testing your models thoroughly. Then work your way up to the managers and serialisers. Concerning views, test if the URLs and views are linked up correctly and if the correct responses and error messages are returned for the request.

## Class-based views are hard (sometimes)

Class-based views can save you heaps of time if you create, update and delete your model instances without any additional requirements. Class-based views are also the best option if you need to share some functionality across several views; it's common sense that DRY can be a good practice. However, if you require bespoke functionality other than simply updating your model instances, using class-based views can add a tremendous amount of complexity to your code — especially when your models are complex and have many relations to other models.

Function-based views can be an equally good option. They are easy to implement, easy to understand for other developers and are usually a lot less complex than class-based views.

If you think class-based views are the better choice for your case, have a look at [Luke Plant's approach to class-based views](https://lukeplant.me.uk/blog/posts/my-approach-to-class-based-views/); there are a lot of good ideas in his article.

## Setup a CI environment right from the start

Continuous integration is a concept whereby every commit is automatically installed and tested in an independent environment. You could see it as an additional sanity check; your application is tested in a clean environment and if it works there, it's likely that your code works everywhere.

Tools like [Travis-CI](https://travis-ci.org/) have made continuous integration
easy (and it's free for open-source projects). On the same note, there are more
tools out there that integrate with Travis and help keeping the code quality at a high level:

- [Requires.io](https://requires.io/) checks your requirements (either in requirements.txt or setup.py) and tells you whether your packages are up-to-date, outdated or insecure. You can also sign up for an email alert, that notifies you as soon as something changes.
- [coveralls.io](https://coveralls.io/) checks the test coverage of your code. It is basically the same thing  [coverage](http://nedbatchelder.com/code/coverage/) does in the command line, but it checks all commits to your repository and it automatically comments on a pull request about changes in code test coverage.
- [landscape.io](https://web.archive.org/web/20150324200933/https://landscape.io/) provides code quality measures for your Python code. It checks for coding errors, styling flaws and code smells (things that aren't really wrong, but look like they could need some improvements) and therefore helps you keep your code neat and clean.

## Package from the start if you intend to make releases

If you plan to release your project as an open-source library or application prepare your code base for packaging right from the start. It's easy to start coding at first, not worrying about releases and versioning at first — but trust me, it requires a great deal of refactoring work to turn your project into something you can package and release via [PyPI](https://pypi.python.org/pypi).

So take two or three hours right at the beginning, [look into what is required](https://web.archive.org/web/20150404203955/https://packaging.python.org/en/latest/distributing.html) to create a package and create the structure to do it early on.

## Don't forget about documentation

Documenting code is a boring task, I don't know anyone who actually enjoys doing it. But it's equally important, especially, when you work in a team.

Choose a documentation convention early on and stick to it. I personally like the [Numpy convention](https://github.com/numpy/numpy/blob/master/doc/HOWTO_DOCUMENT.rst.txt) because it's easy to read. Using [Sphinx](http://sphinx-doc.org/), you can create HTML docs from the inline documentation that can serve as a reference for fellow developers.
