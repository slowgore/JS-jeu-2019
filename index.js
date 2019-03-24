const prompt = require('node-ask').prompt;
const confirm = require('node-ask').confirm;
const {City} = require('./fichiersJeux/city');

const tradeMdenu = async () => {
  console.log('- - -TRADE MENU- - - ');
  console.log('- - -What\'s your next action ?- - - ');
  console.log(' \t--> 1 : Sell corn');
  console.log(' \t--> 2 : Buy corn ');

  await prompt('What is your choice ? : ').then(
    async answer1 => {
      console.log('You have selected option ', answer1);
      switch (answer1) {
        case '1':
          console.log('You have selected option 1');
          // Ajout de fonction city1.sellCorn
          break;
        case '2':
          console.log('You have selected option 2');
          // Ajout de fonction city1.buyCorn
          break;
      }

      return confirm('');
    });
}

const unitsMenu = async () => {
  console.log('- - -UNITS MENU- - - ');
  console.log('- - -What\'s your next action ?- - - ');
  console.log(' \t--> 1 : Buy new units');
  console.log(' \t--> 2 : Send to war');

  await prompt('What is your choice ? : ').then(
    async answer2 => {
      console.log('You have selected option ', answer2);
      switch (answer2) {
        case '1':
          // Ajout de fonction units.buyUnits
          break;
        case '2':
          // Ajout de fonction units.War
          break;
      }

      return confirm('');
    });
}

const game = async city1 => {
  let death = false;

  while (!death) {
    console.log('- - - - -  - - M E N U - - - - - - - - ');
    console.log('- - - -What\'s your next action ?- - - - ');
    console.log('\t--> 1 : Trade');
    console.log('\t--> 2 : Units');
    console.log('\t--> 3 : The End');

    await prompt('What is your choice ? : ').then(
      async answer => {
        console.log('You have selected option ', answer);

        switch (answer) {
          case '1':
            await tradeMdenu();
            break;

          case '2':
            console.clear();
            await unitsMenu();
            break;

          case '3':
            console.log('This is the end');
            // City1.deleteCity();
            death = true;
            break;

          default:
            console.log('Wrong choice, earth collapsed');
        }
        return confirm('');
      }
    );
  }
};

const main = async () => {
  const city1 = new City();
  city1.init();
  await game(city1);
};

main();
