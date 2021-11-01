---
layout: post
category: writing
body_id: blog
date: 2021-10-31 18:20:00-00:00
highlight_code: true
title: Notes from last week’s GitHub Universe
description: Notes and observations from GitHub Universe 2021
---

## Code Spaces

Development environments resembling production environments are standard practice in software development today. [Codespaces](https://github.com/features/codespaces) are development environments, but they run on a remote server, not your local machine. Codespaces remove the need to clone large repositories to your local machine, install dependencies and deal with those roadblocks you will definitely encounter—like trying to run PostGIS in Docker reliably on M1. By moving development environments to the cloud onto unified host systems, all developers in a team can share the same environment, no matter what system they prefer on their machines. 

Developers start a new Codespace using a VS Code command kicking off a two-step process. First, you select default definitions, say NodeJS and Postgres or a standard Debian image. Then you specify any additional packages you require, including runtimes, Homebrew, or Docker-in-Docker support. Existing projects that rely on pre-configured environments can be migrated by referencing Docker images, docker-compose files and lifecycle scripts from the code space configuration. 

Codespaces simplify and further unify development environments, but they also enhance developer collaboration. To align all team members with project-specific coding standards, you can configure editor extensions that apply to all development environments, think Prettier or ESLint. Or you share a Codespace with members of your organisation for code reviews and to gather feedback, or share it publicly to demonstrate new work to a client.

Booting a Codespace is fast. Using shallow clones, moving bootstrap code into images that are rebuilt every night, and prebuilds tracking closely to the main branch, Codespaces spin up within seconds. Apparently, the GitHub.com environment boots in about 10 seconds. 

Despite all standardisation that comes with Codespaces, VS Code, the default editor, is just as customisable as your local VS Code installation. Custom settings like themes, keyboard shortcuts, extensions, or code snippets can be synchronised across all your editors in the Codespace. And if you don’t like working in VS Code, you can always work from the command line using Vim or Emacs. 

Codespaces are a massive boost for developer productivity, but they are not cheap. A four-core environment is $0.36 per hour. A team of seven developers, each running a Codespace for six hours a day on 22 working days a month, rack up $332 each month. Thankfully, there are measures to control costs: A Codepace automatically shuts down after 30 inactive minutes; you can limit the number of concurrent spaces and select the machine type sufficient for your needs. 

Together with new project-management features, Codespaces will eat up a lot of business in the developer-tools space. Many developers moved their CI to GitHub Actions; I’m sure many will start using Codespaces. Issues will undoubtedly draw people away from Jira and the like. We will be depending more and more on GitHub going forward. 

## Issues

I always liked the simplicity of issues to manage projects on GitHub. But for larger teams, issues were missing essential project-management features; prioritising work or planning sprints was just cumbersome. Yes, we have kanban-like project boards for better visibility on ticket progress. Still, grouping tickets into sprints, work areas, and priorities is only possible via labels and filters, which often feels like a hack.

The new table view for projects changes all that. Tables present information more densely, and with filters, ordering, and groups, we can dissect a project into different views, optimised for various roles in a team. The project manager wants to see what items developers are currently working on and what work is scheduled for the next iteration; the product manager prefers a grouping by feature, while developers need a list of work assigned to them. And your slightly too hands-on Head of Product can now get a personalised view of work going on across different teams. No need to click through individual tickets anymore. Everything is in one place, sortable, groupable and filterable. Custom fields simplify high-level planning and lining up work: Assign a ticket to a sprint, add an estimation, a product area or a milestone. And everything works across repositories, so you can track a team’s work across different repositories. 

Task lists are improved too. We can create new tickets for each item from task lists in an issue — ideal for breaking down features into small chunks of work. Closing a ticket will mark as completed the original item in the task list. 

You can tell GitHub thought hard about the problems that they were solving. Many teams aren’t using GitHub issues so far for project management because issues alone are too basic. You could file an issue, but triaging, grouping, and prioritising always needed workarounds with tags and milestones. The new table views, custom fields, and the ability to view a project in different ways really add up to a comprehensive project management tool. Even larger teams may now think twice about whether they still want to pay for Jira. 

Next on the roadmap are insights on projects (attention scrum masters, burn-down charts are on the way), more waterfall-like roadmap timeline views, and customisable ticket automation. How much longer until you need to hire a dedicated GitHub-projects administrator to set up and configure projects? 

## Issue forms

[Issue forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms) are a great new way to ensure crucial information is provided when creating a new issue. We’ve had Markdown issue templates for a while now, and they were great. But people could just ignore them. Now maintainers can specify an actual form using YAML, add text fields, checkboxes, or select fields, and make them required to ensure people provide thorough bug reports. What works well for bug reports on open-source projects might also work for internal project management, ensuring context and acceptance criteria are provided for feature tickets. 

## Release notes

Automating release notes based on conventional commits has been around for a while now. GitHub added a similar feature to the release UI, allowing creating release notes with a button click. This generates a list of all changes since the last release and gives a shout out to new contributors, which is a nice touch for open-source projects. The release notes can be formatted using [a simple YAML config](https://docs.GitHub.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes#example-configuration). It’s a shame conventional commits are not supported; instead, it requires pull-requests labels.

## Merge queues

[Merge queues](https://github.blog/changelog/2021-10-27-pull-request-merge-queue-limited-beta/) extend auto merging pull requests. Adding a pull request to the merge queue will run all status checks with changes from any pull request ahead in the queue. There is no need to require branches to be up-to-date with the main branch and no endless merging or rebasing in high-activity repositories.

__Note:__ For a complete list of announcements, read [Everything new from Universe 2021](https://GitHub.blog/2021-10-27-everything-new-from-universe-2021/) or rewatch the keynote and other sessions at [githubuniverse.com](https://www.githubuniverse.com/).
{: .article__note .top-2 }