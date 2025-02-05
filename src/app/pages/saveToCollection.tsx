import { Text, View, StyleSheet, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import CollectionsService from '../../services/collectionsService';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ViewCollectionModel } from '@/src/interfaces/collectionInterfaces';
import { useLocalSearchParams } from 'expo-router';

export default function saveToCollection() {

    const [data, setData] = useState<ViewCollectionModel[] | undefined>([]);
    const [loading, setLoading] = useState(true);
    const albumId = useLocalSearchParams<{ albumId: string }>();
    
    const collectionsService = new CollectionsService();

    const saveToCollection = async (collectionID: string, albumId: string) => {
        collectionsService.addVinylToCollection(collectionID, albumId);
    }

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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Results</Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Image source={{ uri: item.images[0].url }} style={{ width: 100, height: 100 }} /> */}
                <View style={styles.nameContainer}>
                  <Text style={[styles.text, { marginLeft: 10 }]}>{item.collectionName}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Pressable onPress={() => saveToCollection(item.id, albumId.albumId)} style={{ marginLeft: 10 }}>
                  <AntDesign name="pluscircle" size={30} color="#207178" />
                  </Pressable>
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
  list: {
    width: '100%',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  infoContainer:{
    padding: 30,
    paddingLeft: 70
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
  text: {
    fontSize: 18,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
