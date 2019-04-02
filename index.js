const prompt = require('node-ask').prompt;
const confirm = require('node-ask').confirm;
const {City} = require('./fichiersJeux/city');

const isNumeric = str => {
  return str.match('-?\\d+(\\.\\d+)?');  //match a number with optional '-' and decimal.
};

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
          while (true) {
            await prompt('How many Corn would you like to Sell ? : ').then(
              async answer2 => {
                if (isNumeric(answer2)) {
                  city1.sellCorn(Number(answer2));
                  b = 1;
                } else {
                  console.log('Put a Number !');
                }
              });
            if (b == 1)
              break;
          }
          // Ajout de fonction city1.sellCorn
          break;
        case '2':
          console.log('You have : ' + city1.getCorn() + ' Corn; ' + city1.getGold() + ' Gold.');
          console.log('Other city sell : ' + city1.cornToSell + ' Corn');
          console.log(city1.goldForCorn.toString() + ' Gold for 1 Corn');
          while (true) {
            await prompt('How many Corn would you like to buy ? : ').then(
              async answer2 => {
                if (isNumeric(answer2)) {
                  city1.buyCorn(Number(answer2));
                  b = 1;
                } else {
                  console.log('Put a Number !');
                }
              });
            if (b == 1)
              break;
          }
          // Ajout de fonction city1.buyCorn
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
          while(true) {
            let maxUnitsGold = Math.trunc(city1.getGold() / 100);
            let maxUnitsCorn = Math.trunc(city1.getCorn() / 50);
            let maxUnits = Math.min(maxUnitsCorn, maxUnitsGold);
            console.log('You have : ' + city1.units.length + ' warrior');
            console.log('you can create a maximum of : ' + maxUnits + ' Units');
            await prompt('How many Units would you like to buy ? : ').then(
              async answer2 => {
                if (isNumeric(answer2) && answer2 <= maxUnits) {
                  city1.addUnits(Number(answer2));
                  c = 1;
                } else {
                  console.log('\nPut a Number equal or below : ' + maxUnits);
                }
              });
            if (c == 1)
              break;
          }
          break;

          case '2':
          // Calcul of opponent
          /*if (city1.units.length >= 2 ) {
            //let opponent = Math.trunc(Math.random() * Math.floor(Number(this.units.length) - 2));*/
            console.log('War is comming');
            city1.war(city1.units.length);
            //city1.clearUnitsIfDead();
          /*} else {
            console.log('There is no opponent in front of you');
            break;
          }*/
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

    console.log('long time ago, a city called '+city1.name_+' was created by the god we call ' +city1.divinityName_ + ' and he chose you to continue his work and promise to help you in your task if you are worthy ! ');
    console.log('- - - - -  - - M E N U - - - - - - - - ');
    console.log('- - - -What\'s your next action ?- - - - ');
    console.log('\t--> 1 : Trade');
    console.log('\t--> 2 : Units');
    console.log('\t--> 3 : The End');

    await prompt('What is your choice ? : ').then(
      async answer => {

        switch (answer) {
          case '1':
            await tradeMdenu(city1);
            break;

          case '2':
            console.clear();
            await unitsMenu(city1);
            break;

          case '3':
            console.log('This is the end');
            // City1.deleteCity();
            death = true;
            break;

          default:
            console.log('Wrong choice, earth collapsed');
        }
        // return confirm('');
      }
    );
  }
};

const main = async () => {
  const city1 = new City("maison","dieu");
  city1.init();
  await game(city1);
};

main();
