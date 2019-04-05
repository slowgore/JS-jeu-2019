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
      switch (answer1) {
        case '1':
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
        case '2':
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
      switch (answer1) {
        case '1':
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
        case '2':
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
      switch (answer2) {
        case '1':
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

        case '2':
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

    if (Math.random() > 0.1 && city1.units.length !== 0) {
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
        switch (answer) {
          case '1':
            console.clear();
            await tradeMdenu(city1);
            break;

          case '2':
            console.clear();
            await unitsMenu(city1);
            break;

          case '3':
            console.clear();
            await offerDivinity(city1);
            break;

          case '4':
            console.log('This is the end');
            // City1.deleteCity();
            death = true;
            break;

          default:
            console.log('Wrong choice, earth collapsed');
        }
        // Return confirm('');
      }
    );
  }
};

const main = async () => {
  const city1 = new City('maison', 'dieu');
  city1.init();
  console.log('long time ago, a city called ' + city1.name_ + ' was created by the god we call ' + city1.divinityName_ + ' and he chose you to continue his work and promise to help you in your task if you are worthy ! ');
  await game(city1);
};

main();
