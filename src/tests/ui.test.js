const { test, expect } = require('@playwright/test');

test('Verify "All books" link is visible', async ({ page }) => {
    await page.goto("http://localhost:3001/");
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});


test('Verify "Login" link is visible', async ({ page }) => {
    await page.goto("http://localhost:3001/");
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/login"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});


test('Verify "Register" link is visible', async ({ page }) => {
    await page.goto("http://localhost:3001/");
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/register"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify "All books" link is visible after user login', async({ page })=>{
    await page.goto("http://localhost:3001/login");
    await page.fill('#email','peter@abv.bg');
    await page.fill('#password','123456');
    await page.click('#login-form > fieldset > input');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify "My Books" button is visible after user login', async({ page })=>{
    await page.goto("http://localhost:3001/login");
    await page.fill('#email','peter@abv.bg');
    await page.fill('#password','123456');
    await page.click('#login-form > fieldset > input');

    const allBooksButton = await page.$('a[href="/profile"]');
    const isButtonVisible = await allBooksButton.isVisible();

    expect(isButtonVisible).toBe(true);
});

test('Verify "Add Book" button is visible after user login', async({ page })=>{
    await page.goto("http://localhost:3001/login");
    await page.fill('#email','peter@abv.bg');
    await page.fill('#password','123456');
    await page.click('#login-form > fieldset > input');

    const allBooksButton = await page.$('a[href="/create"]');
    const isButtonVisible = await allBooksButton.isVisible();

    expect(isButtonVisible).toBe(true);
});

test('Verify user email is visible after user login', async({ page })=>{
    await page.goto("http://localhost:3001/login");
    await page.fill('#email','peter@abv.bg');
    await page.fill('#password','123456');
    await page.click('#login-form > fieldset > input');

    const allBooksButton = await page.$('#user > span');
    const isButtonVisible = await allBooksButton.isVisible();

    expect(isButtonVisible).toBe(true);
});

test('Login with valid credentials', async( {page })=>{
    await page.goto("http://localhost:3001/login");
    await page.fill('#email','peter@abv.bg');
    await page.fill('#password','123456');
    await page.click('#login-form > fieldset > input');
    await page.$('a[href="/catalog"]');

    expect(page.url()).toBe("http://localhost:3001/catalog");
});

test('Login with empty fields', async({ page })=>{
    await page.goto("http://localhost:3001/login");
    await page.click('#login-form > fieldset > input');

    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
});

test('Register with valid input', async({ page })=>{
    await page.goto("http://localhost:3001/register");
    await page.fill('#email','testmail@gmail.com');
    await page.fill('#password','0000');
    await page.fill('#repeat-pass', '0000');
    await page.click('#register-form > fieldset > input');
    await page.$('a[href="/catalog"]');

    expect(page.url()).toBe("http://localhost:3001/register");
    
});

test('Register with empty fields', async({ page })=>{
    await page.goto("http://localhost:3001/register");
    await page.click('#register-form > fieldset > input');

    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
});


test('Register with empty email', async({ page })=>{
    await page.goto("http://localhost:3001/register");
    await page.fill('#password','0000');
    await page.fill('#repeat-pass', '0000');
    await page.click('#register-form > fieldset > input');

    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
});

test('Add book with correct data', async( {page }) =>{
    await page.goto("http://localhost:3001/login");
    await page.fill('#email','peter@abv.bg');
    await page.fill('#password','123456');
    await Promise.all([
        page.click('input[type=submit]'),
        page.waitForURL("http://localhost:3001/catalog")
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'gfrzgfzrge ew rr37rt wgezr');
    await page.fill('#image', 'https://m.media-amazon.com/images/I/A1JGM7FozyL._SL1500_.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form > fieldset > input');
    await page.waitForURL("http://localhost:3001/catalog");

    expect(page.url()).toBe("http://localhost:3001/catalog");
});


test('Add book with an empty title field', async( { page }) =>{
    await page.goto("http://localhost:3001/login");
    await page.fill('#email','peter@abv.bg');
    await page.fill('#password','123456');
    await Promise.all([
        page.click('input[type=submit]'),
        page.waitForURL("http://localhost:3001/catalog")
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#description', 'gfrzgfzrge ew rr37rt wgezr');
    await page.fill('#image', 'https://m.media-amazon.com/images/I/A1JGM7FozyL._SL1500_.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form > fieldset > input');

    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
});

test('Add book with an empty description field', async( { page }) =>{
    await page.goto("http://localhost:3001/login");
    await page.fill('#email','peter@abv.bg');
    await page.fill('#password','123456');
    await Promise.all([
        page.click('input[type=submit]'),
        page.waitForURL("http://localhost:3001/catalog")
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#image', 'https://m.media-amazon.com/images/I/A1JGM7FozyL._SL1500_.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form > fieldset > input');
    
    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
});

test('Add book with an empty url field', async( { page }) =>{
    await page.goto("http://localhost:3001/login");
    await page.fill('#email','peter@abv.bg');
    await page.fill('#password','123456');
    await Promise.all([
        page.click('input[type=submit]'),
        page.waitForURL("http://localhost:3001/catalog")
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'gfrzgfzrge ew rr37rt wgezr');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form > fieldset > input');
    
    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
});

test('Verify that all books are displayed', async({ page })=>{
    await page.goto("http://localhost:3001/login");
    await page.fill('#email','peter@abv.bg');
    await page.fill('#password','123456');
    await Promise.all([
        page.click('input[type=submit]'),
        page.waitForURL("http://localhost:3001/catalog")
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'gfrzgfzrge ew rr37rt wgezr');
    await page.fill('#image', 'https://m.media-amazon.com/images/I/A1JGM7FozyL._SL1500_.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form > fieldset > input');
    await page.waitForURL("http://localhost:3001/catalog");
    await page.waitForSelector('#dashboard-page');
    const bookElements = await page.$$('#dashboard-page > ul > li');

    expect( bookElements.length).toBeGreaterThan(0);
});

test('Verify that no books are displayed', async({ page })=>{
    await page.goto("http://localhost:3001/login");
    await page.fill('#email','peter@abv.bg');
    await page.fill('#password','123456');
    await Promise.all([
        page.click('input[type=submit]'),
        page.waitForURL("http://localhost:3001/catalog")
    ]);
    await page.click('a[href="/profile"]')
    await page.waitForURL("http://localhost:3001/profile");
    await page.waitForSelector('#my-books-page');
    const noBooksElementIsVisible = await page.$('#my-books-page');
    const isLinkVisible = await noBooksElementIsVisible.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Login and navigate to Details page', async({ page })=>{
    await page.goto("http://localhost:3001/login");
    await page.fill('#email','peter@abv.bg');
    await page.fill('#password','123456');
    await Promise.all([
        page.click('input[type=submit]'),
        page.waitForURL("http://localhost:3001/catalog")
    ]);
    await page.click('a[href="/catalog"]');
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'gfrzgfzrge ew rr37rt wgezr');
    await page.fill('#image', 'https://m.media-amazon.com/images/I/A1JGM7FozyL._SL1500_.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form > fieldset > input');
    await page.waitForURL("http://localhost:3001/catalog");
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');
    const detailPageTitle = await page.textContent('.book-information h3');
    
    expect(detailPageTitle).toBe('Test Book');
})