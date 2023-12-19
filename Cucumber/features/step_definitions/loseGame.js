const {Given, When, Then} = require('cucumber');
const Selector = require('testcafe').Selector;


Given('I am on the config page', async function () {
  await testController.navigateTo('http://test.ljragusa.com.ar/game');
});

When('I start a game', async function () {
  let button = Selector('#startGame').with({ boundTestRun: testController });
  await testController.click(button);
});

Then('I should see the gamePage', async function () {
  let responseCard = Selector('#gameCard').with({ boundTestRun: testController });
  await testController.expect(responseCard.exists).ok();
});

When('I click on the A', async function () {
  let btnA = Selector('.letters > :nth-child(1)').with({ boundTestRun: testController });
  await testController.click(btnA);
});

When('I click on the B', async function () {
  let btnB = Selector('.letters > :nth-child(2)').with({ boundTestRun: testController });
  await testController.click(btnB);
}
);

When('I click on the C', async function () {
  let btnC = Selector('.letters > :nth-child(3)').with({ boundTestRun: testController });
  await testController.click(btnC);
}
);

When('I click on the D', async function () {
  let btnD = Selector('.letters > :nth-child(4)').with({ boundTestRun: testController });
  await testController.click(btnD);
}
);

When('I click on the E', async function () {
  let btnE = Selector('.letters > :nth-child(5)').with({ boundTestRun: testController });
  await testController.click(btnE);
}
);

When('I click on the F', async function () {
  let btnF = Selector('.letters > :nth-child(6)').with({ boundTestRun: testController });
  await testController.click(btnF);
}
);

When('I click on the G', async function () {
  let btnG = Selector('.letters > :nth-child(7)').with({ boundTestRun: testController });
  await testController.click(btnG);
}
);

When('I click on the H', async function () {
  let btnH = Selector('.letters > :nth-child(8)').with({ boundTestRun: testController });
  await testController.click(btnH);
}
);

When('I click on the I', async function () {
  let btnI = Selector('.letters > :nth-child(9)').with({ boundTestRun: testController });
  await testController.click(btnI);
}
);

Then('I click on the Finalizar button', async function () {
  let button = Selector('#endGame').with({ boundTestRun: testController });
  await testController.click(button);
});

Then('I should see the losePage', async function () {
  let responseCard = Selector('#endGameText').with({ boundTestRun: testController });
  await testController.expect(responseCard.exists).ok();
});

// Para ver si entro, revisa si existe una card con el id response-card

