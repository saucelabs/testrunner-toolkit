describe('My Login application', () => {
    it('should login with valid credentials', <%= _async %>() => {
        browser.url('https://the-internet.herokuapp.com/login');
        $('#username').setValue(username);
        $('#password').setValue(password);
        $('button[type="submit"]').click();

        expect($('#flash')).toBeExisting();
        expect($('#flash')).toHaveTextContaining(
            'You logged into a secure area!');
    });
});