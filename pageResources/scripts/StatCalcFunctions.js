function OneVarStats(l) {
  return {
    'xBar': l.mean(),
    'Σx': l.sum(),
    'Σx^2': l.map(x => x ** 2).sum(),
    'Sx': l.standardDeviation(true),
    'σx': l.standardDeviation(),
    'n': l.length,
    'minX': l.min(),
    'Q1': l.Q1(),
    'Med': l.median(),
    'Q3': l.Q3(),
    'maxX': l.max()
  }
}

function TwoVarStats(x, y) {
  if (x.length != y.length) return
  return {
    'xBar': x.mean(),
    'Σx': x.sum(),
    'Σx^2': x.map(a => a ** 2).sum(),
    'Sx': x.standardDeviation(true),
    'σx': x.standardDeviation(),
    'n': x.length,
    'yBar': y.mean(),
    'Σy': y.sum(),
    'Σy^2': y.map(a => a ** 2).sum(),
    'Sy': y.standardDeviation(true),
    'σy': y.standardDeviation(),
    'Σxy': x.map((a, i) => a * y[i]).sum(),
    'minX': x.min(),
    'maxX': x.max(),
    'minY': y.min(),
    'maxY': y.max()
  }
}

function LinRegAxB(x, y) {
  return {
    'y': 'ax+b',
    'a': List.linRegSlope(x, y),
    'b': List.linRegIntercept(x, y)
  }
}

function LinRegABx(x, y) {
  return {
    'y': 'a+bx',
    'a': List.linRegIntercept(x, y),
    'b': List.linRegSlope(x, y)
  }
}