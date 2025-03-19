import React from 'react';
import Button from '../../../src/app/components/button';
import { render } from '@testing-library/react-native';

describe("Button Component Tests", () => {
    describe("Primary Button Tests", () => {
        it("should render a primary button", () => {
            const { getByText } = render(<Button label="Primary Button" theme="primary" size_width={200} onPress={() => {}} />);
            
            expect(getByText('Primary Button')).toBeTruthy();
        });
    });

    // describe("Back Button Tests", () => {
    //     it("should render a back button with the correct icon", () => {
            
    //         const { getByTestId } = render(<Button theme="backButton" />);
            
    //         expect(getByTestId('back-icon')).toBeTruthy();
    //     });
    // });
});