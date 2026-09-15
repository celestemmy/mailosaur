const {test, expect} = require('@playwright/test')
test('my first test', async({page}) => {
    await page.goto('https://app.soone.soemailsecurity.com')
    await expect (page).toHaveTitle(/Enterprise Email Security & Threat Operations | Ṣọ/)
})
test('login', async({page}) => {
    await page.goto('https://app.soone.soemailsecurity.com')
    await expect (page).toHaveTitle(/Enterprise Email Security & Threat Operations | Ṣọ/)

    const loginButton = page.getByRole('link', { name: /login/i })
    await loginButton.click()
    await expect (page).toHaveTitle(/Sign in to your account | Ṣọ Email Security/)
});

test('google login page', async ({ page }) => {
    await page.goto('https://app.soone.soemailsecurity.com/login')
    await expect(page).toHaveTitle(/Sign in to your account \| Ṣọ Email Security/)

    const acceptCookies = page.getByRole('button', { name: /accept all/i })
    if (await acceptCookies.isVisible().catch(() => false)) {
        await acceptCookies.click()
    }

    const popupPromise = page.waitForEvent('popup')
    await page.getByRole('button', { name: /continue with google/i }).click()

    const googlePopup = await popupPromise
    await googlePopup.waitForLoadState('domcontentloaded')

    await expect(googlePopup).toHaveURL(/accounts\.google\.com/)
    await expect(googlePopup).toHaveTitle(/Sign in - Google Accounts/)
});
