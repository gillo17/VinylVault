import { render, waitFor } from '@testing-library/react-native'
import CollectionScreen from '../../../src/app/(tabs)/collections'
import React from 'react'
import CollectionsService from '../../../src/services/collectionsService'
import CollectionHelper from '../../TestHelpers/CollectionsHelper'

jest.mock('../../../src/services/collectionsService')

describe('Collection Page Tests', () => {
    const collectionService = new CollectionsService()
    const collectionHelper = new CollectionHelper()
    const mockCollectionService = CollectionsService as jest.Mocked<typeof CollectionsService>

    it('should render the collection screen with albums', async () => {
        mockCollectionService.prototype.getCollections = jest
            .fn()
            .mockResolvedValue(collectionHelper.generateCollections())

        const { getByTestId } = render(<CollectionScreen />)

        await waitFor(() => {
            const flatList = getByTestId('collection-flatlist')
            expect(flatList).toBeTruthy()
            expect(flatList.props.data).toHaveLength(2)
        })
    })

    it('should show loading indicator while fetching data', async () => {
        jest.spyOn(collectionService, 'getCollections').mockImplementation(
            () => new Promise((resolve) => setTimeout(() => resolve([]), 1000))
        )
        const { getByTestId } = render(<CollectionScreen />)

        await waitFor(() => {
            expect(getByTestId('loading-indicator')).toBeTruthy()
        })
    })

    it('should hide loading indicator after data is fetched', async () => {
        jest.spyOn(collectionService, 'getCollections').mockResolvedValue(collectionHelper.generateCollections())

        const { queryByTestId } = render(<CollectionScreen />)

        await waitFor(() => {
            expect(queryByTestId('loading-indicator')).toBeNull()
        })
    })
})
