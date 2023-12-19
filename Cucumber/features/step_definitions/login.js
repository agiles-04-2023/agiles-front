const {Given, When, Then} = require('cucumber');
const Selector = require('testcafe').Selector;


Given('I open the login page', async function () {
  await testController.navigateTo('http://test.ljragusa.com.ar/sign-in');
});

When('I enter the email {string}', async function (email) {
  let input = Selector('[name="email"]').with({ boundTestRun: testController }); // Ver de poner el id del input
  await testController.typeText(input, email);
});

When('I enter the password {string}', async function (password) {
  let input = Selector('[name="password"]').with({ boundTestRun: testController }); // Ver de poner el id del input
  await testController.typeText(input, password);
});

When('I click the login button', async function () {
  let button = Selector('#sign-in').with({ boundTestRun: testController });
  await testController.click(button);
});

// Para ver si entro, revisa si existe una card con el id response-card

Then('I should be logged in', async function () {
  let responseCard = Selector('#userName').with({ boundTestRun: testController });
  await testController.expect(responseCard.exists).ok();
});