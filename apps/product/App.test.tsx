const { render } = require('@testing-library/react-native');
const App = require('./index').default;

// Mock Expo Router
jest.mock('expo-router', () => ({
  Stack: ({ children }: { children: React.ReactNode }) => children,
  Slot: () => 'Mocked Slot Component',
}));

// Mock Expo modules
jest.mock('expo-font', () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
  isLoaded: jest.fn(() => true),
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: () => 'StatusBar',
}));

// Mock safe area context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('App', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('Mocked Slot Component')).toBeTruthy();
  });
});