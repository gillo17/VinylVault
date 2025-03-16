import { CameraCapturedPicture } from "expo-camera";
import { router } from "expo-router";
import api from "../utils/axiosInstance";
import Toast from "react-native-toast-message";
import { albumData } from "../interfaces/vinyl";

export default class VinylService {
    async identifyVinyl(photo: CameraCapturedPicture ) {

        const [url, key] = await this.generateS3Url() as [string, string];

        const image = await this.fetchImageFromUri(photo.uri);

        await this.uploadToS3(url, image, key);

        try {
            const response = await api.post('/vinyl/identifyVinyl', {"key": key});

            if (response.status == 200 && response.data.message == "Vinyl Identified") {

                router.push(`/pages/vinylResultsScreen?artist=${encodeURIComponent(response.data.artist)}&album=${encodeURIComponent(response.data.album)}`);
            } else if (response.data.message == "Vinyl Not Identified") {
                router.push(`/pages/vinylNotFound?key=${key}`);
            
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: 'An Error has Occured :( ',
                });    
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :( ',
            });
        }
    }

    async uploadToS3(url: string, photo: Blob, key: string) {

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'image/jpeg',
                },
                body: photo
            });

            if (response.status == 200) {
                return response.url;
            } else {
                throw new Error("Error Uploading to S3");
            }
        } catch (error) {
            throw new Error("Error Uploading to S3");
        }
    }

    async getVinylWishlist(): Promise<albumData[]> {
        try {
            const response = await api.get('/vinyl/getAlbumsInlWishlist');

            if (response.status == 200) {
                return response.data.albums;
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: 'An Error has Occured :( Error Fetching Vinyl Wishlist',
                });
                return [];
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :( Error Fetching Vinyl Wishlist',
            });
            return [];
        }
    }

    async generateS3Url(): Promise<[string, string]> {
        try {
            const response = await api.get('/collections/getUrl');

            if (response.status == 200) {
                return [response.data.url,response.data.key];
            } else {
                throw new Error('Error Occurred while generating URL');
            }
        } catch (error) {
            throw new Error('Error Occurred while generating URL');
        }
    }

    async getVinylInfo(vinylId: string) {
        try {
            const response = await api.get(`/vinyl/getVinylInfo?vinylID=${vinylId}`);

            return response.data;
            

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :(',
            });
        }
    }

    async getRecommendedVinyls(collectionId: string): Promise<albumData[]> {
        try {
            const response = await api.get(`/vinyl/getRecommendations?collectionId=${collectionId}`);

            return response.data;
            
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :( ' + error,
            });
            return [];
        }
    }

    async searchVinylWishlist(queryString: string) {
        try {
            const response = await api.get(`/vinyl/searchVinylWishlist?queryString=${queryString}`);
            return response.data;

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :(',
            });
        }
    }

    async saveVinylToWishlist(albumId: string) {
        try {
            const response = await api.post(`/vinyl/saveVinylToWishlist?albumId=${albumId}`);
            if (response.status == 200) {
                Toast.show({
                    type: 'info',
                    text1: 'Info!',
                    text2: 'Album Added to Wishlist!',
                });
            }

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :(',
            });
        }
    }

    async searchVinyl(artist: string, albumName: string) {
        try {
            const response = await api.get(`/vinyl/searchVinyl?artist=${artist}&album=${albumName}`);

            if (response.status == 200) {
                return response.data;
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: 'An Error has Occured :( ',
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'An Error has Occured :(',
            });
        }
    }

    private fetchImageFromUri = async (uri: string) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
      };
}