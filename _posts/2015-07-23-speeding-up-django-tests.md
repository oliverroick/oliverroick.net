---
layout: post
title:  "Speeding up tests in Django"
date:   2015-07-23 10:00:00
category: "code"
---

Class-based views are difficult to test in Django applications. There is a number of tutorials out there that discuss best practices about how to test views — most of these are based on the official [Django guides](https://docs.djangoproject.com/en/1.8/topics/testing/tools/). Doing it their way, however, can be terribly slow, especially when you add complexity to your views, such user authentication.

I'll discuss a slightly different method of testing views without the test client, which speeds up tests by about 20 times.

=====

#### The use case

To demonstrate my approach, I have created the following simple example project.

A book has an author and a title. There are two views in our project; one that displays a list of books and one that shows details of a single book. To spice up things a little, we assume that a book can only be accessed by its author.

I'll spare you the boring code examples here — have a look at the [repository](https://github.com/oliverroick/django-tests/) to learn how the project is setup.

#### What to test

There are three things that should be tested with views:

1. The view should render the correct template with the correct context. How the template is rendered depends on parameters passed to the view and the user requesting the resource.
2. URL namespaces should resolve to the correct URL and the parameters should be assigned correctly.
3. URLs should be linked to the correct views and the URL parameters should be passed correctly on to the view's keyword arguments.

#### The "official" approach to testing views

The [Django guides](https://docs.djangoproject.com/en/1.8/topics/testing/tools/) propose to use the test client to test views. Here's how this would look like in our project:

```python
class BookListTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_get_with_author(self):
        user = UserFactory.create(password='123')
        book_1 = BookFactory.create(author=user)
        book_2 = BookFactory.create(author=user)
        book_3 = BookFactory.create()

        self.client.login(username=user.username, password='123')
        response = self.client.get(reverse('book_list'))

        rendered = render_to_string(
            'books_list.html',
            {'books': [book_1, book_2]}
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode('utf-8'), rendered)
        self.assertNotContains(response, 'No books found')
```

The `setUp` method, which is called before every test in the test class, creates a new `Client` instance.

In the test itself (`test_get_with_author`), a user and three `Book` instances are created. Note, I'm using [Factory Boy](http://factoryboy.readthedocs.org/en/latest/index.html) to create model instances. Then we log the user in and get the response using the client.

To test if the view has been rendered with the correct template and context, we use `render_to_string` to render a reference using the template (`books_list.html`) and context (`{'books': [book_1, book_2]}`) and compare that reference with the response.

This approach is very straightforward and easy to reproduce. However, creating the client, logging the user in and getting the response from the client takes a long time. A fully developed test suite for our case takes about 0.6 seconds to run only ten tests. Imagine you have a test suite of a more complex project with 1000 tests.


#### Testing views without the test client

Getting rid of the test client can speed up your tests tremendously. We can use the view and its methods to render a response — the same happens internally when you request a response using the test client; it only spares the detour over the client.

Here's how to do it:

```python
class BookListTest(TestCase):
    def setUp(self):
        self.view = BookList.as_view()
        self.request = HttpRequest()
        setattr(self.request, 'method', 'GET')
        setattr(self.request, 'user', AnonymousUser())

    def test_get_with_author(self):
        user = UserFactory.create()
        book_1 = BookFactory.create(author=user)
        book_2 = BookFactory.create(author=user)
        book_3 = BookFactory.create()

        setattr(self.request, 'user', user)
        response = self.view(self.request).render()

        rendered = render_to_string(
            'books_list.html',
            {'books': [book_1, book_2]}
        )
        self.assertEqual(response.content.decode('utf-8'), rendered)
        self.assertEqual(response.status_code, 200)
        self.assertNotContains(response, 'No books found')
```

In `setUp`, we set the defaults for the test case. The view function is set to `BookList`, a request object is initialised, HTTP method and requesting user are set as well. If necessary, these defaults can be overwritten in each test.

The test itself looks very similar to the one above, except that there's no client. Instead, we assign to user the request instance (i.e. faking the login) and the we pass the request to the view and call the view's `render()` method to render the template.

It tests the same functionality as above. But running all ten tests for the example takes about 0.03 seconds instead of 0.6. And that's a significant performance increase.

#### What else to test?

There are more things that should be tested. For instance, accessing the view with an anonymous user and that the URLs are defined correctly and linked to the right views.

##### Test with AnonymousUser

Since authors can only access their own books, users accessing the views need to identify themselves by logging in. If a user is not authenticated, the view should return a redirect to the login page.

```python
    def test_get_with_anonymous(self):
        response = self.view(self.request)

        self.assertEqual(response.status_code, 302)
        self.assertIn('/accounts/login/', response['location'])
```

The response's status code should be `302` (this indicates a redirect). The login page can be accessed via `/accounts/login/`, hence `response['location']`, which contains the redirect location, should provide that URL.

##### Testing the URLs

Here we want to test that the URL namespaces resolve to the correct URL and that the views are linked correctly.

```python
from django.test import TestCase
from django.core.urlresolvers import reverse, resolve

class BookUrlTest(TestCase):
    def test_reverse_books_detail(self):
        self.assertEqual(reverse('books_detail', kwargs={'book_id': 3}), '/books/3/')

    def test_resolve_book_list(self):
        resolved = resolve('/books/3/')
        self.assertEqual(resolved.func.func_name, BookDetail.__name__)
        self.assertEqual(resolved.kwargs['book_id'], '3')
```

We can use Django's `reverse()` to get the URL to a namespace. The namespace `books_detail` should resolve to something like `/books/<book_id>/`, so passing the ID `3` should resolve to `/books/3/`.

The opposite way should be tested too: When receiving a request to `/books/3/` the request should be passed on to the view `BookDetail` and the view's `book_id` should be passed the ID `3`. We use Django's `resolve()` to resolve the URL. To test if the correct view is linked to the URL, we compare the name of the resolved view (`resolved.func.func_name`) to the name of the expected view (`BookDetail.__name__`). The `kwargs` property of each resolved view is a dictionary that holds the parameters passed from the URL. We can use it to assert of the parameters where passed correctly.

#### Wrapping up

To get a grasp about the example project and how it is fully tested, have a look at the [repository](https://github.com/oliverroick/django-tests/). You will also find the "standard" approach that uses the test client in the branch ["test-client"](https://github.com/oliverroick/django-tests/tree/test-client).
