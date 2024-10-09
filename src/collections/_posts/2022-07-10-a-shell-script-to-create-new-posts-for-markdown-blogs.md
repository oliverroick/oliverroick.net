---
layout: post
category: learnings
body_id: learnings
date: 2022-07-10 15:32:00+10:00
highlight_code: true
title: A Shell Script to Create New Posts for Markdown Blogs
description: Create new posts for your Jekyll blog without the hassle.
---

For personal projects, I like to keep things very simple. The blogs I write are published using [Jekyll](https://jekyllrb.com/) instead of a more sophisticated database-driven application. That way, my stack will be low maintenance, and I can focus on writing.

In Jekyll, blog posts are managed via Markdown files in a specific directory. Each post has its own file. A [front matter](https://jekyllrb.com/docs/front-matter/) included in each file contains metadata about the post, such as the title, publishing date, category, and desired layout. Jekyll looks through those files and then generates the site resulting in a set of static HTML pages that can be pushed to a web server.

There’s no user interface (unless you use [NetlifyCMS](https://www.netlifycms.org/) or similar), so creating new posts can be cumbersome. You have to manually create a file, ideally name the file using a slugified version of the post’s title, and then add the preamble with title and the published date in ISO format and anything else your specific setup needs to render the post.

Being the lazy software developer that I am, repetitive and manual work is highly annoying. So I created a simple shell script that asks for the post’s title, creates the file using the slugified version of the title for the file name, and then pre-fills the preamble.

```sh
#!/bin/sh

read -p 'Title: ' title
SLUG="$(echo $title | sed -r 's/[\.\, \?]+/-/g' | tr '[:upper:]' '[:lower:]')"
DATE=$(date +"%Y-%m-%d")
DATE_TIME=$(date +"%Y-%m-%dT%H:%M:%S%z")
tee -a src/_posts/${DATE}-${SLUG}.md <<EOF
---
layout: post
date: ${DATE_TIME}
title: ${title}
description:
category:
---
EOF
vim src/_posts/${DATE}-${SLUG}.md
```

This also automatically opens the new file in Vim so I can start adding content directly.

I invoke the script using make because I like the simplicity of typing `make post`.
