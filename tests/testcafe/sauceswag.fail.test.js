import { Selector } from 'testcafe';

fixture `Getting Started Sauce demo failing test`
  .page `https://www.saucedemo.com/`;


const Users = {
  password: "secret_sauce",
  standard: "standard_user",
  locked: "locked_out_user"
}

class Login {
  constructor () {
    this.usernameEl = Selector("#user-name")
    this.passwordEl = Selector("#password")
  }
}

const login = new Login()

test.skip('SwagLabs locked user login should fail', async t => {
  await t
    .typeText(login.usernameEl, Users.locked)
    .typeText(login.passwordEl, Users.password)
    .click('.bn_action') // Set wrong class to make test fail
      // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('h3, [data-test=error]').innerText).contains("Sorry")
    .expect(Selector('.error-button').visible).eql(true);
});
