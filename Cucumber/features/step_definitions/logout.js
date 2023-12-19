const {Given, When, Then} = require('cucumber');
const Selector = require('testcafe').Selector;


Given('I am staying on the homepage', async function () {
  await testController.navigateTo('http://test.ljragusa.com.ar/');
});

When('I am logged in', async function () {
  let responseCard = Selector('#userName').with({ boundTestRun: testController });
  await testController.expect(responseCard.exists).ok();
});

When('I click on the logout button', async function () {

  let userButton = Selector('#userName').with({ boundTestRun: testController });
  await testController.click(userButton);

  let logoutBtn = Selector('#logout').with({ boundTestRun: testController });
  await testController.click(logoutBtn);
});

Then('I click the login button', async function () {
  let button = Selector('#sign-in').with({ boundTestRun: testController });
  await testController.click(button);
});
