export interface ViewCollectionModel {
    id: string;
    collectionName: string;
}

export interface CreateCollectionModel {
    collectionName: string;
    description?: string;
}

export interface SubmitImageForTraining {
    s3Key: string;
    Artist: string;
    AlbumName: string;
}

export interface vinylSearchInterface {
    artist: string;
    albumName: string;
}