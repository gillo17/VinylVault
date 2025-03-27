import { Text, View, StyleSheet, FlatList, Image, ActivityIndicator, Dimensions } from 'react-native';
import ToastProvider from '../components/ToastProvider';
import { useState, useEffect } from 'react';
import VinylService from '@/src/services/vinylService';
import { albumData } from '@/src/interfaces/vinyl';

const { width: viewportWidth } = Dimensions.get('window');

export default function wishlistScreen() {

  const [data, setData] = useState<albumData[] | undefined>([]);
  const [loading, setLoading] = useState(true);

  const vinylService = new VinylService();

  useEffect(() => {
    const fetchData = async () => {
      const res = await vinylService.getVinylWishlist();
      setData(res)
      setLoading(false);
    };
  
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" testID='loading-indicator'/>
      </View>
    );
  }

  return (
    <View style = {{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Wishlist</Text>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            testID="wishlist-flatlist"
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
      <ToastProvider></ToastProvider>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2DDCE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  item: {
    marginVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  title: {
    fontSize: 36,
  },
  infoContainer:{
    padding: 30,
    paddingLeft: 70
  },
  nameContainer:{
    padding: 20,
    paddingLeft: 10,
    flex: 1
  },
  row: {
    width: viewportWidth * 0.75,
    flexDirection: 'row',
    alignItems: 'center' 
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    width: '100%',
  }
});
