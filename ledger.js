// Pure ledger logic. No screen code here, so it is easy to test.
// type "out" = money went out of my hand (I lent / I paid for him)
// type "in"  = money came into my hand (he gave me / he paid me back)
(function (root) {
  function round(n) { return Math.round(n * 100) / 100; }

  function fmt(n) {
    return '₹' + Math.abs(n).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  }

  // Positive = person owes me. Negative = I owe the person (I hold his money).
  function personBalance(entries, pid) {
    var b = 0;
    entries.forEach(function (e) {
      if (e.person === pid) b += e.type === 'out' ? e.amount : -e.amount;
    });
    return round(b);
  }

  // Cash I physically have now.
  function cashInHand(opening, entries) {
    var c = Number(opening) || 0;
    entries.forEach(function (e) { c += e.type === 'in' ? e.amount : -e.amount; });
    return round(c);
  }

  function sortEntries(list) {
    return list.slice().sort(function (a, b) {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
  }

  // Entries of one person, oldest first, each with a running balance.
  function withRunning(entries, pid) {
    var run = 0;
    return sortEntries(entries.filter(function (e) { return e.person === pid; }))
      .map(function (e) {
        run = round(run + (e.type === 'out' ? e.amount : -e.amount));
        return Object.assign({}, e, { balance: run });
      });
  }

  // One sentence that says who owes whom.
  function balanceText(balance, personName, ownerName) {
    if (balance === 0) return 'All clear. Nobody owes anything.';
    return balance > 0
      ? personName + ' owes ' + ownerName + ' ' + fmt(balance)
      : ownerName + ' owes ' + personName + ' ' + fmt(balance);
  }

  var api = { round: round, fmt: fmt, personBalance: personBalance, cashInHand: cashInHand,
              sortEntries: sortEntries, withRunning: withRunning, balanceText: balanceText };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Ledger = api;
})(typeof window !== 'undefined' ? window : this);
