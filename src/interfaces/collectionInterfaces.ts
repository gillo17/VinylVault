import { albumData } from './vinyl'

export interface ViewCollectionModel {
    id: string
    collectionName: string
    collectionImage: string
}

export interface CreateCollectionModel {
    collectionName: string
    description?: string
}

export interface SubmitImageForTraining {
    s3Key: string
    Artist: string
    AlbumName: string
}

export interface vinylSearchInterface {
    artist: string
    albumName: string
}

export interface CollectionInfoInterface {
    id: string
    collectionName: string
    description: string
    collectionImage: string
    vinyls: albumData[]
}
