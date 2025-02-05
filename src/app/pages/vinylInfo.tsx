import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import Button from '../components/button';
import VinylService from '@/src/services/vinylService';

export default function vinylInfo() {

    const [data, setData] = useState<any | undefined>([]);
    const [loading, setLoading] = useState(true);    
    const vinylId = useLocalSearchParams<{ vinylId: string }>();

    const vinylService = new VinylService();

    useEffect(() => {
        const fetchData = async () => {
            const res = await vinylService.getVinylInfo(vinylId.vinylId);
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
            <ScrollView>
                <View style={styles.contentContainer}>
                    <View style={styles.buttonContainer}>
                        <Button theme="backButton" onPress={() => router.back()}></Button>
                    </View>
                    <View style={styles.headingCard}>
                        <Image source={{ uri: data.albumInfo.images[0].url }} style={{ width: 200, height: 200 }} />
                        <Text style={styles.headingText}>{data.name}</Text>
                        <Text style={styles.text}>{data.albumInfo.artists[0].name}</Text>
                        <Text style={styles.text}>Released: {data.albumInfo.release_date}</Text>
                    </View>

                    <View style={styles.albumInfoContainer}>
                        <Text style={styles.text}>Album Background</Text>
                        <Text>{data.albumBackground}</Text>
                    </View>

                    <View style={styles.trackListCard}>
                        <Text style={[styles.text, {paddingBottom: 10}]}>Tracklist</Text>
                        <View style={styles.trackList}>
                            <View>
                                <FlatList
                                data={data.albumInfo.tracks.items}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.item}>
                                        <Text>{item.track_number}.</Text>
                                        <Text>{item.name}</Text>
                                    </View>
                                    )}
                                    numColumns={1}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#F2DDCE',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    alignItems: 'flex-start',
    padding: 10,
  },
  albumInfoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  contentContainer: {
    width: '100%',
  },
  headingCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  trackList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  item: {
    flexDirection: 'row'
  },
  trackContainer: {
    padding: 20,
    
  },
  trackListFlatList: {
    borderRadius: 10,
  },
  headingText: {
    fontSize: 22,
    color: '#000'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackListCard: {
    backgroundColor: '#207178',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
 }
});
