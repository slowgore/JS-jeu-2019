class Units {
  constructor() {
    this.isAlmostDead = false;
    this.life = setTimeout(() => {
      this.isAlmostDead = true;
    }, 25000);
  }

  fight() {
    const a = Math.random();
    if (a <= 0.4) {
      this.isAlmostDead = true;
    }
  }
}

module.exports = {Units};
