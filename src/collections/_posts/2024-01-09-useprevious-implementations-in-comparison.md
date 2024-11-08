---
layout: post
category: writing
body_id: blog
date: 2024-01-09 08:54:00+11:00
highlight_code: true
title: usePrevious Implementations in Comparison
description: Subtle differences in implementation can lead to bugs on your application.
---

There are rare cases where you need access to the previous value of a state variable. `usePrevious` hooks allow us to store and access the previous value of a state. There are different implementations, not all created equal.

The UI framework Chakra includes an undocumented `usePrevious` implementation that looks like this:

```ts
export function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current as T
}
```

The previous value is stored in a ref and the initial value is set in an effect hook on first render. Initially, the previous value will be `undefined` even if the hook is initialised with a value. On top of that, by using a ref instead of a state, the previous value will be equal to the current value in any subsequent re-renders of the parent component.

The `usePrevious` implementation of the [useHooks](https://usehooks.com) library has a similar problem.

```js
export function usePrevious(value) {
  const [current, setCurrent] = React.useState(value);
  const [previous, setPrevious] = React.useState(null);

  if (value !== current) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
}
```

It stores the previous value in an internal state, which solves the problem related to Chakra’s use of ref to store the previous value. But `previous` is initialised with `null`, a value the provided state never held.

Both approaches are wrong. We rely on `usePrevious` to understand what the previous value of a state was. If a state is initialised with a value, the initial previous value should only be `undefined` or `null` if the hook was initialised with `undefined` or `null`, otherwise it should be initialised with the provided value.

If we are trying to track specific value transitions of the state, say we want to execute a routine only if the state changed from `undefined` or `null` to something else, both implementations will cause bugs.

The correct way is to initialise the previous value with the initial value provided to the hook.

```js
function usePrevious(value) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState(value);

  if (value !== current) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
}
```
