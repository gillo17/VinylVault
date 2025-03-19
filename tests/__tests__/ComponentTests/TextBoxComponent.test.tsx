import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextBox from '../../../src/app/components/textBox';

describe("Text Box Tests", () => {
    it("should render a text box with placeholder text", () => {
        const { getByPlaceholderText } = render(<TextBox placeholderText="Enter text here" />);
        expect(getByPlaceholderText('Enter text here')).toBeTruthy();
    });

    it("should call onChangeText when text is changed", () => {
        const mockOnChangeText = jest.fn();
        const { getByPlaceholderText } = render(<TextBox placeholderText="Enter text here" onChangeText={mockOnChangeText} />);
        fireEvent.changeText(getByPlaceholderText('Enter text here'), 'New text');
        expect(mockOnChangeText).toBeCalledWith('New text');
    });

    it("should render a text box with initial text", () => {
        const { getByDisplayValue } = render(<TextBox text="Initial text" />);
        expect(getByDisplayValue('Initial text')).toBeTruthy();
    });
})