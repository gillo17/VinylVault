import { View, StyleSheet, FlatList, Image, Text, Dimensions } from 'react-native';
import TextBox from '../components/textBox';
import Button from '../components/button';
import VinylService from '@/src/services/vinylService';
import { useState } from 'react';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import ToastProvider from '../components/ToastProvider';

const { width: viewportWidth } = Dimensions.get('window');

export default function searchScreen() {

  const [data, setData] = useState<any | undefined>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const vinylService = new VinylService();

  const searchForAlbum = async () => {
    const data = await vinylService.searchVinylWishlist(searchQuery);
    setData(data);
  }

  const saveVinyl = async (vinylID: string) => {
    console.log("Saving");
    await vinylService.saveVinylToWishlist(vinylID);
  }

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setSearchQuery('');
        setData([]);
      };
    }, [])
  );

  return (
    <View style = {{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextBox 
            placeholderText='Search e.g Dark Side of The Moon Pink Floyd'           
            onChangeText={setSearchQuery}
            text={searchQuery}
          ></TextBox>
          <Button theme='searchButton' onPress={() => searchForAlbum()} ></Button>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            style={styles.list}
            data={data.albums}
            keyExtractor={(item) => item.spotifyID}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <View style={styles.row}>
                        <Image source={{ uri: item.albumImage }} style={{ width: 100, height: 100 }} />
                        <View style={styles.nameContainer}>
                        <Text style={[styles.text, { color: 'black', fontSize: 22 }]}>{item.albumName}</Text>
                        <Text style={[styles.text, { color: 'grey' }]}>{item.artist}</Text>
                        </View>
                          <Button theme='favouriteButton' onPress={() => saveVinyl(item.spotifyID)} ></Button>
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
  list: {
    width: '100%',
  },
  text: {
    color: '#fff',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  item: {
    marginVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    top: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    backgroundColor: '#F2DDCE',
    zIndex: 1,
  }
});
