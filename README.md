[![Build Status](https://travis-ci.org/cibernox/ember-text-measurer.svg?branch=dummy-branch)](https://travis-ci.org/cibernox/ember-text-measurer)

# Ember-text-measurer

This addon provides a very simple service to measure the width of a string
using an in-memory canvas, so it doesn't cause any layout reflow for max
performance.

### Installation

`ember install ember-text-measurer`

### Usage

This addon just provides a service that you can inject wherever you need.

The service for now has three methods:

* `width(string, font = null)` will return the width of the text with the given font information.

```js
textMeasurer.width('foobar', '24px Arial');             // ~ 68.02px
textMeasurer.width('foobar', '20px Arial');             // ~ 56.64px
textMeasurer.width('foobar', '20px Times New Roman');   // ~ 52.19px
```

* `fitTextSize(string, width, font = null)` will return the font size with which the given text
will fully fit in the available width with the given (option) font information.

```js
textMeasurer.fitTextSize('foobar this is too long', 200, 'normal 24px Times'); // 22px
textMeasurer.fitTextSize('foobar this is too long', 200, 'normal 24px Helvetica'); // 21px
textMeasurer.fitTextSize('foobar this is too long', 200, 'normal 24px Georgia'); // 20px
```

Note: The font size passed to this method is irrelevant, the important part is the font style and family.

* `lines(string, width, font = null)` will return the number of lines that this text would
  require when rendered in a container of the given width with the given font.

```js
const sampleMultilineText = `Lorem
ipsum dolor sit amet, ex legimus mandamus sea, qui no doctus option. Ei pri commune maiestatis. Mea at facete appetere tincidunt. Et sea quaestio expetendis. No eius virtute delenit per.


Ea mel error latine, usu harum delicata forensibus id, ut est probo quodsi regione. Sumo definitiones ex has, percipit voluptatum an qui. Eius solet aeterno sea ut, qui ex inani persequeris. In nostro facilis consetetur mea. Ut audiam virtute nostrum eam, omnes luptatum splendide eam at.

Veri zril ex vel, pri habemus delicata et. Te minimum expetenda dissentiet est, homero omnium expetenda no pri, enim fuisset usu ei. Mel ex quidam scripserit, pri aliquip debitis id. Vis ea legere persius recteque, utamur blandit volutpat ea vel.`;

textMeasurer.lines(sampleMultilineText, 400, 'normal 24px Helvetica'); // 26 lines
textMeasurer.lines(sampleMultilineText, 600, 'normal 24px Helvetica'); // 19 lines
textMeasurer.lines(sampleMultilineText, 600, 'normal 14px Helvetica'); // 14 lines
```

_Please note than measuring the lines is significantly more expensive than measuting the width
and might take a non-negligible amount of time when performed on text over a few thousands words, and
results might not be accurate on browsers that don't have subpixel precission on text measurements_

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
