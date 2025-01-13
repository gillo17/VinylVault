import { Text, View, StyleSheet, Pressable, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import CollectionsService from '../../services/collectionsService';
import { ViewCollectionModel } from '../../interfaces/collectionInterfaces';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

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
        <ActivityIndicator size="large" color="#0000ff" />
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
          style={styles.list}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <MaterialCommunityIcons name="inbox-outline" size={100} color="white" />
              <Text style={styles.text}>{item.collectionName}</Text>
            </View>
          )}
          contentContainerStyle={styles.itemContainer}
          numColumns={3}
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
    backgroundColor: '#207178',
    marginVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
