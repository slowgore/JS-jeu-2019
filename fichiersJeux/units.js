const {Divinity} = require('../fichiersJeux/divinity');
const {City} = require('../fichiersJeux/city');

class Units {
  constructor() {
    this.divinity = new Divinity();
    this.city = new City();
    this.units = [];
    this.life = setTimeout(() => {
      this.isDamaged = false;
      this.isAlmostDead = false;
    }, 1000000);
  }

  get isWounded() {
    return this.isDamaged;
  }

  get isDead() {
    return this.isAlmostDead;
  }

  fight() {
    const a = Math.random();
    if (a >= 0.8) {
      this.isDamaged = true;
    } else if (a >= 0.4) {
      this.isAlmostDead = true;
    }
  }

//AddUnits, war et clearDeadUnits seront peut etre a mettre dans city pour ajouter des untité a une ville et non au global
  addUnits(qtyOfUnits) { //ici units est une liste this.units = [] a poser dans le main pour garder en memoire les unités créés ou pas
    return new Promise((resolve, reject) => {
      if (typeof qtyOfUnits === 'number') {
        setTimeout(() => {
          for (let i = 0; i <= qtyOfUnits; i++) {
            if (this.city.gold_ < 90 || this.city.corn_ < 30) {
              console.log(
                `You can't create units, you only have ${this.city.gold_} 
                gold and ${this.city.corn_} corn left`);
            } else {
              this.city.gold_ = this.city.gold_ - 100;
              this.city.corn_ = this.city.corn_ - 50;
              this.units.push(new Units()); //pas sur
            }
          }
          console.log(`You've just create ${qtyOfUnits} units`);
        }, this.divinity.timeFactor * 0.001 * qtyOfUnits);
      } else {
        reject(new Error(
          ` ${qtyOfUnits} bullshit!! it's not a number`
        ));
      }
    });
  }

  clearUnitsIfDead() {
    this.units = this.units.filter(this.units.isDead === false);
  }

  war(opponent) {
    return new Promise((resolve, reject) => {
      if (typeof opponent === 'number') {
        setTimeout(() => {
          this.units.forEach(this.units.fight());
        }, (this.divinity.timeFactor * Math.random() * 4000) + 2000);
        this.clearUnitsIfDead();
      } else {
        reject(new Error(`Erreur : ${opponent} is not a number`));
      }
    });
  }

}

module.exports = {Units};