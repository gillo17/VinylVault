import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MultilineTextBox from '../../../src/app/components/multiLineTextBox';

describe("MultilineTextBox Component Tests", () => {
    it("should render the multiline text box with placeholder text", () => {
        const { getByPlaceholderText } = render(<MultilineTextBox placeholderText="Enter text here" />);
        expect(getByPlaceholderText('Enter text here')).toBeTruthy();
    });

    it("should call onChangeText when text is changed", () => {
        const mockOnChangeText = jest.fn();
        const { getByPlaceholderText } = render(<MultilineTextBox placeholderText="Enter text here" onChangeText={mockOnChangeText} />);
        fireEvent.changeText(getByPlaceholderText('Enter text here'), 'New text');
        expect(mockOnChangeText).toBeCalledWith('New text');
    });

    it("should render the multiline text box with initial text", () => {
        const { getByDisplayValue } = render(<MultilineTextBox text="Initial text" />);
        expect(getByDisplayValue('Initial text')).toBeTruthy();
    });

    it("should render the multiline text box with specified width", () => {
        const { getByTestId } = render(<MultilineTextBox placeholderText="Enter text here" width={300} />);
        const textBox = getByTestId('multiline-textbox');
        expect(textBox.props.style).toEqual(expect.arrayContaining([{ width: 300 }]));
    });
});