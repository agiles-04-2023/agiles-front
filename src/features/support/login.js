import { Given, When, Then } from 'cucumber';
import Selector from 'testcafe';

Given('I open the login page', async function () {
    await testController.navigateTo('https://test.ljragusa.com.ar/sign-in');
});

When('I enter my username', async function () {
    const usernameInput = Selector('#username');
    await testController.typeText(usernameInput, 'username');
}