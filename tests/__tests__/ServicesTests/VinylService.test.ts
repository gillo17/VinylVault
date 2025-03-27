import Toast from 'react-native-toast-message'
import api from '../../../src/utils/axiosInstance'
import VinylService from '../../../src/services/vinylService'
import VinylHelper from '../../TestHelpers/VinylHelper'
import APIResponseHelper from '../../TestHelpers/apiResponseHelper'
import { router } from 'expo-router'

describe('Vinyl Service Tests', () => {
    const vinylService = new VinylService()
    const vinylHelper = new VinylHelper()

    describe('Get Vinyl Wishlist Test', () => {
        it('should show an error toast when fetching vinyl wishlist fails', async () => {
            jest.spyOn(api, 'get').mockRejectedValue(new Error('Error Fetching Vinyl Wishlist'))
            jest.spyOn(Toast, 'show')

            await vinylService.getVinylWishlist()

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :( Error Fetching Vinyl Wishlist',
            })
        })

        it('should return albums when fetching vinyl wishlist succeeds', async () => {
            const mockVinylAlbums = vinylHelper.generateVinylAlbums()

            const mockResponse = {
                data: { albums: mockVinylAlbums },
                status: 200,
            }

            jest.spyOn(api, 'get').mockResolvedValue(mockResponse)

            const response = await vinylService.getVinylWishlist()

            expect(response).toEqual(mockVinylAlbums)
        })
    })

    describe('Save Vinyl to Wishlist Test', () => {
        it('should show an error toast when adding vinyl to wishlist fails', async () => {
            jest.spyOn(api, 'post').mockRejectedValue(new Error('Error Adding Vinyl to Wishlist'))
            jest.spyOn(Toast, 'show')

            await vinylService.saveVinylToWishlist('1')

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :(',
            })
        })

        it('should return success message when adding vinyl to wishlist succeeds', async () => {
            const mockResponse = {
                data: { message: 'Vinyl added to wishlist successfully' },
                status: 200,
            }

            jest.spyOn(api, 'post').mockResolvedValue(mockResponse)

            const response = await vinylService.saveVinylToWishlist('1')

            expect(Toast.show).toBeCalledWith({
                type: 'info',
                text1: 'Info!',
                text2: 'Album Added to Wishlist!',
            })

            expect(api.post).toBeCalledWith('/vinyl/saveVinylToWishlist?albumId=1')
        })
    })

    describe('Identify Vinyl Test', () => {
        it('should show an error toast when identifying vinyl fails', async () => {
            const mockCameraCapture = vinylHelper.generateCameraCapture()

            jest.spyOn(vinylService, 'generateS3Url').mockResolvedValue(['dataUrl', 'dataKey'])
            jest.spyOn(vinylService, 'fetchImageFromUri' as any).mockResolvedValue(new Blob())
            jest.spyOn(vinylService, 'uploadToS3').mockResolvedValue('s3url.com')

            jest.spyOn(api, 'post').mockRejectedValue(new Error('Error Identifying Vinyl'))
            jest.spyOn(Toast, 'show')

            await vinylService.identifyVinyl(mockCameraCapture)

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :(',
            })
        })

        it('should navigate to vinyl results screen when vinyl is identified', async () => {
            const mockResponse = {
                data: {
                    message: 'Vinyl Identified',
                    artist: 'Test Artist',
                    album: 'Test Album',
                },
                status: 200,
            }

            const mockCameraCapture = vinylHelper.generateCameraCapture()

            jest.spyOn(vinylService, 'generateS3Url').mockResolvedValue(['dataUrl', 'dataKey'])
            jest.spyOn(vinylService, 'fetchImageFromUri' as any).mockResolvedValue(new Blob())
            jest.spyOn(vinylService, 'uploadToS3').mockResolvedValue('s3url.com')

            jest.spyOn(api, 'post').mockResolvedValue(mockResponse)
            jest.spyOn(router, 'push')

            await vinylService.identifyVinyl(mockCameraCapture)

            expect(router.push).toBeCalledWith('/pages/vinylResultsScreen?artist=Test%20Artist&album=Test%20Album')
        })

        it('should navigate to vinyl not found screen when vinyl is not identified', async () => {
            const mockResponse = {
                data: { message: 'Vinyl Not Identified' },
                status: 200,
            }

            const mockCameraCapture = vinylHelper.generateCameraCapture()

            jest.spyOn(vinylService, 'generateS3Url').mockResolvedValue(['dataUrl', 'dataKey'])
            jest.spyOn(vinylService, 'fetchImageFromUri' as any).mockResolvedValue(new Blob())
            jest.spyOn(vinylService, 'uploadToS3').mockResolvedValue('s3url.com')

            jest.spyOn(api, 'post').mockResolvedValue(mockResponse)
            jest.spyOn(router, 'push')

            await vinylService.identifyVinyl(mockCameraCapture)

            expect(router.push).toBeCalledWith('/pages/vinylNotFound?key=dataKey')
        })
    })

    describe('Upload to S3 Test', () => {
        it('should show an error toast when uploading to S3 fails', async () => {
            jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Error Uploading to S3'))
            jest.spyOn(Toast, 'show')

            await vinylService.uploadToS3('test-url', new Blob(), 'test-key')

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :(',
            })
        })

        it('should return the response URL when uploading to S3 succeeds', async () => {
            const mockResponse = {
                status: 200,
                url: 'test-url',
            }

            jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse as Response)

            const response = await vinylService.uploadToS3('test-url', new Blob(), 'test-key')

            expect(response).toEqual('s3url.com')
        })
    })

    describe('Get Vinyl Info Test', () => {
        it('should show an error toast when fetching vinyl info fails', async () => {
            jest.spyOn(api, 'get').mockRejectedValue(new Error('Error Fetching Vinyl Info'))
            jest.spyOn(Toast, 'show')

            await vinylService.getVinylInfo('1')

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :(',
            })
        })

        it('should return vinyl info when fetching vinyl info succeeds', async () => {
            const mockResponse = {
                data: { artist: 'Test Artist', album: 'Test Album' },
                status: 200,
            }

            jest.spyOn(api, 'get').mockResolvedValue(mockResponse)

            const response = await vinylService.getVinylInfo('1')

            expect(response).toEqual(mockResponse.data)
        })
    })

    describe('Get Recommended Vinyls Test', () => {
        it('should show an error toast when fetching recommended vinyls fails', async () => {
            jest.spyOn(api, 'get').mockRejectedValue(new Error('Error Fetching Recommended Vinyls'))
            jest.spyOn(Toast, 'show')

            await vinylService.getRecommendedVinyls('1')

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :(',
            })
        })

        it('should return recommended vinyls when fetching recommended vinyls succeeds', async () => {
            const mockVinylAlbums = vinylHelper.generateVinylAlbums()

            const mockResponse = {
                data: { albums: mockVinylAlbums },
                status: 200,
            }

            jest.spyOn(api, 'get').mockResolvedValue(mockResponse)

            const response = await vinylService.getRecommendedVinyls('1')

            expect(response).toEqual(mockResponse.data)
        })
    })

    describe('generateS3 Url Test', () => {
        it('should throw an error toast when getting an S3 url fails', async () => {
            jest.spyOn(api, 'get').mockRejectedValue(new Error('Error Getting S3 URL'))
            jest.spyOn(Toast, 'show')

            await vinylService.generateS3Url()

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :(',
            })
        })

        it('should return s3 url getting an s3 url succeeds', async () => {
            const mockResponse = {
                data: { results: ['Test Album 1', 'Test Album 2'] },
                status: 200,
            }

            jest.spyOn(api, 'get').mockResolvedValue(mockResponse)

            const response = await vinylService.searchVinylWishlist('test-query')

            expect(response).toEqual(mockResponse.data)
        })
    })

    describe('Search Vinyl Wishlist Test', () => {
        it('should show an error toast when searching vinyl wishlist fails', async () => {
            jest.spyOn(api, 'get').mockRejectedValue(new Error('Error Searching Vinyl Wishlist'))
            jest.spyOn(Toast, 'show')

            await vinylService.searchVinylWishlist('test-query')

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :(',
            })
        })

        it('should return search results when searching vinyl wishlist succeeds', async () => {
            const mockResponse = {
                data: { results: ['Test Album 1', 'Test Album 2'] },
                status: 200,
            }

            jest.spyOn(api, 'get').mockResolvedValue(mockResponse)

            const response = await vinylService.searchVinylWishlist('test-query')

            expect(response).toEqual(mockResponse.data)
        })
    })

    describe('Search Vinyl Test', () => {
        it('should show an error toast when searching vinyl fails', async () => {
            jest.spyOn(api, 'get').mockRejectedValue(new Error('Error Searching Vinyl'))
            jest.spyOn(Toast, 'show')

            await vinylService.searchVinyl('Test Artist', 'Test Album')

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :(',
            })
        })

        it('should return search results when searching vinyl succeeds', async () => {
            const mockResponse = {
                data: { results: ['Test Album 1', 'Test Album 2'] },
                status: 200,
            }

            jest.spyOn(api, 'get').mockResolvedValue(mockResponse)

            const response = await vinylService.searchVinyl('Test Artist', 'Test Album')

            expect(response).toEqual(mockResponse.data)
        })
    })
})
