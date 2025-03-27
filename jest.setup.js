import 'react-native-gesture-handler/jestSetup'
import '@testing-library/jest-native/extend-expect'

jest.mock('expo-constants', () => ({
    manifest: {
        android: { theme: 'dark' },
        ios: { theme: 'light' },
    },
}))

jest.mock('expo-router', () => ({
    router: {
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
        prefetch: jest.fn(),
    },
}))

jest.mock('@expo/vector-icons', () => ({
    Ionicons: 'Ionicons',
}))

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
