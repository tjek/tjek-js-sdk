module.exports = {
    testPathIgnorePatterns: ['node_modules'],
    testTimeout: 30000,
    projects: [
        {
            displayName: 'Node',
            testEnvironment: 'node',
            testRegex: '((\\.|/)(test|test-node))\\.js$'
        },
        {
            displayName: 'JSDom',
            testEnvironment: 'jsdom',
            testRegex: '((\\.|/)(test|test-jsdom))\\.js$'
        },
        {
            displayName: 'Chrome',
            preset: 'jest-puppeteer-preset',
            testRegex: '((\\.|/)(test-chrome))\\.js$'
        }
    ]
};
