class Units {
  constructor() {
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
    if (a <= 0.8) {
      this.isDamaged = true;
    } else if (a <= 0.4) {
      this.isAlmostDead = true;
    }
  }
}

module.exports = {Units};