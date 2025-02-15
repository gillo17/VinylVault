import { CameraCapturedPicture } from "expo-camera";
import { router } from "expo-router";
import api from "../utils/axiosInstance";

export default class VinylService {
    async identifyVinyl(photo: CameraCapturedPicture ) {

        const [url, key] = await this.generateS3Url() as [string, string];

        const image = await this.fetchImageFromUri(photo.uri);

        await this.uploadToS3(url, image, key);

        try {
            const response = await api.post('/vinyl/identifyVinyl', {"key": key});

            if (response.status == 200 && response.data.message == "Vinyl Identified") {

                router.replace(`/pages/vinylResultsScreen?artist=${encodeURIComponent(response.data.artist)}&album=${encodeURIComponent(response.data.album)}`);
            } else if (response.data.message == "Vinyl Not Identified") {
                router.push(`/pages/vinylNotFound?key=${key}`);
            
            } else {
                return 'Error Occurred while identifying vinyl';
            }
        } catch (error) {
            console.log(error);
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
                console.log(response)
                return 'Error Occurred while uploading to S3';
            }
        } catch (error) {
            console.log(error);
        }
    }

    async generateS3Url() {
        try {
            const response = await api.get('/collections/getUrl');

            if (response.status == 200) {
                return [response.data.url,response.data.key];
            } else {
                'Error Occurred while generating URL';
                console.log(response)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getVinylInfo(vinylId: string) {
        try {
            const response = await api.get(`/vinyl/getVinylInfo?vinylID=${vinylId}`);

            return response.data;
            

        } catch (error) {
            console.log(error);
        }
    }

    async getRecommendedVinyls(collectionId: string) {
        try {
            const response = await api.get(`/vinyl/getRecommendations?collectionId=${collectionId}`);

            return response.data;
            

        } catch (error) {
            console.log(error);
        }
    }

    async searchVinyl(artist: string, albumName: string) {
        try {
            const response = await api.get(`/vinyl/searchVinyl?artist=${artist}&album=${albumName}`);

            if (response.status == 200) {
                return response.data;
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error);
        }
    }

    private fetchImageFromUri = async (uri: string) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
      };
}