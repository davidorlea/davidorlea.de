const { test, expect } = require('@playwright/test');

test('has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('David Orlea');
});

test('has correct meta description', async ({ page }) => {
    await page.goto('/');
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute(
        'content',
        'Personal website of David Orlea.',
    );
});

test('has all navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Github' })).toHaveAttribute(
        'href',
        'https://github.com/DavidOrlea',
    );
    await expect(page.getByRole('link', { name: 'Keybase' })).toHaveAttribute(
        'href',
        'https://keybase.io/DavidOrlea',
    );
    await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
        'href',
        'https://www.linkedin.com/pub/david-orlea/9b/2a8/b42',
    );
    await expect(page.getByRole('link', { name: 'XING' })).toHaveAttribute(
        'href',
        'https://www.xing.com/profile/David_Orlea',
    );
});
