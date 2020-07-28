---
layout: post
title: Pressing SPACE on a focussed button in Firefox fires a click event
date:   2020-07-22 17:00:00
---

Pressing SPACE on a focussed button in Firefox not only fires the expected `keydown` and `keyup` events but also a `click` event. The behaviour is a relict from the [Netscape-era](https://bugzilla.mozilla.org/show_bug.cgi?id=1487102#c4).

This is a problem, when you toggle the visibilty of an element based on a button's click or key events. The React example illustrates the problem:

```jsx
import React, { useState } from 'react';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      { isOpen && <div>Show/hide me</div>}
      <button
        onKeyDown={ () => setIsOpen(!isOpen) }
        onClick={ () => setIsOpen(!isOpen) }
      >
        Click to toggle
      </button>
    </>
  );
};
```
Clicking the button will open show the `div` following `keydown` event but will immediately close it following the `click` event.

Calling `preventDefault()` on the buttons `keyup` event, suppresses the subsequent `click` event.
