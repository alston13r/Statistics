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
}

function ZTest(inputType, μ0, ...rest) {
  if (inputType == InputType.Data) {
    let list, equalityChoice
    // a = list
    // b = equalityChoice
  } else if (inputType == InputType.Stats) {
    let xBar, n, equalityChoice
    // a = x bar
    // b = n
    // c = equalityChoice
  }
}

function TTest(inputType, μ0, ...rest) {
  if (inputType == InputType.Data) {
    let list, equalityChoice
    // a = list
    // b = equalityChoice
  } else if (inputType == InputType.Stats) {
    let xBar, Sx, n, equalityChoice
    // a = x bar
    // b = Sx
    // c = n
    // d = equalityChoice
  }
}

function TwoSampZTest(inputType, σ1, σ2, ) {
  if (inputType == InputType.Data) {
    let list1, list2, equalityChoice
    // a = list 1
    // b = list 2
    // c = equalityChoice
  } else if (inputType == InputType.Stats) {
    let xBar1, n1, xBar2, n2, equalityChoice
    // a = x bar 1
    // b = n1
    // c = x bar 2
    // d = n2
    // e = equalityChoice
  }
}

function TwoSampTTest(inputType, ...rest) {
  if (inputType == InputType.Data) {
    let list1, list2, equalityChoice
    // a = list 1
    // b = list 2
    // c = equalityChoice
  } else if (inputType == InputType.Stats) {
    let xBar1, Sx1, n1, xBar2, Sx2, n2, equalityChoice
    // a = x bar 1
    // b = Sx1
    // c = n1
    // d = x bar 2
    // e = Sx2
    // f = n2
    // g = equalityChoice
  }
}

function OnePropZTest(p0, x, n, equalityChoice) {

}

function TwoPropZTest(x1, n1, x2, n2, equalityChoice) {

}

function ZInterval(inputType, σ, ...rest) {
  if (inputType == InputType.Data) {
    // a = list 1
    // b = c level
  } else if (inputType == InputType.Stats) {
    // a = x bar
    // b = n
    // c = c level
  }
}

function TInterval(inputType, ...rest) {
  if (inputType == InputType.Data) {
    // a = list 1
    // b = c level
  } else if (inputType == InputType.Stats) {
    // a = x bar
    // b = Sx
    // c = n
    // d = c level
  }
}

function TwoSampZInt() {

}

function TwoSampTInt() {

}

function OnePropZInt() {

}

function TwoPropZInt() {

}

function Chi2Test() {
  
}

function Chi2GOFTest() {
  
}

function LinRegTTest() {

}

function LinRegTInt() {

}





/*




{
  "Z-Test": {
    "items": [
      {"name": "inpt", "type": "choice", "description": "idk", "options": [
        {"name": "Data", "description": "idk"},
        {"name": "Stats", "description": "idk"}
      ]},
      {"name": "μ0", "type": "number", "description": "idk"},
      {"name": "σ", "type": "number", "description": "idk"},
      {"name": "List", "type": "list", "description": "idk", "option": 0},
      {"name": "x bar", "type": "number", "description": "idk", "option": 1},
      {"name": "n", "type": "number", "description": "idk", "option": 1},
      {"name": "μ", "type": "choice", "description": "idk", "options": [
        {"name": "≠μ0", "description": "idk"},
        {"name": "<μ0", "description": "idk"},
        {"name": ">μ0", "description": "idk"}
      ]}
    ],
    "description": "to write"
  },
  "T-Test": {
    "items": [
      {"name": "trials", "type": "number", "description": "Number of trials"},
      {"name": "p", "type": "number", "description": "Probability of success"},
      {"name": "x value", "type": "number", "description": "idk"}
    ],
    "description": "to write"
  },
  "2-SampZTest": {
    "items": [
      {"name": "trials", "type": "number", "description": "Number of trials"},
      {"name": "p", "type": "number", "description": "Probability of success"},
      {"name": "x value", "type": "number", "description": "idk"}
    ],
    "description": "to write"
  },
  "2-SampTTest": {
    "items": [
      {"name": "trials", "type": "number", "description": "Number of trials"},
      {"name": "p", "type": "number", "description": "Probability of success"},
      {"name": "x value", "type": "number", "description": "idk"}
    ],
    "description": "to write"
  },
  "1-PropZTest": {

  },
  "2-PropZTest": {

  },
  "ZInterval": {

  },
  "TInterval": {

  },
  "2-SampZInt": {

  },
  "2-SampTInt": {

  },
  "1-PropZInt": {

  },
  "2-PropZInt": {

  },
  "ChiSquared-Test": {

  },
  "ChiSquaredGOF-Test": {

  },
  "LinRegTTest": {

  },
  "LinRegTInt": {

  }
}


*/