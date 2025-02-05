import { Text, View, StyleSheet } from 'react-native';
import MyForm from './components/form';
import Button from './components/button';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function createAccountScreen() {
    return (

    <View style={styles.container}> 

        <View style={styles.headerContainer}>
            <Button theme="backButton" onPress={() => router.replace('/')} ></Button>

            <Text style={styles.header}> Create Account </Text>
        </View>

        <MyForm></MyForm>
        <Toast />
    </View>
    );
  }

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#F2DDCE',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 150
    
},
headerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
},
backButton: {
    paddingRight: 10,
},
text: {
    color: '#fff',
},
header: {
    fontSize: 30,
}
});
