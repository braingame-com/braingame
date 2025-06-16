const { render } = require('@testing-library/react-native');
const TasksScreen = require('./tasks').default;

// Mock all the dependencies
jest.mock('@braingame/bgui', () => ({
  PageWrapper: ({ children }: { children: React.ReactNode }) => children,
  View: ({ children }: { children: React.ReactNode }) => children,
  Text: ({ children }: { children: React.ReactNode }) => children,
  TextInput: () => 'TextInput',
  Button: ({ text }: { text: string }) => text,
}));

jest.mock('@braingame/utils', () => ({
  useTaskInput: () => ({
    tasks: [],
    newTask: '',
    inputError: false,
    inputRef: { current: null },
    setNewTask: jest.fn(),
    addTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  }),
  useDraggableTaskHandlers: () => ({
    handleDragStart: jest.fn(),
    handleDrop: jest.fn(),
    handleDragOver: jest.fn(),
  }),
  handleSlashKeyPress: jest.fn(),
}));

describe('TasksScreen', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<TasksScreen />);
    expect(getByText('Tasks')).toBeTruthy();
  });

  it('displays the add task button', () => {
    const { getByText } = render(<TasksScreen />);
    expect(getByText('Add Task')).toBeTruthy();
  });
});