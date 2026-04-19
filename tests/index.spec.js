const { test, expect } = require('@playwright/test');

test('has correct content security policy', async ({ page }) => {
    await page.goto('/');
    const csp = page.locator('meta[http-equiv="Content-Security-Policy"]');
    await expect(csp).toHaveAttribute(
        'content',
        "default-src 'none'; style-src 'unsafe-inline'; font-src 'self'; img-src 'self'; script-src 'self' static.cloudflareinsights.com; connect-src cloudflareinsights.com; base-uri 'none'; form-action 'none';",
    );
});

test('blocks inline scripts', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
        const script = document.createElement('script');
        script.textContent = 'window.__inlineScriptRan = true;';
        document.head.appendChild(script);
    });
    const scriptRan = await page.evaluate(
        () => window.__inlineScriptRan === true,
    );
    expect(scriptRan).toBe(false);
});

test('allows scripts from own origin (e.g. Cloudflare /cdn-cgi/)', async ({ page }) => {
    await page.goto('/');
    const violated = await page.evaluate(() => {
        return new Promise((resolve) => {
            document.addEventListener(
                'securitypolicyviolation',
                () => resolve(true),
                {
                    once: true,
                },
            );
            const script = document.createElement('script');
            script.src = '/cdn-cgi/some/thing.js';
            document.head.appendChild(script);
            setTimeout(() => resolve(false), 500);
        });
    });
    expect(violated).toBe(false);
});

test('blocks scripts from untrusted origins', async ({ page }) => {
    await page.goto('/');
    const violated = await page.evaluate(() => {
        return new Promise((resolve) => {
            document.addEventListener(
                'securitypolicyviolation',
                () => resolve(true),
                {
                    once: true,
                },
            );
            const script = document.createElement('script');
            script.src = 'https://example.com/evil.js';
            document.head.appendChild(script);
            setTimeout(() => resolve(false), 500);
        });
    });
    expect(violated).toBe(true);
});

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
