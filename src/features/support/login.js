import { Given, When, Then } from 'cucumber';
import Selector from 'testcafe';

Given('I open the login page', async function () {
    await testController.navigateTo('http://test.ljragusa.com.ar/sign-in');
});

When('I enter the email {string}', async function (email) {
  let input = Selector('#email').with({ boundTestRun: testController }); // Ver de poner el id del input
  await testController.typeText(input, email);
});

When('I enter the password {string}', async function (password) {
  let input = Selector('#password').with({ boundTestRun: testController }); // Ver de poner el id del input
  await testController.typeText(input, password);
});

When('I click on the login button', async function () {
  let button = Selector('#sign-up').with({ boundTestRun: testController }); // Ver de poner el id del boton
  await testController.click(button);
});

// Para ver si entro, revisa si existe una card con el id response-card

Then('I should be logged in', async function () {
  let responseCard = Selector('#response-card').with({ boundTestRun: testController });
  await testController.expect(responseCard.exists).ok();
});

// https://youtu.be/9Nt7DFZ32C4?t=1437