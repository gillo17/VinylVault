export interface ViewCollectionModel {
    id: string;
    collectionName: string;
}

export interface CreateCollectionModel {
    collectionName: string;
    description?: string;
}