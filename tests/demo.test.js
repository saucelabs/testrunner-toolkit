test('should login', async () => {
  const page = (await browser.pages())[0];
  await page.goto('https://the-internet.herokuapp.com/login');

  const usernameElement = await page.$('#username');
  const passwordElement = await page.$('#password');
  const submitElement = await page.$('button[type="submit"]');

  await usernameElement.type('tomsmith');
  await passwordElement.type('SuperSecretPassword!');
  await submitElement.click();

  await page.waitForNavigation();
  expect(await page.url()).toContain('secure');
})
