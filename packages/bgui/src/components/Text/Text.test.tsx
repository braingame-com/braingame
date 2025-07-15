import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from './Text.native';

describe('Text', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Text>Test Text</Text>
    );
    
    expect(getByText('Test Text')).toBeTruthy();
  });
  
  it('handles click events', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Text onClick={handleClick}>Click me</Text>
    );
    
    fireEvent.press(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('respects disabled state', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Text disabled onClick={handleClick}>
        Disabled Text
      </Text>
    );
    
    fireEvent.press(getByText('Disabled Text'));
    expect(handleClick).not.toHaveBeenCalled();
  });
  
  it('applies accessibility props', () => {
    const { getByLabelText } = render(
      <Text aria-label="Custom label">Content</Text>
    );
    
    expect(getByLabelText('Custom label')).toBeTruthy();
  });
});
