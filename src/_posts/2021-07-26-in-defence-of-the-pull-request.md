---
layout: post
category: writing
body_id: blog
date: 2021-07-26 17:16:00+01:00
highlight_code: true
title: In Defence of the Pull Request
description: 
---

Code reviews aren’t the developer’s primary responsibility, and often there is more than one round of changes to review. There’s always one person in the way to wrap up work, leaving snarky comments. Pull requests take time, resulting in long-lived feature branches and violation of continuous-integration principles. And, despite thorough reviews, bugs still make their way into production. Pull requests are neither efficient nor effective; they slow down delivery and contribute to toxic environments. 

I came across two articles recently, arguing this way: [No code reviews by default](https://raycast.com/blog/no-code-reviews-by-default/)  by Raycast’s Thomas Paul Mann and [Are Pull Requests Holding Back Your Team?](https://betterprogramming.pub/are-pull-requests-holding-back-your-team-e8aec48986c2) by David Masters. I’m sure there are more. 

Both authors make valid points, but I disagree with their notion of the pull request’s purpose and how they contribute to a team’s culture. Code reviews aren’t a means to control co-workers solutions. They don’t exist for senior developers to decide what gets shipped and what isn’t, or for them to patronise junior developers. We have pull requests and code reviews to enable teamwork. 

A pull request is a way to ensure we ship code that works. It’s a chance to verify that changes address the requirements outlined in the ticket and to check against potential edge cases. Humans make mistakes. A reviewer won’t find all the bugs, but the second pair of eyes helps find and fix more.

Unless you work on your own, you are expected to make decisions as a team and discuss how to address a given problem while also considering the longer-term product roadmap. Pull requests are an opportunity to make decisions together, gather feedback, and critique each other to find the optimal solution. For complex problems and equally complex solutions, we use pull requests to show the code early and gather feedback long before the code is ready. In distributed teams, especially those that spread across several time zones where pairing is more difficult, the pull request is an essential tool to work collaboratively but asynchronously. A pull request’s purpose is to ship better software collaboratively. 

Someone always knows better than you do. View source was my secret weapon to learn how to build websites. It allowed me to look under the hood of the websites I liked, understand how they work, how they were made. Compared to polished tutorials, looking at other people’s code is the better way to learn. You get to see real-world solutions, no shiny isolated examples, but code embedded in actual use cases, with constraints on time and quality. By reviewing pull requests, you learn in the same way. It’s a chance to ask why this way and not that way. It’s a chance to learn new approaches to build software, new patterns and best practices. You can learn by reviewing other developers’ work as well as as having your work reviewed. Junior developers learn from more experienced ones, the same way seniors learn from developers with fewer years under their belt. I learned a lot from engineers younger than myself who weren't jaded by 15 years making websites.

Pull requests are essential in your development process to ensure that you ship the right solution and working code. Unless you are reviewing a cosmetic change, like changing colour or fixing a typo, you should always check out the branch locally. Run the tests, have a look at the ticket and make sure all acceptance criteria are met. Think of potential edge cases and test those as well. This sounds like the job of the QA department, but the feedback loop is much shorter at this stage. 

Read the code; all of the changes. Review from the perspective of someone who has to change the code months later to fix a bug or implement an enhancement. Do you understand the changes? Is the code laid out similarly to the existing code in the project? Do the changes introduce duplication? Maybe the author added a new function for a problem that has already been solved elsewhere in the codebase. Are there other opportunities for refactoring that we should consider at this stage?

The pull request review isn’t a place to argue about whether to add a trailing comma after the last key-value pair in a JSON object, you’ve got a linter for this, or whether to use a `for` loop or a `map` to process an array, although it might be worth having the discussion in certain situations. The review ensures that suggested changes fit in with the greater scheme of things in your application and make sure other developers understand them. 

Of course, if you’re working alone, if you’re just experimenting, or if it’s just two blokes in their mum’s attic, code reviews indeed get in the way if moving quickly and getting things done. But from a particular team size on, pull requests will make your team better and code you ship. Software development is a team sport, the unit of delivery is the team. You’re accountable as a team for what you deliver. Code reviews are a way to share that accountability. 

If you feel that pull requests contribute to a low-trust, even toxic, environment, you might want to have a word with your team. It’s not the pull request that creates the culture; it’s the people interacting with each other. If your team isn’t integrating often enough, if branches are long-lived and pull requests have too many changes, try breaking down work into small junks and open a series of pull requests. Even better, break down the work into smaller tickets before developers pick them up. 