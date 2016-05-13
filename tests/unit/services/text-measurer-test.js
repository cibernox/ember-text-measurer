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
// Those numbers are correct for Firefox, but it is expected that
// running these tests in a different browser will fail.

test('#measure receives a string and returns its width', function(assert) {
  let service = this.subject();
  assert.equal(decimalRound(service.measure('foobar'), 1), 28.3);
  assert.equal(decimalRound(service.measure('iiiiii'), 1), 13.3);
  assert.equal(decimalRound(service.measure('mmmmmm'), 1), 49.9);
});

test('#measure optionally accepts a font definition to apply to the string being measured', function(assert) {
  let service = this.subject();
  assert.equal(decimalRound(service.measure('foobar', '24px arial'), 1), 68.1);
  assert.equal(decimalRound(service.measure('foobar', '20px arial'), 1), 56.7);
  assert.equal(decimalRound(service.measure('foobar', '20px Times Rew Roman'), 1), 52.2);
});
