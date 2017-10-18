import { moduleFor, test } from 'ember-qunit';

function decimalRound(number, decimals = 0) {
  let factor = Math.pow(10, decimals);
  return Math.round(number * factor) / factor;
}

const sampleMultilineText = `Lorem
ipsum dolor sit amet, ex legimus mandamus sea, qui no doctus option. Ei pri commune maiestatis. Mea at facete appetere tincidunt. Et sea quaestio expetendis. No eius virtute delenit per.



Ea mel error latine, usu harum delicata forensibus id, ut est probo quodsi regione. Sumo definitiones ex has, percipit voluptatum an qui. Eius solet aeterno sea ut, qui ex inani persequeris. In nostro facilis consetetur mea. Ut audiam virtute nostrum eam, omnes luptatum splendide eam at.

Veri zril ex vel, pri habemus delicata et. Te minimum expetenda dissentiet est, homero omnium expetenda no pri, enim fuisset usu ei. Mel ex quidam scripserit, pri aliquip debitis id. Vis ea legere persius recteque, utamur blandit volutpat ea vel.`;

moduleFor('service:text-measurer', 'Unit | Service | text measurer');

// Note: The actual results of this tests vary from browser to browser depending
// on the default font family, size, kerning and also on antialiasing and other
// dark magic.
//
// Those numbers are correct for Firefox in Ubuntu, but it is expected that
// running these tests in a different browser/OS will fail.

test('#width receives a string and returns its width', function(assert) {
  let service = this.subject();
  assert.equal(decimalRound(service.width('foobar'), 1), 28.4);
  assert.equal(decimalRound(service.width('iiiiii'), 1), 13.3);
  assert.equal(decimalRound(service.width('mmmmmm'), 1), 50);
});

test('#width optionally accepts a font definition to apply to the string being measured', function(assert) {
  let service = this.subject();
  assert.equal(decimalRound(service.width('foobar', 'normal 24px Helvetica'), 1), 68.1);
  assert.equal(decimalRound(service.width('foobar', 'normal 20px Helvetica'), 1), 56.7);
  assert.equal(decimalRound(service.width('foobar', 'normal 20px Times'), 1), 52.2);
});

test('#lines(string, width, font?) returns the number of lines that a text would require in the given width', function(assert) {
  let service = this.subject();
  assert.equal(service.lines(sampleMultilineText, 400, 'normal 24px Helvetica'), 27);
  assert.equal(service.lines(sampleMultilineText, 600, 'normal 24px Helvetica'), 20);
  assert.equal(service.lines(sampleMultilineText, 600, 'normal 14px Helvetica'), 15);
});

// This test was written on OS X 10.11.5, worked on Chrome, Safari, Firefox
test('#fitTextSize should return correct font size on overflow', function(assert) {
  let service = this.subject();
  assert.equal(decimalRound(service.fitTextSize('foobar this is too long', 200, 'normal 24px Times'), 1), 22);
  assert.equal(decimalRound(service.fitTextSize('foobar this is too long', 200, 'normal 24px Helvetica'), 1), 21);
   // this will pass on Travis
  assert.equal(decimalRound(service.fitTextSize('foobar this is too long', 200, 'normal 24px Georgia'), 1), 20);
});
