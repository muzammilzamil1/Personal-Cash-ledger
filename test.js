const assert = require('assert');
const L = require('./ledger.js');

const entries = [
  { id: 'a', person: 'p1', type: 'out', amount: 1000, date: '2026-11-01', note: 'Lent' },
  { id: 'b', person: 'p1', type: 'in', amount: 300, date: '2026-11-02', note: 'Paid back' },
  { id: 'c', person: 'p1', type: 'in', amount: 5000, date: '2026-11-03', note: 'Gave me cash' },
  { id: 'd', person: 'p1', type: 'out', amount: 1200.5, date: '2026-11-04', note: 'Paid to Ravi' },
  { id: 'e', person: 'self', type: 'out', amount: 100, date: '2026-11-04', note: 'Tea' },
];

assert.strictEqual(L.personBalance(entries, 'p1'), -3099.5 + 0 * 1); // 1000-300-5000+1200.5
assert.strictEqual(L.cashInHand(2000, entries), 2000 - 1000 + 300 + 5000 - 1200.5 - 100);
const run = L.withRunning(entries, 'p1').map(r => r.balance);
assert.deepStrictEqual(run, [1000, 700, -4300, -3099.5]);
assert.strictEqual(L.balanceText(0, 'Raj', 'Me'), 'All clear. Nobody owes anything.');
assert.ok(L.balanceText(500, 'Raj', 'Me').startsWith('Raj owes Me'));
assert.ok(L.balanceText(-500, 'Raj', 'Me').startsWith('Me owes Raj'));
assert.strictEqual(L.round(0.1 + 0.2), 0.3);
assert.strictEqual(L.fmt(1234567.5), '₹12,34,567.5');
console.log('All checks passed');
