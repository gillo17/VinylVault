import { Text, View, StyleSheet, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useLocalSearchParams } from 'expo-router';
import VinylService from '@/src/services/vinylService';

export default function vinylResultsScreen() {
  
  const [data, setData] = useState<any[] | undefined>([]);
  const [loading, setLoading] = useState(true);

  const { artist, album } = useLocalSearchParams<{ artist: string, album: string }>();

    const vinylService = new VinylService();

  const saveVinyl = async (vinylID: string) => {
    router.replace(`/pages/saveToCollection?albumId=${encodeURIComponent(vinylID)}`);
  }

  const truncateString = (str: string, num: number) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };
  useEffect(() => {
    const fetchData = async () => {

      let results: any[] = [];

      if (artist && album) {
        results = await vinylService.searchVinyl(artist, album);
      } else {
        console.error('No artist or album name provided');
      }

      setData(results);
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
        <Text style={styles.headingText}>Results</Text>
      </View>
      <View style={{flex: 1, width: '100%'}}>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
                <Image source={{ uri: item.images[0].url }} style={{ width: 100, height: 100 }} />
                <View style={styles.nameContainer}>
                  <Text style={[styles.text, { marginLeft: 10 }]}>{truncateString(item.name, 30)}</Text>
                  <Text style={[styles.text, { marginLeft: 10 }]}>{item.artists[0].name}</Text>
                </View>
                  <Pressable onPress={() => saveVinyl(item.id)} style={{ marginLeft: 10 }}>
                  <AntDesign name="pluscircle" size={30} color="#207178" />
                  </Pressable>
            </View>
          )}
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
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    width: '100%',
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  nameContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  list: {
    width: '100%',
  },
  text: {
    fontSize: 18,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
