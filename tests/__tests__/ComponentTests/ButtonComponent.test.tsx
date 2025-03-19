import React from 'react';
import Button from '../../../src/app/components/button';
import { render, fireEvent } from '@testing-library/react-native';

describe("Button Component Tests", () => {
    describe("Primary Button Tests", () => {
        
        it("should render a primary button", () => {
            const { getByText } = render(<Button label="Primary Button" theme="primary" size_width={200} onPress={() => {}} />);
            expect(getByText('Primary Button')).toBeTruthy();
        });

        it("should call onPress when primary button is pressed", () => {
            const mockOnPress = jest.fn();
            const { getByText } = render(<Button label="Primary Button" theme="primary" size_width={200} onPress={mockOnPress} />);
            fireEvent.press(getByText('Primary Button'));
            expect(mockOnPress).toBeCalled();
        });
    })

    describe("Secondary Button Tests", () => {

        it("should render a secondary button", () => {
            const { getByText } = render(<Button label="Secondary Button" theme="secondary" size_width={200} onPress={() => {}} />);
            expect(getByText('Secondary Button')).toBeTruthy();
        });

        it("should call onPress when secondary button is pressed", () => {
            const mockOnPress = jest.fn();
            const { getByText } = render(<Button label="Secondary Button" theme="secondary" size_width={200} onPress={mockOnPress} />);
            fireEvent.press(getByText('Secondary Button'));
            expect(mockOnPress).toBeCalled();
        });
    })

    describe("Back Button Tests", () => {
        
        it("should render a back button with the correct icon", () => {
            const { getByTestId } = render(<Button theme="backButton" size_width={200} onPress={() => {}} />);
            expect(getByTestId('back-icon')).toBeTruthy();
        });

        it("should call onPress when back button is pressed", () => {
            const mockOnPress = jest.fn();
            const { getByTestId } = render(<Button theme="backButton" size_width={200} onPress={mockOnPress} />);
            fireEvent.press(getByTestId('back-icon'));
            expect(mockOnPress).toBeCalled();
        });
    })

    describe("Search Button Tests", () => {
        
        it("should render a search button with the correct icon", () => {
            const { getByTestId } = render(<Button theme="searchButton" size_width={200} onPress={() => {}} />);
            expect(getByTestId('search-icon')).toBeTruthy();
        });

        it("should call onPress when search button is pressed", () => {
            const mockOnPress = jest.fn();
            const { getByTestId } = render(<Button theme="searchButton" size_width={200} onPress={mockOnPress} />);
            fireEvent.press(getByTestId('search-icon'));
            expect(mockOnPress).toBeCalled();
        });
    })

    describe("Favourite Button Tests", () => {

        it("should render a favourite button with the correct icon", () => {
            const { getByTestId } = render(<Button theme="favouriteButton" size_width={200} onPress={() => {}} />);
            expect(getByTestId('favourite-icon')).toBeTruthy();
        });
    
        it("should call onPress when favourite button is pressed", () => {
            const mockOnPress = jest.fn();
            const { getByTestId } = render(<Button theme="favouriteButton" size_width={200} onPress={mockOnPress} />);
            fireEvent.press(getByTestId('favourite-icon'));
            expect(mockOnPress).toBeCalled();
        });
    })
});