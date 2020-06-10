---
layout: post
title:  "Deploying Docbox to Github pages"
date:   2017-01-09 18:00:00+02:00
category: "code"
body_id: blog
---

I love [Docbox](https://github.com/mapbox/docbox); it’s the documentation framework I always wanted. You write Markdown and compile into a nice single page document. While Docbox comes with most batteries included to create API documentation, you have to take care of deployment yourself. Thanks to the simple setup of Docbox, you can automate its deployment in a simple bash script. 

=====

With Github pages you could [publish your documentation from the `docs` directory in your repository](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch). Just build the documentation locally and push it to Github. 

When you maintain a library, you usually release a bunch of updates at once. You push several commits to `master` in your repository and make a release when it's time. Many of these updates also require updates to your documentation, which you will want to add to the documentation source whenever you push the corresponding update to `master`. When you host your documentation directly from `docs`, users will always see the most recent version, which might include updates that you have not yet released. 

That's why I prefer to publish documentation to the `gh-pages` branch of the repository so I can deploy new documentation whenever I make a new release. 

With Docbox, this approach is not too difficult:

1. Build the new version of the documentation. Docbox is a React app that provides all the pipelines you need to render your documentation for publication, so this step is straightforward. 
2. Clone the `gh-pages` branch of the repository.
3. Copy the updated documentation into the directory that contains the clone of `gh-pages`.
4. Commit and push the changes to `gh-pages`.

This approach is tedious if you make a lot of releases and is also prone to human error. It's better to automate it. I wrote a small [bash script](https://gist.github.com/oliverroick/067def5929ad94e35523bd89e7f49309) that runs the process. It runs all the steps discussed above; it clones `gh-pages` into a subdirectory of the current working directory, and removes the subdirectory after deployment is finished. 


Two things to keep in mind: 

1. The script only works when you use [Github with SSH](https://help.github.com/articles/which-remote-url-should-i-use/#cloning-with-ssh-urls).
2. The script expects to find the build inside the directory `docs-build` because it's cleaner to build in a fresh directory. You will need to adapt the [build command](https://github.com/mapbox/docbox/blob/master/package.json#L11) accordingly so it builds into `docs-build`.

We use it to deploy both the [API docs](https://cadasta.github.io/api-docs/) and docs for [django-skivvy](https://oliverroick.de/django-skivvy/#django-skivvy) at Cadasta.

You could even automate deployment. For example, you can configure your CI environment to deploy the documentation whenever a new tag is built successfully.
