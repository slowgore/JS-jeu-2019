class Units {
  constructor() {
    this.isAlmostDead = false;
    this.isDamaged = false;
    this.life = setTimeout(() => {
      this.isAlmostDead = true;
    }, 15000);
  }

  get isWounded() {
    return this.isDamaged;
  }

  get isDead() {
    return this.isAlmostDead;
  }

  fight() {
    const a = Math.random();
    if (a <= 0.8) {
      this.isDamaged = true;
    } else if (a <= 0.4) {
      this.isAlmostDead = true;
    }
  }
}

module.exports = {Units};
