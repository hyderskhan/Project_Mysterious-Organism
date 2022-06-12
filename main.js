// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const dnaMutateIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      if (this._dna[dnaMutateIndex] === newBase) {
        newBase = returnRandBase();
        this._dna[dnaMutateIndex] = newBase;
      } else {
        this._dna[dnaMutateIndex] = newBase;
      }
      return this._dna;
    },
    compareDNA(otherPAequor) {
      const sim = this.dna.reduce((acc, curr, idx, arr) => {
        if (arr[idx] === otherPAequor.dna[idx]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);
      const percentOfDNAShared = (sim / this.dna.length) * 100;
      const percentOfDNASharedFixed = percentOfDNAShared.toFixed(2);
      console.log(
        `${this.specimenNum} and ${otherPAequor.specimenNum} have ${percentOfDNASharedFixed}% DNA in common.`
      );
    },
    willLikelySurvive() {
      const BaseCOrG = this.dna.filter(
        (element) => element === "C" || element === "G"
      );
      return BaseCOrG.length / this.dna.length >= 0.6;
    },
  };
};

const survivingSpecimen = [];
let counter = 1;

while (survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(counter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newOrg);
  }
  counter++;
}

console.log(survivingSpecimen);
