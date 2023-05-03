function StandErrOneProp(p̂, n) {
  return sqrt(p̂*(1-p̂)/n)
}

function StandErrTwoProp(p̂1, n1, p̂2, n2) {
  return sqrt(p̂1*(1-p̂1)/n1+p̂2*(1-p̂2)/n2)
}

function StandErrOneMean(s, n) {
  return s/sqrt(n)
}

function StandErrTwoMean(s1, n1, s2, n2) {
  return sqrt(s1**2/n1+s2**2/n2)
}

function StandErrLine(xl, yl) {
  if (xl.length != yl.length) return
  return yl.variability(2) / (xl.standardDeviation(true)*sqrt(xl.length-1))
}

class InputType {
  static Data = new InputType('data')
  static Stats = new InputType('stats')
  constructor(name) {
    this.name = name
  }
}

class EqualityChoice {
  static NotEqual = new EqualityChoice('notEqual')
  static LessThan = new EqualityChoice('lessThan')
  static GreaterThan = new EqualityChoice('greaterThan')
  constructor(name) {
    this.name = name
  }
}

// proportions

// one prop z int
  // 1 sample
    // random
    // 10%
    // large counts
      // at least 10 successes and failures
        // np̂ >= 10   and   n(1-p̂) >= 10

function OnePropZInt(x, n, cLevel) {
  let p̂ = x / n
  // p hat +- z*sqrt(phat(1-phat)/n)
  
}

// one prop z test
  // 1 sample
    // random
    // 10%
    // large counts
        // np0 >= 10   and   n(1-p0) >= 10

function OnePropZTest(p0, x, n, equality) {

}

// two prop z int
  // 2 samples
    // random
    // 10% for both samples
    // large counts
      // at least 10 successes and failures in both groups
        // n1p̂1, n1(1-p̂1), n2p̂2, n2(1-p̂2) >= 10

function TwoPropZInt(x1, n1, x2, n2, cLevel) {

}

// two prop z test
  // 2 samples
    // random
    // 10% for both samples
    // large counts
      // n1p̂1, n1(1-p̂1), n2p̂2, n2(1-p̂2) >= 10

function TwoPropZTest(x1, n1, x2, n2, equality) {

}






// means

// t interval
  // 1 sample
    // random
    // 10%
    // normal / large sample
      // population distribution normal or sample size large
        // n >= 30
      // no strong skewness or outliers if n < 30 and pop has unknown shape

function TInterval(input, a, b, c, d) {
  if (input = InputType.Data) {
    // List = a
    // C-Level = b
  } else if (input == InputType.Stats) {
    // x̄ = a
    // Sx = b
    // n = c
    // C-Level = d
  }
}


// t test
  // 1 sample
    // random
    // 10%
    // normal / large sample
      // population distribution normal or sample size large
        // n >= 30
      // no strong skewness or outliers if n < 30 and pop has unknown shape

function TTest(input, μ0, a, b, c, d) {
  if (input == InputType.Data) {
    // List = a
    // equality = b
  } else if (input == InputType.Stats) {
    // x̄ = a
    // Sx = b
    // n = c
    // equality = d
  }
}

// two samp t int
  // 2 samples
    // random
    // 10% for both samples
    // normal / large samples
      // population distributions normal or sample sizes large
        // n1 >= 30 and n2 >= 30
      // no strong skewness or outliers if n < 30 and pop has unknown shape

function TwoSampTInt(input, a, b, c, d, e, f, g) {
  if (input == InputType.Data) {
    // List1 = a
    // List2 = b
    // C-Level = c
  } else if (input == InputType.Stats) {
    // x̄1 = a
    // Sx1 = b
    // n1 = c
    // x̄2 = d
    // Sx2 = e
    // n2 = f
    // C-Level = g
  }
}

// two samp t test
  // 2 samples
    // random
    // 10% for both samples
    // normal / large samples
      // population distributions normal or sample sizes large
        // n1 >= 30 and n2 >= 30
      // no strong skewness or outliers if n < 30 and pop has unknown shape

function TwoSampTTest(input, a, b, c, d, e, f, g) {
  if (input == InputType.Data) {
    // List1 = a
    // List2 = b
    // equality = c
  } else if (input == InputType.Stats) {
    // x̄1 = a
    // Sx1 = b
    // n1 = c
    // x̄2 = d
    // Sx2 = e
    // n2 = f
    // equality = g
  }
}














// todo



function Chi2GOFTest() {
  
}

function Chi2Test() {
  
}

function LinRegTInt() {

}

function LinRegTTest() {

}