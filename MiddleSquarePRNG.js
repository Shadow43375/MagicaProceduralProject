class MiddleSquarePRNG {

  constructor() {
    let defaultNumber = Date.now();
    this.seed = defaultNumber.toString();
  }

  setSeed(newSeed) {

    this.seed = newSeed.toString();
  }

  getMiddleNumber(num, sizeOfMiddle) {
    let str = num.toString();
    let hasEvenPadding = false;
    while(str.length < this.seed.length*2) {
        str = "0" + str;
    }

    let sizeOfPadding = (str.length - sizeOfMiddle)/2
    let middleNumber = str.slice(sizeOfPadding, sizeOfPadding+sizeOfMiddle);

    return middleNumber
  }

  generateNewNumber(unitInterval = false) {

    let bufferSeed = Math.pow(this.seed, 2);
    let re = /(?<=e\+)\d+/;
    let exp = parseInt(bufferSeed.toExponential().match(re)[0]);
    bufferSeed = bufferSeed.toPrecision(exp + 1);
    this.setSeed(this.getMiddleNumber(bufferSeed, this.seed.length));

    if(!unitInterval) {
      return this.seed;
    }
    else if(unitInterval) {
      return parseInt(this.seed)/Math.pow(10,this.seed.length);
    }
  }

  random() {
    for(let i = 0; i<100; i++) {
      this.generateNewNumber();
    }
    return parseInt(this.seed)/Math.pow(10,this.seed.length);
  }


  getPeriod(){

      let initialSeed = this.seed;
      let seenBefore = [initialSeed];
      let period = 0;

      while(!seenBefore.includes(this.generateNewNumber().toString())) {
        period++;
        seenBefore.push(this.seed);
      }
      if(seenBefore[period] === this.seed) {
        this.seed = initialSeed
        return period;
      }

      this.seed = initialSeed
      return period;
  }

  getPeriodList() {
    let period = this.getPeriod();
    let periodList = [this.seed];
    for(let i = 0; i< period; i++) {
      periodList.push(this.generateNewNumber());
    }

    return periodList;
  }

  findPeriod(desiredPeriodLength, smallEnd = 0, largeEnd = 1000) {
    let matchingSeeds = [];

    for(let i = smallEnd; i < largeEnd; i++) {
      let initialSeed = this.seed;
      this.setSeed(i);
      let periodLength = this.getPeriod();
      if(periodLength === desiredPeriodLength) {
        matchingSeeds.push(i);
      }
    }

    if(matchingSeeds[0]) {
      return matchingSeeds;
    }
    else if(!matchingSeeds[0]) {
      return false;
    }
  }

}

// example use of MiddleSquarePRNG class
// let PRNG = new MiddleSquarePRNG();
// PRNG.random();
// for(let i = 0; i<100; i++) {
//   console.log(Math.round(PRNG.random()*5));
// }