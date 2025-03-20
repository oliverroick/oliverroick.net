---
layout: post
category: learnings
body_id: blog
date: 2025-03-20 12:57:00+11:00
highlight_code: true
title: "Relative Absolute Positioning of an Element in CSS"
description: A quirk in CSS allows to position an element absoloutely but also relative to its sibling
---

The post title is a mouthful, but here it goes: It is possible to absolute-position an element relative to the position of the preceding sibling element. You'll need this for [Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) implementations to place a list of options underneath an input element.

If the sibling element preceding the absolutely-positioned element is relatively positioned and the absolutely-positioned element has no `top` property, then the absolutely-positioned element will be placed just underneath the preceding sibling element.

```html
<style>
  .parent {
    position: relative;
  }
  .sibling {
    position: relative;
  }
  .absolute-position {
    position: absolute;
  }
</style>

<div class="parent">
  <input type="text" class="sibling" />
  <ul class="absolute-position">
    ...
  </ul>
</div>
```

I think of it this way: `position: absolute` removes an element from the normal document flow on the page. When the element has no `top` property it assumes the same position as if it were part of the normal document flow.
