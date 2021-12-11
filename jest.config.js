module.exports = {
    testPathIgnorePatterns: ['node_modules'],
    testTimeout: 30000,
    projects: [
        {
            displayName: 'Node',
            testEnvironment: 'node',
            testRegex: '((\\.|/)(test|test-node))\\.js$',
            moduleNameMapper: {
                '\\.(css|styl)$': '<rootDir>/__tests_utils__/style-mock.js'
            }
        },
        {
            displayName: 'JSDom',
            testEnvironment: 'jsdom',
            testRegex: '((\\.|/)(test|test-jsdom))\\.js$',
            moduleNameMapper: {
                '\\.(css|styl)$': '<rootDir>/__tests_utils__/style-mock.js'
            },
        },
        {
            displayName: 'Chrome',
            preset: 'jest-playwright-preset',
            setupFilesAfterEnv: ['expect-playwright'],
            testRegex: '((\\.|/)(test-chrome))\\.js$',
            moduleNameMapper: {
                '\\.(css|styl)$': '<rootDir>/__tests_utils__/style-mock.js'
            }
        }
    ]
};
