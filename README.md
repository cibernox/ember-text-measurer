[![Build Status](https://travis-ci.org/cibernox/ember-text-measurer.svg?branch=dummy-branch)](https://travis-ci.org/cibernox/ember-text-measurer)

# Ember-text-measurer

This addon provides a very simple service to measure the width of a string
using an in-memory canvas, so it doesn't cause any layout reflow for max
performance.

### Installation

`ember install ember-text-measurer`

### Usage

This addon just provides a service that you can inject wherever you need.
The service for now has one single method `width(string, font = null)` that will
return the width of the text with the given font information.

```js
textMeasurer.width('foobar', '24px Arial');             // ~ 68.02px
textMeasurer.width('foobar', '20px Arial');             // ~ 56.64px
textMeasurer.width('foobar', '20px Times New Roman');   // ~ 52.19px
```

### What can I do with this?

Check [THE DEMO](https://ember-text-measurer.pagefrontapp.com) for some ideas ;-)

### Browser compatibility

Pretty good, in theory all back to IE9, although IE9 might give slightly unnacurate results,
probably not innacurate enough to be a problem.

### Caveats

- It doesn't work in Fastboot because there's no canvas support in node. If you are very interested in
  this feature, it is proably doable using in some library like [node-canvas](https://github.com/Automattic/node-canvas)
  PRs welcomed.
- If you are using a custom font and you perform the measurement before it is fully loaded,
  the result will be innacurate.