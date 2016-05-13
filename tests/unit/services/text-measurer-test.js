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
// Those numbers are correct for phantomjs 2.1, but it is expected that
// running these tests in a different browser will fail.

test('#measure receives a string and returns its width', function(assert) {
  let service = this.subject();
  assert.equal(decimalRound(service.measure('foobar'), 2), 31.83);
  assert.equal(decimalRound(service.measure('iiiiii'), 2), 17.34);
  assert.equal(decimalRound(service.measure('mmmmmm'), 2), 55.97);
});

test('#measure optionally accepts a font definition to apply to the string being measured', function(assert) {
  let service = this.subject();
  assert.equal(decimalRound(service.measure('foobar', '24px arial'), 2), 68.02);
  assert.equal(decimalRound(service.measure('foobar', '20px arial'), 2), 56.64);
  assert.equal(decimalRound(service.measure('foobar', '20px Times new roman'), 2), 52.19);
});
