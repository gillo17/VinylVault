import { Text, View, StyleSheet, Pressable, ActivityIndicator, FlatList, Image } from 'react-native'
import { useEffect, useState } from 'react'
import CollectionsService from '../../services/collectionsService'
import { router, useLocalSearchParams } from 'expo-router'
import Button from '../components/button'
import { CollectionInfoInterface } from '../../interfaces/collectionInterfaces'

const noAlbumCoverImage = require('../../../assets/images/noAlbumCover.png')

export default function saveToCollection() {
    const [data, setData] = useState<CollectionInfoInterface>()
    const [loading, setLoading] = useState(true)
    const { collectionId } = useLocalSearchParams<{ collectionId: string }>()

    const collectionsService = new CollectionsService()

    const viewVinylInfo = async (vinylID: string) => {
        router.push(`/pages/vinylInfo?vinylId=${encodeURIComponent(vinylID)}`)
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await collectionsService.getCollectionInfo(collectionId)

            setData(res)
            setLoading(false)
        }

        fetchData()
    }, [])

    if (data == undefined) {
        return (
            <View style={styles.center}>
                <Text style={styles.text}>No data found</Text>
            </View>
        )
    }

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    return (
        <View style={styles.rootContainer}>
            <View style={styles.backbuttonContainer}>
                <Button theme="backButton" onPress={() => router.back()}></Button>
            </View>
            <View style={styles.headingContainer}>
                {data.collectionImage == undefined || data?.collectionImage == '' ? (
                    <Image source={noAlbumCoverImage} style={{ width: 100, height: 100 }} />
                ) : (
                    <Image source={{ uri: data.collectionImage }} style={{ width: 100, height: 100 }} />
                )}
                <Text style={styles.headingText}>{data.collectionName}</Text>
                <Text style={styles.text}>{data.description}</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        theme="secondary"
                        label="Recommended"
                        onPress={() =>
                            router.push(`/pages/recommendedVinyls?collectionId=${encodeURIComponent(collectionId)}`)
                        }
                        size_width={125}
                    />
                    <Button theme="secondary" label="Edit" size_width={150} />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    style={styles.list}
                    data={data.vinyls}
                    keyExtractor={(item) => item.spotifyID}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => viewVinylInfo(item.spotifyID)}>
                            <View style={styles.item}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Image source={{ uri: item.albumImage }} style={{ width: 100, height: 100 }} />
                                    <View style={styles.nameContainer}>
                                        <Text
                                            style={[
                                                styles.text,
                                                {
                                                    color: 'black',
                                                    fontSize: 22,
                                                },
                                            ]}
                                        >
                                            {item.albumName}
                                        </Text>
                                        <Text style={[styles.text, { color: 'grey' }]}>{item.artist}</Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    )}
                    contentContainerStyle={styles.itemContainer}
                    numColumns={1}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: '#F2DDCE',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
    },
    headingContainer: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#207178',
        borderRadius: 15,
        padding: 10,
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    list: {
        width: '100%',
    },
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    infoContainer: {
        padding: 30,
        paddingLeft: 70,
    },
    nameContainer: {
        padding: 20,
        paddingLeft: 10,
    },
    item: {
        marginVertical: 8,
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
    },
    text: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 10,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    backbuttonContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
})
