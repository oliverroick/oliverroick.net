---
layout: post
title:  "Testing code to understand code"
date:   2017-02-15 17:00:00+02:00
category: "thoughts"
body_id: blog
---

Writing tests for your software is crucial. Not just because it provides confidence in the functionality of your code but also because tests help you to understand your code and the problem you are solving. 

=====

When I work on a problem that I don't fully understand, I start exploring the problem by trying out different ideas. If one approach feels promising, I work my way deeper into the issue towards a solution. During prototyping, I usually ignore software development best practices until I have a working solution. Then I start writing tests and refactoring the code towards a solution that I can release. 

Recently, I got stuck building a prototype. As my work got complex, I wasn't able to figure out which of my few components was causing problems. I knew there was one part in my implementation that was broken but I wasn't able to find which one it was. So I started writing tests for some of the methods I was suspecting to contain failing code. Within less than 30 minutes I was able to understand what I was doing wrong, to fix my code and to finish the prototype. 

Writing tests forced me to take a step back, look at the functionality of components independently from each other and to understand the code I quickly hacked together. Writing tests provided a different perspective.

And that's what test-driven development is about. Test are a means to ensure functionality. But much more important, writing tests forces you to look at your code from different angles and this is why you eventually write better code when you write tests.
