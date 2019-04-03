const {Divinity} = require('./divinity');
const {Units} = require('./units');

class City {
  constructor(name, divinityName) {
    this.name_ = name || 'UNKCITY';
    this.divinityName_ = divinityName || 'UNKDIVINITY';
    this.divinity_ = new Divinity(this.divinityName_);
    this.units = [];
    this.corn_ = 1000;
    this.gold_ = 1000;
    this.cornToBuy = this.getRandomCornDemande();
    this.goldForCorn = this.getRandomGoldForCorn();
    this.cornToSell = this.getRandomCornToSell();
    this.init();
  }

  init() {
    this.divinity_.init();
    this.divinity_.worldEvents.on('favor', shit => this.getShit(shit));
    this.divinity_.worldEvents.on('blessing', shit => this.getShit(shit));
  }

  getShit(s) {
    this.corn_ += Math.floor(s.corn);
    this.gold_ += Math.floor(s.gold);
  }

  giveShit() {
    this.divinity_.offeringCorn(this.corn_);
    this.divinity_.offeringGold(this.gold_);
    this.corn_ = 0;
    this.gold_ = 0;
  }

  giveCorn(s) {
    this.divinity_.offeringCorn(s);
    this.corn_ = this.corn_ - s;
  }

  giveGold(s) {
    this.divinity_.offeringGold(s);
    this.gold_ = this.gold_ - s;
  }

  getCorn() {
    return this.corn_;
  }

  getGold() {
    return this.gold_;
  }

  showShit() {
    console.log(`${this.name_}: C ${this.corn_}, G ${this.gold_}`);
  }

  // ---------------------------------Commerce----------------------------------------
  getRandomGoldForCorn() {
    return Math.floor(Math.random() * (30 - 10)) + 10;
  }

  getRandomCornDemande() {
    return Math.floor(Math.random() * (1000 - 100)) + 100;
  }

  getRandomCornToSell() {
    return Math.floor(Math.random() * (5000 - 50)) + 50;
  }

  sellCorn(Corn) {
    // A mettre dans le index.js if (Corn < this.corn_)
    if (Corn < this.cornToBuy) {
      this.corn_ -= Corn;
      this.gold_ += this.goldForCorn * Corn;
      this.cornToBuy -= Corn;
    } else {
      this.corn_ -= this.cornToBuy;
      this.gold_ += this.goldForCorn * this.cornToBuy;
      this.cornToBuy = 0;
    }
  }

  buyCorn(Corn) {
    if (Corn < this.cornToSell) {
      if ((this.gold_ - (Corn * this.goldForCorn)) >= 0) {
        this.gold_ -= Corn * this.goldForCorn;
        this.corn_ += Corn;
        this.cornToSell -= Corn;
      } else {
        this.corn_ += parseInt((this.gold_ / this.goldForCorn), 10);
        this.cornToSell -= parseInt((this.gold_ / this.goldForCorn), 10);
        this.gold_ -= parseInt((this.gold_ / this.goldForCorn), 10) * this.goldForCorn;
      }
    } else {
      this.gold_ -= this.cornToSell * this.goldForCorn;
      this.corn_ += this.cornToSell;
      this.cornToSell = 0;
    }
  }

  addUnits(qtyOfUnits) {
    return new Promise((resolve, reject) => {
      if (typeof qtyOfUnits === 'number') {
        setTimeout(() => {
          for (let i = 1; i <= qtyOfUnits; i++) {
            this.gold_ = this.gold_ - 100;
            this.corn_ = this.corn_ - 50;
            this.units.push(new Units());
          }

          console.log(`You've just create ${qtyOfUnits} units \n`);
        }, this.divinity_.timeFactor * 0.001 * qtyOfUnits);
      }

      else {
        reject(new Error(
          `You didn't give a number as the quantity of units to add to your
          city, ${qtyOfUnits} isn't a number`
        ));
      }
    });
  }

  war(opponent) {
    let x = 0;
    while (x < opponent) {
      this.units[x].fight();
      x++;
    }
  }

  clearUnitsIfDead() {
    this.units = this.units.filter(this.units.isDead === false);
  }
}

module.exports = {City};
