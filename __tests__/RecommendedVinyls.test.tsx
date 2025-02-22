import React from 'react';
import VinylService from '@/src/services/vinylService';
import { render, waitFor } from '@testing-library/react-native';
import RecommendedVinyls from '../src/app/pages/RecommendedVinyls';
const vinylService = new VinylService();

describe('RecommendedVinyls', () => {
    it('works', () => {
        expect(1).toBe(1);
      });
})

describe('<RecommendedVinyls />', () => {
  it('should render recommended vinyls', async () => {

    const mockedResponse = [
      { id: '1', albumName: 'Album 1', artist: 'Artist 1', albumImage: 'https://example.com/image1.jpg' },
      { id: '2', albumName: 'Album 2', artist: 'Artist 2', albumImage: 'https://example.com/image2.jpg' },
    ];

    const createCollectionSpy = jest
        .spyOn(vinylService, 'getRecommendedVinyls')
        .mockResolvedValue(mockedResponse);

    const { getByText } = render(<RecommendedVinyls />);

    await waitFor(() => {
      expect(getByText('Album 1')).toBeTruthy();
      expect(getByText('Artist 1')).toBeTruthy();
      expect(getByText('Album 2')).toBeTruthy();
      expect(getByText('Artist 2')).toBeTruthy();
    });
  });
});