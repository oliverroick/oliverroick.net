---
layout: post
title:  "Take-aways from Djangocon Europe 2015"
date:   2015-06-09 10:30:00
category: conferences
---

I went to [Djangocon Europe in Cardiff](http://2015.djangocon.eu/) last week. Here are my key takeaways from talks I saw and discussions I had.

=====

- In general, I enjoyed the mix of technical and non-technical talks and the fact that many talks were given by newcomers. It's always good to see some fresh ideas.

- **Django views are hard to get right.** In his talk, [David Winterbottom](http://codeinthehole.com/) advocated to keep Django views flat. I couldn't agree more. Since the day I started developing with Django, however, I have been looking for good practices about how to deal with the domain logic in complex use cases. That's something we, as the Django community, should work on.

- **[Hypothesis](https://github.com/DRMacIver/hypothesis)** is a test library that randomly generates test cases for predefined functions. It is inspired by [Quickcheck for Haskell](https://hackage.haskell.org/package/QuickCheck). I like the idea because we know what to look for when creating test cases manually. Hence, randomised test cases might find more issues. Hypothesis can be run with `pytest` so it can be easily integrated in your existing test suite.

- **Security** was given much emphasis. [James Bennett](http://www.b-list.org/)'s keynote history of Django's security issues and how they got into the code base in the first place is well worth watching—there is a lot to learn for future projects. [Erik Romijn](http://erik.io/) gave another, more practical talk about Django security. I found his security checkup tool [Erik's Pony Checkup](https://www.ponycheckup.com/) particularly interesting, it's worth a bookmark.

- [Harry Percival](https://twitter.com/hjwp)'s workshop on test-driven development was great. He explained basic concepts incredibly clearly (e.g. What are unit test and functional tests? Why do we write tests at all?) and gave a comprehensive overview of available tools to write a test suite in Python. The workshop was based on his book, which he made [available for free](http://www.obeythetestinggoat.com/); you should buy it though!
