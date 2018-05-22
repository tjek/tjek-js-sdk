module.exports = {
    preset: "jest-puppeteer",
    rootDir: "../../../",
    moduleFileExtensions: ["coffee", "js"],
    transform: {
        "^.+\\.(coffee)$": "<rootDir>/jest-preprocessor.js"
    },
    testMatch: ["**/__tests__/integration/chrome/**/*.(coffee|js)"],
    testPathIgnorePatterns: ["jest-config.js","webpack-compiler.js"]
};
