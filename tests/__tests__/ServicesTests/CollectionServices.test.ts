import Toast from "react-native-toast-message";
import api from '../../../src/utils/axiosInstance';
import CollectionService from '../../../src/services/collectionsService';
import CollectionHelper from '../../TestHelpers/CollectionsHelper';
import { router } from "expo-router";
import ApiResponseHelper from "../../TestHelpers/ApiResponseHelper";

describe("CollectionServices", () => {

    const collectionService = new CollectionService();
    const collectionHelper = new CollectionHelper();
    const apiResponseHelper = new ApiResponseHelper();

    describe("Get Collection Tests", () => {
        it("should show an error toast when fetching collections fails", async () => {

            jest.spyOn(api, 'get').mockRejectedValue(new Error('Error Fetching Collections'));
            jest.spyOn(Toast, 'show');

            await collectionService.getCollections();

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'Error Fetching Collections',
            });
        });

        it("should return Collection Info when fetching collections Succeeds", async () => {

            const mockCollections = {
                data: collectionHelper.generateCollections()
            }

            jest.spyOn(api, 'get').mockResolvedValue(mockCollections);

            const response = await collectionService.getCollections();

            expect(response).toEqual(mockCollections.data);
        });
    })

    describe("Create Collection Tests", () => {
        it("should show an error toast when Creating a Collection fails", async () => {

            const mockCreateCollectionModel = collectionHelper.generateCreateCollectionModel();

            jest.spyOn(api, 'post').mockRejectedValue(new Error('Error Creating Collection'));
            jest.spyOn(Toast, 'show');

            await collectionService.createCollection(mockCreateCollectionModel);

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'Error Creating Collection - This name may already exist',
            });
        });

        it("should show an info toast when Creating a Collection Succeeds", async () => {

            const mockCreateCollectionModel = collectionHelper.generateCreateCollectionModel();
            const mockResponse = apiResponseHelper.successfulAPIResponse();

            jest.spyOn(api, 'post').mockResolvedValue(mockResponse);
            jest.spyOn(Toast, 'show');

            await collectionService.createCollection(mockCreateCollectionModel);

            expect(Toast.show).toBeCalledWith({
                type: 'info',
                text1: 'Info!',
                text2: 'Collection Created!',
            });
        });

        
    })

    describe("Submit Image For Training Tests", () => {
        it("should show an error toast when submitting image for training fails", async () => {
            const mockSubmitImageForTraining = collectionHelper.generateSubmitImageForTrainingResponse();

            jest.spyOn(api, 'post').mockRejectedValue(new Error('Error Submitting Image for Training'));
            jest.spyOn(Toast, 'show');

            await collectionService.submitImageForTraining(mockSubmitImageForTraining);

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'Error Occurred while submitting image for training',
            });
        });

        it("should navigate to vinyl results screen when submitting image for training succeeds", async () => {
            const mockSubmitImageForTraining = collectionHelper.generateSubmitImageForTrainingResponse();
            const mockResponse = apiResponseHelper.successfulAPIResponse({
                artist: 'Artist Name',
                albumName: 'Album Name'
            });

            jest.spyOn(api, 'post').mockResolvedValue(mockResponse);
            jest.spyOn(router, 'push');

            await collectionService.submitImageForTraining(mockSubmitImageForTraining);

            expect(router.push).toBeCalledWith(`/pages/vinylResultsScreen?artist=${encodeURIComponent(mockResponse.data.artist)}&album=${encodeURIComponent(mockResponse.data.albumName)}`);
        });
    });

    describe("Add Vinyl To Collection Tests", () => {
        it("should show an error toast when adding vinyl to collection fails", async () => {
            jest.spyOn(api, 'post').mockRejectedValue(new Error('Error Adding Vinyl to Collection'));
            jest.spyOn(Toast, 'show');

            await collectionService.addVinylToCollection('collectionId', 'albumId');

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'Error Occurred while adding vinyl to collection',
            });
        });

        it("should navigate to collection info page when adding vinyl to collection succeeds", async () => {
            const mockResponse = apiResponseHelper.successfulAPIResponse();

            jest.spyOn(api, 'post').mockResolvedValue(mockResponse);
            jest.spyOn(router, 'replace');

            await collectionService.addVinylToCollection('collectionId', 'albumId');

            expect(router.replace).toBeCalledWith(`/pages/collectionInfoPage?collectionId=${encodeURIComponent('collectionId')}`);
        });
    });

    describe("Get Collection Info Tests", () => {
        it("should show an error toast when fetching collection info fails", async () => {
            jest.spyOn(api, 'get').mockRejectedValue(new Error('Error Fetching Collection Info'));
            jest.spyOn(Toast, 'show');

            await collectionService.getCollectionInfo('collectionId');

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'Error Occurred while fetching collection info',
            });
        });

        it("should return collection info when fetching collection info succeeds", async () => {
            const mockCollectionInfo = {
                data: collectionHelper.generateCollectionInfo(),
                status: 200
            };

            jest.spyOn(api, 'get').mockResolvedValue(mockCollectionInfo);

            const response = await collectionService.getCollectionInfo('collectionId');

            expect(response).toEqual(mockCollectionInfo.data);
        });
    });
});