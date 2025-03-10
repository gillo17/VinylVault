import { albumData } from "@/src/interfaces/vinyl";

export class VinylAlbumsHelper {
    
    public static getVinylAlbums(): albumData[] {
        return [
            { spotifyID: "1", albumName: 'Vinyl Album 1', artist: 'Artist 1', spotifyArtistID: "1", albumImage: 'https://example.com/image1.jpg' },
            { spotifyID: "1", albumName: 'Vinyl Album 1', artist: 'Artist 1', spotifyArtistID: "1", albumImage: 'https://example.com/image1.jpg' },
            { spotifyID: "1", albumName: 'Vinyl Album 1', artist: 'Artist 1', spotifyArtistID: "1", albumImage: 'https://example.com/image1.jpg' }
        ];
    }

}