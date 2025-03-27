import { Text, View, StyleSheet, Pressable, ActivityIndicator, FlatList, Dimensions , Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import CollectionsService from '../../services/collectionsService';
import { ViewCollectionModel } from '../../interfaces/collectionInterfaces';
import { router } from 'expo-router';

const { width: viewportWidth } = Dimensions.get('window');
const noAlbumCoverImage = require('../../../assets/images/noAlbumCover.png');

export default function collectionsScreen() {

  const [data, setData] = useState<ViewCollectionModel[] | undefined>([]);
  const [loading, setLoading] = useState(true);

  const collectionsService = new CollectionsService();

  useEffect(() => {
    const fetchData = async () => {
      const res = await collectionsService.getCollections();
      setData(res)
      setLoading(false);
    };
  
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" testID='loading-indicator' />
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Your Collections</Text>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.addButton}>
            <Ionicons name="add-outline" size={35} color="white" onPress={() => router.replace('/pages/createCollection')}/>
          </Pressable>
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          testID='collection-flatlist'
          style={styles.list}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
                <Pressable onPress={() => router.push(`/pages/collectionInfoPage?collectionId=${encodeURIComponent(item.id)}`)}>
                  <View style={styles.row}>
                    { item.collectionImage == undefined || item.collectionImage == "" ? (
                      <Image source={noAlbumCoverImage} style={{ width: 100, height: 100 }} /> 
                    ) : (
                      <Image source={{ uri: item.collectionImage }} style={{ width: 100, height: 100 }} /> 
                    )}
                      <View style={styles.nameContainer}>
                      <Text style={[styles.text, { color: 'black', fontSize: 22 }]}>{item.collectionName}</Text>
                      </View>
                  </View>
                </Pressable>
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
  buttonContainer: {
    marginLeft: 'auto',
  },
  addButton: {
    backgroundColor: '#207178',
    padding: 10,
    borderRadius: 5,
  },
  list: {
    width: '100%',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  item: {
    marginVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  row: {
    width: viewportWidth * 0.75,
    flexDirection: 'row',
    alignItems: 'center' 
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
  nameContainer:{
    padding: 20,
    paddingLeft: 10,
    flex: 1
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
