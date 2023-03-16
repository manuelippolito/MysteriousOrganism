// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  function pAequorFactory(number, array) {
    return {
      specimenNum: number,
      dna: array,
      // simulate a mutation (randomly select a base in the object's dna property and change the current base to a different base)
      mutate() {
        const randIndex = Math.floor(Math.random() * this.dna.length);
        let newBase = returnRandBase();
        while (this.dna[randIndex] === newBase) {
          newBase = returnRandBase();
        }
        this.dna[randIndex] = newBase;
        return this.dna;
        
      },
      
      // Compare the DNA sequences of different organisms
      compareDNA(otherOrg) {
        //console.log("this.dna is: ", this.dna);
        //console.log("otherOrg dna is: ", otherOrg.dna);
        let baseCounter = 0;
        for (let i = 0; i < this.dna.length; i++) {
          let otherOrganism = otherOrg.dna[i];
          let thisOrganism = this.dna[i];
          if(otherOrganism === thisOrganism){
            baseCounter += 1;
          } 
        } 
        const percentageDna = Math.round((baseCounter/this.dna.length)*100);
        //console.log(baseCounter);
        //console.log(percentageDna); 
        console.log(`specimen #1 and specimen #2 have ${percentageDna}% DNA in common`) 
      },
  
      // Chance of the organism's survival with more G & C bases
      willLikelySurvive() {
        let baseCG = 0;
        for (let i = 0; i < this.dna.length; i++) {
          if(this.dna[i] === 'C'){
            baseCG += 1;
          }
          if(this.dna[i] === 'G'){
            baseCG += 1;
          }
        }
        const percentageDna = Math.round((baseCG/this.dna.length)*100)
        //console.log(baseCG);
        //console.log("DNA array contains this percentage of 'C' and 'G' bases:", percentageDna);
        if(percentageDna >= 60) {
          return true;
        }
        else {return false;}
      }
    }
  };
  
  //console.log(pAequorFactory(1, mockUpStrand()));
  
  //console.log("MUTATE: ", pAequorFactory(1, mockUpStrand()).mutate());
  
  // setting up one instance
  let org = pAequorFactory(2, mockUpStrand());
  
  // Why is undefined printing after this????
  console.log(org.compareDNA(pAequorFactory(2, mockUpStrand())));
  
  //console.log("Will survive: ", org.willLikelySurvive());
  
  // Array of 30 instances 
  const orgSurvive = [];
  
  //console.log(org.dna); 
  
  
  let i = 1;
  while (orgSurvive.length < 30) {
    let newOrg = pAequorFactory(i, mockUpStrand());
    if(newOrg.willLikelySurvive() === true) {
    orgSurvive.push(newOrg);
  }
    i++;
  }
  
  console.log(orgSurvive);
