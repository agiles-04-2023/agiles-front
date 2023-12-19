const {Given, When, Then} = require('cucumber');
const Selector = require('testcafe').Selector;


Given('I am on the register page', async function () {
  await testController.navigateTo('http://test.ljragusa.com.ar/sign-up');
});

When('I enter de full name {string}', async function (fullname) {
  let input = Selector('[name="fullName"]').with({ boundTestRun: testController }); // Ver de poner el id del input
  await testController.typeText(input, fullname);
});

When('I enter the email', async function () {

  // Genero un mail random
  var caracteres = "abcdefghijklmnopqrstuvwxyz0123456789";
  var correoElectronico = "";

  for (var i = 0; i < 10; i++) {
    var caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    correoElectronico += caracterAleatorio;
  }

  correoElectronico += "@gmail.com";

  let input = Selector('[name="email"]').with({ boundTestRun: testController }); // Ver de poner el id del input
  await testController.typeText(input, correoElectronico);
});

When('I enter the secret-password {string}', async function (password) {
  let input = Selector('[name="password"]').with({ boundTestRun: testController }); // Ver de poner el id del input
  await testController.typeText(input, password);
});

When('I click the sign-up button', async function () {
  let button = Selector('#test-sign-up').with({ boundTestRun: testController });
  await testController.click(button);
});

// Para ver si entro, revisa si existe una card con el id response-card

Then('I should be on the home page', async function () {
  let responseCard = Selector('#userName').with({ boundTestRun: testController });
  await testController.expect(responseCard.exists).ok();
});
