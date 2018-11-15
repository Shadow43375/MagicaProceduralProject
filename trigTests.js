
class TrigFunction {
  constructor(type = "sin", amplitude = 1, phaseShift = 0, c = 0) {
    this.trigFunctions = [];
    let typeObject = this._getStandardForm(type, amplitude, phaseShift, c);

    if(typeObject) {
        this.trigFunctions.push(typeObject)
      }
    }
  

  _getStandardForm(type = "sin", amplitude, phaseShift, c = 0) {

    let trigObject = {
      type: type,
      amplitude: amplitude,
      phaseShift: phaseShift,
      c: c,
      absolute: false,
      stringVersion: ""
    }  

    if(type.toLowerCase() === "sin" || type.toLowerCase() === "sine" || type.toLowerCase() === "cos" || type.toLowerCase() === "cosine" || type.toLowerCase() === "abssin" || type.toLowerCase() === "abssine" || type.toLowerCase() === "abscos" || type.toLowerCase() === "abscosine") {
        if(type.toLowerCase() === "sin" || type.toLowerCase() === "sine" || type.toLowerCase() === "abssin" || type.toLowerCase() === "abssine") {
          trigObject.type = "sin";
          if(type.toLowerCase() === "abssin" || type.toLowerCase() === "abssine") {
            trigObject.absolute = true;
            trigObject.stringVersion = "(" + amplitude.toString() + "*Math.abs(Math." + trigObject.type + "(argument - " + phaseShift.toString() + ")) + " + c + ")";
          }
          else {
            trigObject.absolute = false;
            trigObject.stringVersion = "(" + amplitude.toString() + "*Math." + trigObject.type + "(argument - " + phaseShift.toString() + ") + " + c + " )" 
          }
        }
        else if(type.toLowerCase() === "cos" || type.toLowerCase() === "cosine" || type.toLowerCase() === "abscos" || type.toLowerCase() === "abscosine") {
          trigObject.type = "cos";
          if(type.toLowerCase() === "abscos" || type.toLowerCase() === "abscosine") {
            trigObject.absolute = true;
            trigObject.stringVersion = "(" + amplitude.toString() + "*Math.abs(Math." + trigObject.type + "(argument - " + phaseShift.toString() + ")) + " + c + ")";
          }
          else {
            trigObject.absolute = false;
            trigObject.stringVersion = "(" + amplitude.toString() + "*Math." + trigObject.type + "(argument - " + phaseShift.toString() + ") + " + c + ")" 
          }
        }
        
        return trigObject;
    }
    
    return false;
  }

  getType(functionIndex = 0) {
    if(this.trigFunctions[functionIndex]) {
      return this.trigFunctions[functionIndex].type;
    }

    return false
  }

  getAmplitude(functionIndex = 0) {
    if(this.trigFunctions[functionIndex]) {
      return this.trigFunctions[functionIndex].amplitude;
    }

    return false
  }

  getPhaseShift(functionIndex = 0) {
    if(this.trigFunctions[functionIndex]) {
      return this.trigFunctions[functionIndex].phaseShift;
    }

    return false
  }

  getConstant(functionIndex = 0) {
    if(this.trigFunctions[functionIndex]) {
      return this.trigFunctions[functionIndex].c;
    }

    return false
  }

  getStringVersion(functionIndex) {
    if(functionIndex && this.trigFunctions[functionIndex]) {
      return this.trigFunctions[functionIndex].stringVersion;
    }
    else if(functionIndex && !this.trigFunctions[functionIndex]) {
      return false
    }
    else if(!functionIndex) {
      let returnString = []
      for(let i = 0; i < this.trigFunctions.length; i++) {
        returnString.push(this.trigFunctions[i].stringVersion);
      }
      returnString = returnString.join(" + ");
      return returnString;
    }
  }

  getValueAt(functionArgument, functionIndex) {
    let totalTrigFunction = "";
    let re = /argument/g;

    if(typeof functionIndex !== 'undefined') {
      totalTrigFunction = this.trigFunctions[functionIndex].stringVersion
    }
    else if(typeof functionIndex === 'undefined') {
      totalTrigFunction = this.getStringVersion();
    }
      totalTrigFunction = totalTrigFunction.replace(re, functionArgument);
      let result = eval(totalTrigFunction).toFixed(3)

      // avoids negative zeros that crop up for unknown reasons....
      if(result == 0) {
        let zero = 0;
        result = zero.toFixed(3);
      }
      return result;
  }
  

  setType(newType, functionIndex = 0) {
    if(this.trigFunctions[functionIndex]) {
      this.trigFunctions[functionIndex].type = newType;
      this._setStringVersion(functionIndex);
    } 
  }

  setAmplitude(newAmplitude, functionIndex = 0) {
    if(typeof newAmplitude === 'number' && this.trigFunctions[functionIndex]) {
      this.trigFunctions[functionIndex].amplitude = newAmplitude;
      this._setStringVersion(functionIndex);
    }
  }

  setPhaseShift(newPhaseShift, functionIndex = 0) {
    if(typeof newPhaseShift === 'number' && this.trigFunctions[functionIndex]) {
      this.trigFunctions[functionIndex].phaseShift = newPhaseShift;
      this._setStringVersion(functionIndex);
    }
  }

  setConstant(newConstant, functionIndex = 0) {
    if(typeof newConstant === 'number' && this.trigFunctions[functionIndex]) {
      this.trigFunctions[functionIndex].c = newConstant;
      this._setStringVersion(functionIndex);
    }
  }

  _setStringVersion(functionIndex) {
    let typeObject = this._getStandardForm(this.trigFunctions[functionIndex].type, this.trigFunctions[functionIndex].amplitude, this.trigFunctions[functionIndex].phaseShift, this.trigFunctions[functionIndex].c);

    if(typeObject) {
      this.trigFunctions[functionIndex].stringVersion = typeObject.stringVersion;
    }
  }

  appendFunction(type = "sin", amplitude = 1, phaseShift = 0, c = 0) {
    let typeObject = this._getStandardForm(type, amplitude, phaseShift);

    if(typeObject) {
        this.trigFunctions.push(typeObject)
      }
  }

}




class TrigSeries {
  constructor(trigObject) {
    this.trigObject = trigObject;
    
  }

  getSeries(numberOfSamples, startNum, endNum, includeEndpoints = true) {
    let interval = 2*Math.PI;
    if(startNum !== 'undefined' && endNum !== 'undefined') {
      interval = endNum - startNum;
    }
    let arr = [];

    for(let i = 0; i < numberOfSamples; i++) {
      arr.push(this.trigObject.getValueAt(startNum + i*interval/numberOfSamples));
    }
    if(includeEndpoints) {
      arr.push(this.trigObject.getValueAt(endNum));
    }

    return arr;
  }
}

// sample of how to use functionality
let sinObject = new TrigFunction('sin', 1, 0, 0);
let trigSeries = new TrigSeries(sinObject);
console.log(trigSeries.getSeries(4, Math.PI, 3*Math.PI/2,));

//should try to make function that will evenly divide an interval between two end points into and arbitrary number of evenly spaced samples.
// go back through and comment your code!!!