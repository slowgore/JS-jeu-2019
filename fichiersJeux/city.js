const {Divinity} = require('./divinity');


class City {
  constructor(name, divinityName) {
    this.name_ = name || 'UNKCITY';
    this.divinity_ = new Divinity(divinityName);
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

  showShit() {
    console.log(`${this.name_}: C ${this.corn_}, G ${this.gold_}`);
  }

  //---------------------------------Commerce----------------------------------------
  getRandomGoldForCorn() {
    return Math.floor(Math.random() * (30 - 10)) + 10;
  }

  getRandomCornDemande() {
    return Math.floor(Math.random() * (1000 - 100)) + 100;
  }

  getRandomCornToSell() {
    return Math.floor(Math.random() * (5000 - 50)) + 50;
  }

  giveCorn(Corn) {
    // à mettre dans le index.js if (Corn < this.corn_)
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

  getCorn(Corn) {
    if (Corn < this.cornToSell) {
      this.gold_ -= Corn * this.goldForCorn;
      this.corn_ += Corn;
      this.cornToSell -= Corn
    } else {
      this.gold_ -= this.cornToSell * this.goldForCorn;
      this.corn_ += this.cornToSell;
      this.cornToSell = 0;
    }
  }
}

module.exports = {City};
