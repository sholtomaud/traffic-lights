module.exports = {
    completer: completer
}

function completer(line) {
  var completions = 'move place report left right'.split(' ')
  var hits = completions.filter((c) => { return c.indexOf(line) == 0 })
  // show all completions if none found
  return [hits.length ? hits : completions, line]
}