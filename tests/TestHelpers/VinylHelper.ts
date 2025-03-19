import { CameraCapturedPicture } from "expo-camera";
import { albumData } from "../../src/interfaces/vinyl";

class VinylHelper {
    
    public generateVinylAlbums(): albumData[] {
        return [
            { spotifyID: "1", albumName: 'Vinyl Album 1', artist: 'Artist 1', spotifyArtistID: "1", albumImage: 'https://example.com/image1.jpg' },
            { spotifyID: "1", albumName: 'Vinyl Album 1', artist: 'Artist 1', spotifyArtistID: "1", albumImage: 'https://example.com/image1.jpg' },
            { spotifyID: "1", albumName: 'Vinyl Album 1', artist: 'Artist 1', spotifyArtistID: "1", albumImage: 'https://example.com/image1.jpg' }
        ];
    }

    public generateCameraCapture(): CameraCapturedPicture {
        return {
            uri: 'https://example.com/image.jpg',
            width: 100,
            height: 100,
            exif: {}
        };
    }

}

export default VinylHelper;