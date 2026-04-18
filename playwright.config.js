const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    reporter: [['html', { open: 'never', outputFolder: 'test-results' }]],
    webServer: {
        command: 'npm start',
        url: 'http://localhost:1234',
        reuseExistingServer: !process.env.CI,
    },
    use: {
        baseURL: 'http://localhost:1234',
    },
    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } },
        { name: 'firefox', use: { browserName: 'firefox' } },
        { name: 'webkit', use: { browserName: 'webkit' } },
    ],
});
