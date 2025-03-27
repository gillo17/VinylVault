import { render, waitFor } from '@testing-library/react-native'
import WishlistScreen from '../../../src/app/(tabs)/wishlist'
import VinylService from '../../../src/services/vinylService'
import VinylHelper from '../../TestHelpers/VinylHelper'
import React from 'react'

jest.mock('../../../src/services/vinylService')

describe('WishlistScreen', () => {
    const vinylService = new VinylService()
    const vinylHelper = new VinylHelper()

    const mockVinylService = VinylService as jest.Mocked<typeof VinylService>

    it('should render the wishlist screen with albums', async () => {
        mockVinylService.prototype.getVinylWishlist = jest.fn().mockResolvedValue(vinylHelper.generateVinylAlbums())

        const { getByTestId } = render(<WishlistScreen />)

        await waitFor(() => {
            const flatList = getByTestId('wishlist-flatlist')
            expect(flatList).toBeTruthy()
            expect(flatList.props.data).toHaveLength(3)
        })
    })

    it('should show loading indicator while fetching data', async () => {
        jest.spyOn(vinylService, 'getVinylWishlist').mockImplementation(
            () => new Promise((resolve) => setTimeout(() => resolve([]), 1000))
        )

        const { getByTestId } = render(<WishlistScreen />)

        await waitFor(() => {
            expect(getByTestId('loading-indicator')).toBeTruthy()
        })
    })

    it('should hide loading indicator after data is fetched', async () => {
        jest.spyOn(vinylService, 'getVinylWishlist').mockResolvedValue(vinylHelper.generateVinylAlbums())

        const { queryByTestId } = render(<WishlistScreen />)

        await waitFor(() => {
            expect(queryByTestId('loading-indicator')).toBeNull()
        })
    })
})
