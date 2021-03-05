---
layout: link
title:  "netlify-plugin-html-validate 1.0 is now available"
link: https://github.com/oliverroick/netlify-plugin-html-validate/releases/tag/v1.0.0
date:   2021-02-20 14:00:00+00:00
category: links
description: A new release of the netlify plugin netlify-plugin-html-validate is out. 
---

I published a new release of `netlify-plugin-html-validate`. 1.0 looks like a big release; only it is not.

There is only one significant change included in this release: An upgrade of [`html-validate`](https://html-validate.org/) from 2.23 to 4.6 to include new validation rule sets. The upgrade introduces a potential breaking change. `html-validate`’s config will no longer automatically extend `html-validate:recommended`. As a result, you may need to update custom configurations of `html-validate`. `html-validate`’s release notes contain full information and upgrade guides.

Thanks to [Chris Buckley](https://cmbuckley.co.uk) for contributing to this release. 
