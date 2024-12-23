import { Text, View, StyleSheet } from 'react-native';
import Button from './components/button';
import TextBox from './components/textBox';
import MyForm from './components/form';

export default function createAccountScreen() {
    return (

    <View style={styles.container}>  
        <Text style={styles.header}> Create Account </Text>

        <MyForm></MyForm>
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
text: {
    color: '#fff',
},
header: {
    fontSize: 30,
    paddingBottom: 30,
}
});
