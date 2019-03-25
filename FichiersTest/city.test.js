const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {City} = require('../fichiersJeux/city');

chai.use(chaiAsPromised);
chai.should();

describe('City', () => {
  let g;
  before(() => {
    g = new City("hellyeah");
  });

  it('should sell corn', async () => {
    g.getCorn().should.be.equal(1000);
    g.getGold().should.be.equal(1000);

    await g.sellCorn(100);
    g.getCorn().should.be.equal(900);
    g.getGold().should.be.equal(1000 + 100 * g.goldForCorn);
  });
});