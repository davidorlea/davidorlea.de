const { test, expect } = require('@playwright/test');

test('website is available', async ({ page }) => {
    const response = await page.goto('/');
    expect(response.status()).toBe(200);
});

test('version matches build', async ({ page }) => {
    test.skip(!process.env.BUILD_VERSION, 'BUILD_VERSION not set');
    await page.goto('/');
    const version = page.locator('meta[name="version"]');
    await expect(version).toHaveAttribute(
        'content',
        process.env.BUILD_VERSION,
    );
});
