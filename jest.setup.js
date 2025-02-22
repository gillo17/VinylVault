import 'react-native-gesture-handler/jestSetup';

jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

jest.mock('expo-constants', () => ({
  manifest: {
    extra: {
      eas: {
        projectId: 'mocked-project-id',
      },
    },
  },
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));