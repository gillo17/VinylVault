import { Text, View, StyleSheet, Dimensions, FlatList, Image, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '../components/button';
import VinylService from '@/src/services/vinylService';

const { width: viewportWidth } = Dimensions.get('window');

export default function recommendedVinyls() {

    const [data, setData] = useState<any | undefined>([]);
    const [loading, setLoading] = useState(true);    
    const collectionId = useLocalSearchParams<{ collectionId: string }>();
    const { width: viewportWidth } = Dimensions.get('window');    

    const vinylService = new VinylService();

    useEffect(() => {
        const fetchData = async () => {
            const res = await vinylService.getRecommendedVinyls(collectionId.collectionId);
            setData(res)
            setLoading(false);
        };
  
        fetchData();
    }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
        <View style={styles.headingContainer}>
            <Text style={styles.headingText} >Recommended Vinyls</Text>
                <View style={styles.backbuttonContainer}>
                    <Button theme="backButton" onPress={() => router.back()}></Button>
                </View>
        </View>
      <View style={{flex: 1}}>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(item) => item.spotifyID}
          renderItem={({ item }) => (
            <View style={styles.item}>
                <View style={styles.row}>
                    <Image source={{ uri: item.albumImage }} style={{ width: 100, height: 100 }} />
                    <View style={styles.nameContainer}>
                    <Text style={[styles.text, { color: 'black', fontSize: 22 }]}>{item.albumName}</Text>
                    <Text style={[styles.text, { color: 'grey' }]}>{item.artist}</Text>
                    </View>
                </View>
            </View>
          )}
          contentContainerStyle={styles.itemContainer}
          numColumns={1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: '#F2DDCE',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,
    },
    headingContainer: {
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    list: {
        width: '100%',
    },
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    nameContainer:{
        padding: 20,
        paddingLeft: 10
    },
    item: {
        marginVertical: 8,
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
    },
    row : {
        width: viewportWidth * 0.75,
        flexDirection: 'row',
        alignItems: 'center' 
    },
    text: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 10,
        flexWrap: 'wrap'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2DDCE',
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    backbuttonContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    }
});
