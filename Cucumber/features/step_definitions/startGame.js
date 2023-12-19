const {Given, When, Then} = require('cucumber');
const Selector = require('testcafe').Selector;


Given('I am on the Home page', async function () {
  await testController.navigateTo('http://test.ljragusa.com.ar/');
});

When('I click on the Game button', async function () {
  let button = Selector('#gameButton').with({ boundTestRun: testController });
  await testController.click(button);
});

Then('I should see the game page', async function (password) {
  let responseCard = Selector('#box-app').with({ boundTestRun: testController });
  await testController.expect(responseCard.exists).ok();
});

When('I click on the NO button', async function () {
  let button = Selector('#radioNO').with({ boundTestRun: testController });
  await testController.click(button);
});

When('I click on the Start Game button', async function () {
  let button = Selector('#startGame').with({ boundTestRun: testController });
  await testController.click(button);
});

// Para ver si entro, revisa si existe una card con el id response-card

Then('I should see the game page', async function () {
  let responseCard = Selector('gameCard').with({ boundTestRun: testController });
  await testController.expect(responseCard.exists).ok();
});