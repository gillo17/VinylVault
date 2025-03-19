import { ViewCollectionModel } from "../../src/interfaces/collectionInterfaces";

class CollectionHelper {

    public generateCollections() : ViewCollectionModel[] {
        return [
            {
                id: '1',
                collectionName: 'Collection 1',
            },
            {
                id: '2',
                collectionName: 'Collection 2',
            }
        ]
    }

    public generateCreateCollectionModel() {
        return {
            collectionName: 'Collection 1',
        }
    }

    public generateSubmitImageForTraining() {

        return {
            collectionID: '1',
            vinylID: '1',
            image: 'image'
        }   
    }

    public generateSubmitImageForTrainingResponse() {
        return {
            s3Key: "s3Key",
            Artist: "Artist",
            AlbumName: "AlbumName"
        }
    }

    public generateCollectionInfo() {
        return {
            id: '1',
            collectionName: 'Collection 1',
            description: 'Description',
            vinyls: [
                {
                    albumName: "Album Name",
                    artist: "Artist",
                    albumImage: "Album Image",
                    spotifyID: "Spotify ID",
                    spotifyArtistID: "Spotify Artist ID"
                }
            ]
        }
    }
}
export default CollectionHelper;