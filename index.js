const {prompt} = require('node-ask');
const {confirm} = require('node-ask');
const {City} = require('./fichiersJeux/city');

const isNumeric = str => {
  return str.match('-?\\d+(\\.\\d+)?');
}; // Match a number with optional '-' and decimal.

const tradeMdenu = async city1 => {
  let b = 0;
  console.log('- - -TRADE MENU- - - ');
  console.log('- - -What\'s your next action ?- - - ');
  console.log(' \t--> 1 : Sell corn');
  console.log(' \t--> 2 : Buy corn ');

  await prompt('What is your choice ? : ').then(
    async answer1 => {
      console.log('You have selected option : ' + answer1);
      switch (true) {
        case (answer1 === '1' || answer1 === '1\r'):
          console.log('You have : ' + city1.getCorn() + ' Corn; ' + city1.getGold() + ' Gold.');
          console.log('Other city buy : ' + city1.cornToBuy + ' Corn.');
          console.log(city1.goldForCorn.toString() + ' gold for 1 Corn.');
          while (b === 0) {
            /* eslint-disable-next-line no-await-in-loop */
            await prompt('How many Corn would you like to Sell ? : ').then(
              async answer2 => {
                if (isNumeric(answer2)) {
                  city1.sellCorn(Number(answer2));
                  b = 1;
                } else {
                  console.log('Put a Number !');
                }
              });
            if (b === 1) {
              break;
            }
          }

          break;
        case (answer1 === '2' || answer1 === '2\r'):
          console.log('You have : ' + city1.getCorn() + ' Corn; ' + city1.getGold() + ' Gold.');
          console.log('Other city sell : ' + city1.cornToSell + ' Corn');
          console.log(city1.goldForCorn.toString() + ' Gold for 1 Corn');
          while (b === 0) {
            /* eslint-disable-next-line no-await-in-loop */
            await prompt('How many Corn would you like to buy ? : ').then(
              async answer2 => {
                if (isNumeric(answer2)) {
                  city1.buyCorn(Number(answer2));
                  b = 1;
                } else {
                  console.log('Put a Number !');
                }
              });
            if (b === 1) {
              break;
            }
          }

          break;

        default:
          break;
      }

      return confirm('');
    });
};

const offerDivinity = async city1 => {
  let b = 0;
  city1.showShit();
  console.log('how many things you want to give him ? ');
  console.log(' \t--> 1 : give corn');
  console.log(' \t--> 2 : give gold ');

  await prompt('What is your choice ? : ').then(
    async answer1 => {
      switch (true) {
        case (answer1 === '1' || answer1 === '1\r'):
          console.log('You have : ' + city1.getCorn() + ' Corn; ' + city1.getGold() + ' Gold.');
          while (b === 0) {
            /* eslint-disable-next-line no-await-in-loop */
            await prompt('How many Corn would you like to offer ? : ').then(
              async answer2 => {
                if (isNumeric(answer2)) {
                  city1.giveCorn(Number(answer2));
                  b = 1;
                } else {
                  console.log('Put a Number !');
                }
              });
            if (b === 1) {
              break;
            }
          }

          break;
        case (answer1 === '2' || answer1 === '2\r'):
          console.log('You have : ' + city1.getCorn() + ' Corn; ' + city1.getGold() + ' Gold.');
          while (b === 0) {
            /* eslint-disable-next-line no-await-in-loop */
            await prompt('How many Gold would you like to offer ? : ').then(
              async answer2 => {
                if (isNumeric(answer2)) {
                  city1.giveGold(Number(answer2));
                  b = 1;
                } else {
                  console.log('Put a Number !');
                }
              });
            if (b === 1) {
              break;
            }
          }

          break;

        default:
          break;
      }

      return confirm('');
    });
};

const unitsMenu = async city1 => {
  let c = 0;
  console.log('- - -UNITS MENU- - - ');
  console.log('- - -What\'s your next action ?- - - ');
  console.log(' \t--> 1 : Buy new units');
  console.log(' \t--> 2 : Send to war');

  await prompt('What is your choice ? : ').then(
    async answer2 => {
      switch (true) {
        case (answer2 === '1' || answer2 === '1\r'):
          while (c === 0) {
            const maxUnitsGold = Math.trunc(city1.getGold() / 100);
            const maxUnitsCorn = Math.trunc(city1.getCorn() / 50);
            const maxUnits = Math.min(maxUnitsCorn, maxUnitsGold);
            console.log('You have : ' + city1.units.length + ' warrior');
            console.log('you can create a maximum of : ' + maxUnits + ' Units');
            /* eslint-disable-next-line no-await-in-loop */
            await prompt('How many Units would you like to buy ? : ').then(
              async answer2 => {
                if (isNumeric(answer2) && answer2 <= maxUnits) {
                  city1.addUnits(Number(answer2));
                  c = 1;
                } else {
                  console.log('\nPut a Number equal or below : ' + maxUnits);
                }
              });
            if (c === 1) {
              break;
            }
          }

          break;

        case (answer2 === '2' || answer2 === '2\r'):
          if (city1.units.length >= 2) {
            const opponent1 = Math.floor((Math.random() * (city1.units.length - Math.floor(city1.units.length * 0.4) + 1)) + (Math.floor(city1.units.length * 0.4)));
            console.log('War is comming');
            city1.war(opponent1);
            city1.clearUnitsIfDead();
            console.log('units after this war : ' + city1.units.length);
          } else {
            console.log('There is no opponent in front of you');
            break;
          }

          break;

        default:
          break;
      }

      return confirm('');
    });
};

const game = async city1 => {
  let death = false;
  while (!death) {
    city1.clearUnitsIfDead();

    if (Math.random() > 0.8 && city1.units.length !== 0) {
      console.log('random opponent arrive in front of you ! be carreful, war is comming');
      const opponent1 = Math.floor((Math.random() * (city1.units.length - Math.floor(city1.units.length * 0.4) + 1)) + (Math.floor(city1.units.length * 0.4)));
      city1.war(opponent1);
      console.log('units after this war : ' + city1.units.length);
    }

    console.log('- - - - -  - - M E N U - - - - - - - - ');
    console.log('- - - -What\'s your next action ?- - - - ');
    console.log('\t--> 1 : Trade');
    console.log('\t--> 2 : Units');
    console.log('\t--> 3 : Divinity give offer');
    console.log('\t--> 4 : The End');

    /* eslint-disable-next-line no-await-in-loop */
    await prompt('What is your choice ? : ').then(
      async answer => {
        switch (true) {
          case (answer === '1' || answer === '1\r'):
            console.clear();
            await tradeMdenu(city1);
            break;

          case (answer === '2' || answer === '2\r'):
            console.clear();
            await unitsMenu(city1);
            break;

          case (answer === '3' || answer === '3\r'):
            console.clear();
            await offerDivinity(city1);
            break;

          case (answer === '4' || answer === '4\r'):
            console.log('This is the end');
            city1.endWorld();
            death = true;
            break;

          default:
            console.log('Wrong choice, try again !');
        }
      }
    );
  }

  console.log('Wrong choice, earth collapsed, try again !');
};

const main = async () => {
  const city1 = new City('house', 'god');
  city1.init();
  console.log('long time ago, a city called "' + city1.name_ + '" was created by a spirit we call "' + city1.divinityName_ + '" and he chose you to continue his work and promise to help you in your task if you are worthy ! ');
  await game(city1);
};

main();
