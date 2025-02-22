// jest.config.js
module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-native-svg|@unimodules|unimodules)',
    ],
  };