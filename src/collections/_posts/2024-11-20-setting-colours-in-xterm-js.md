---
layout: post
category: learnings
body_id: blog
date: 2024-11-20 11:01:00+11:00
highlight_code: true
title: Setting Colours in Xterm.js
description: Because you can't just use CSS, here's how specify 24-bit colours in ANSI.
---

[Xterm.js](https://xtermjs.org) is a JavaScript library that can be used to build terminal-like user interfaces. We use it in [jupyterhub-fancy-profiles](https://github.com/2i2c-org/jupyterhub-fancy-profiles) to display the output from the custom-image build process.

Xterm.js comes with a reasonable set of predefined colours; red for errors, yellow for warnings, and so on. At the same time the colours are static, and when used with a dark background, the contrast between the specified colour and the background is too low, thus rendering the text hard to read.

Overwriting the default colours in Xterm.js is possible, but it’s not straightforward, especially if you have a web-development background and are used to specifying colours in [hex](https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color) or [RGB](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb).

Xterm.js, like all terminal implementations, uses [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) to alter the colour of a line in terminal. The colours in the Xterm.js theme need to be specified in the same way, using the pattern

```
\x1b[38;2;{red};{green};{blue}m
```

Breaking down the sequence:

- `\x1b[` is the Control Sequence Introducer, or CSI; it signals that the following sequence should be interpreted as an ANSI escape code,
- `38` signals that we want to change the text colour,
- `2` means we want to provide a 24-bit colour, and
- `{red}`, `{green}`, `{blue}` are the values in each individual channel.

Consequently, the ANSI equivalent to `color: rgb(248, 113, 133)` in CSS is `\x1b[38;2;248;113;133m`.

To specify custom colours for a Xterm.js instances we alter the theme:

```js
const term = new Terminal({
  theme: {
    red: "\x1b[38;2;248;113;133m",
    green: "\x1b[38;2;134;239;172m",
    yellow: "\x1b[38;2;253;224;71m",
    blue: "\x1b[38;2;147;197;253m",
    magenta: "\x1b[38;2;249;168;212m",
    cyan: "\x1b[38;2;103;232;249m",
  }
});
```
