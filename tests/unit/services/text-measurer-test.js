import { moduleFor, test } from 'ember-qunit';

function decimalRound(number, decimals = 0) {
  let factor = Math.pow(10, decimals);
  return Math.round(number * factor) / factor;
}

moduleFor('service:text-measurer', 'Unit | Service | text measurer');

// Note: The actual results of this tests vary from browser to browser depending
// on the default font family, size, kerning and also on antialiasing and other
// dark magic.
//
// Those numbers are correct for Firefox in Ubuntu, but it is expected that
// running these tests in a different browser/OS will fail.

test('#measure receives a string and returns its width', function(assert) {
  let service = this.subject();
  assert.equal(decimalRound(service.width('foobar'), 1), 32);
  assert.equal(decimalRound(service.width('iiiiii'), 1), 18);
  assert.equal(decimalRound(service.width('mmmmmm'), 1), 60);
});

test('#measure optionally accepts a font definition to apply to the string being measured', function(assert) {
  let service = this.subject();
  assert.equal(decimalRound(service.width('foobar', 'normal 24px Helvetica'), 1), 67);
  assert.equal(decimalRound(service.width('foobar', 'normal 20px Helvetica'), 1), 57);
  assert.equal(decimalRound(service.width('foobar', 'normal 20px Times'), 1), 53);
});
