jest.mock("expo-constants", () => ({
    manifest: {
      android: { theme: "dark" },
      ios: { theme: "light" },
    },
  }));

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  },
}));