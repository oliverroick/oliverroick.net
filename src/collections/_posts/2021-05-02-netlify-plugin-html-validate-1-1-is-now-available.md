---
layout: link
category: links
body_id: links
date: 2021-05-02 21:15:00+01:00
highlight_code: true
title: netlify-plugin-html-validate 1.1 is now available
link: https://github.com/oliverroick/netlify-plugin-html-validate/releases/tag/v1.1.0
---

I published release 1.1.0 of netlify-plugin-html-validate. The only notable change is the upgrade of html-validate from 4.6 to 4.10.1, which makes available [several changes](https://html-validate.org/changelog/index.html), most notably two new features:

* Using [`.htmlvalidateignore`](https://html-validate.org/usage/index.html#ignoring-files), you can now exclude files from being validated.
* In addition to `.htmlvalidate.json`, you can [configure html-validate using `.htmlvalidate.js`](https://html-validate.org/usage/index.html#configuration), which enables comments and better interoperability between sharable and regular config files.

**Note:** This release is not yet available in Netlify’s plugin directory,  while Netlify’s engineers are working on a solution to support breaking changes in plugins. You can add the latest release to your build using [file-based plugin configuration](https://docs.netlify.com/configure-builds/build-plugins/#file-based-installation).
