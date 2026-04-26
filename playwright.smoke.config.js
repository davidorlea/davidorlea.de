const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    testMatch: '**/smoke.spec.js',
    reporter: [['html', { open: 'never', outputFolder: 'test-results' }]],
    retries: 2,
    use: {
        baseURL: 'https://davidorlea.de',
    },
    projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
