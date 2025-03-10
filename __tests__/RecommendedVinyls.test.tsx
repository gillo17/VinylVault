import RecommendedVinyls from '@/src/app/pages/RecommendedVinyls';
import { albumData } from '@/src/interfaces/vinyl';
import vinylService from '@/src/services/vinylService';
import {describe, expect, test} from '@jest/globals';
import { JSX } from 'react';
import { VinylAlbumsHelper } from './TestHelpers/VinylAlbumsHelpers';

test('works', () => {
    expect(1).toBe(1);
  });

describe('<RecommendedVinyls />', () => {

  // it('should render recommended vinyls', async () => {

  //   const mockedResponse = VinylAlbumsHelper.getVinylAlbums();

  //   const createCollectionSpy = jest
  //       .spyOn(vinylService, 'getRecommendedVinyls')
  //       .mockResolvedValue(mockedResponse);

  //   const { getByText } = render(<RecommendedVinyls />);

  //   await waitFor(() => {
  //     expect(getByText('Album 1')).toBeTruthy();
  //     expect(getByText('Artist 1')).toBeTruthy();
  //     expect(getByText('Album 2')).toBeTruthy();
  //     expect(getByText('Artist 2')).toBeTruthy();
  //   });
  // });
});