---
layout: post
title:  "Testing Django — Lessons Learned"
date:   2016-09-29 09:00:00+02:00
image: code
category: writing
highlight_code: true
body_id: blog
---

I recently had the honor to work on a major refactoring of Cadasta's test code. The goal was to make the test code more consistent and easier to write. One result of this work was a [small test framework](https://github.com/Cadasta/django-skivvy), which I’m going to write about some other time; another was a bunch of notes that I’m going to summarize in this post. 

=====

## Terms and definitions

Let’s start with definitions for two terms I’m going to use throughout this post:

- **Test case** A test case is equal to a Django [`TestCase`](https://docs.djangoproject.com/en/1.10/topics/testing/tools/#django.test.TestCase) instance. A test case groups several tests of one thing, e.g. a model class or a serializer. Each test case has a particular test setup, which all test methods of the test case use.
- **Test method** A test method is a method within a `TestCase`; its name starts with `test_`. Each test method defines a single test and should hence focus on testing exactly one thing. 

## A testing strategy

When writing tests, you usually aim for 100% test coverage. That means every line of code should be touched by a test at least once. That said, even if a test covers many lines of code it is not necessarily a useful test. When you examine a view, it likely touches many components “below,” such as forms or serializers, managers, and models. By testing a view, you easily end up with a high coverage score. 

Testing is not about touching as many lines of code as possible; it is about making sure that each component works as expected and to ensure it is still working you add added new functionality to a component. 

Each component should be tested individually. That is not always possible. Serializers and forms need models to work, and views need forms and serializers to work and thus also models. You should keep this in mind when writing tests. 

The order in which you test components is important. You start from lowest-level components and work your way up the component hierarchy. Start with testing models and make sure the tests for models cover all code of the models. Then write tests for your forms and serializers; again make sure the tests for forms/serializers only cover all code of the forms/serializers. Finally, add tests for views.

## Keep database hits at a minimum

Database requests slow down test execution, and there is nothing more annoying than having to wait for a slow test to pass. Database hits should be kept to a minimum. There usually three cases that create many database requests:

1. At Cadasta, we are using _factory-boy_ to create model instances for tests, usually by using [`ModelFactory.create()`](https://factoryboy.readthedocs.io/en/latest/reference.html#factory.Factory.create), which creates a record in the database. In many cases, there is no need to store the model instance in the database for the test to run; testing methods of the model class or the result of a serializer often works without the database. A better alternative for these cases is [`Factory.build()`](https://factoryboy.readthedocs.io/en/latest/reference.html#factory.Factory.build), which creates a model instance in memory without storing it to the database.

2. Try to avoid querying the database for assertions. That often happens when you test views. Some model instances are created and then queried as a `QuerySet` to check whether the view is rendered with the correct context. Try to avoid those situations by caching model instances. You can combine cashed model instance as a `list` and use that instead of an actual `QuerySet`. There is one exception: If you update a model instance, you want to test whether the model has updated the corresponding record in the database. 

3. Always create only those models instances needed for a test to pass. It is tempting to create all the model instances in the `setUp` method to keep the test methods clean, but many tests only require a fraction of the models created. Those unused model mean unnecessary hits to the database. Create only the model instances which are required throughout all test methods in the test case and add those unique to some tests in the test method itself. 

## Don’t use iterator factories

Factory boy’s [`Iterator`](http://factoryboy.readthedocs.io/en/latest/reference.html#iterator) is very convenient if you can’t decide which value to provide for a field. But they also make tests non-deterministic, which means a test might fail randomly even though the code is not broken.

Consider this example: You have a model and want to test that a field has not been updated, e.g. the model should not be updated when the user is not authorized to do the change. The test tries to update the model to a particular value and then check that the model has not been updated to that value. If the original value for that field has been set randomly, there is a chance this value is the same that I want to apply to the model. The test then fails randomly, depending on the number of tests that were executed before. 

It's therefore best always to decide on a fixed value in the model factories.

## Don’t DRY test cases

Avoid using class hierarchies for your tests. It’s tempting because tests involve a lot of repetitive code, but it’s bad practice for tests. If a test fails, the person working on the issue will have to figure out how the test is set up to assess what breaks the code that is being tested. The more the test configuration is spread across several classes, the more difficult it is to get the full picture. 

There is only one exception. Each test case has a standard test configuration, usually it’s the “everything is fine” test case. You can put this general setup into the `TestCase`’s `setUp` method. As you go along and add tests for handling errors, i.e. the user provides a wrong input or an unauthorized user access a thing they are not supposed to, you can overwrite the default configuration in the corresponding test method. 
