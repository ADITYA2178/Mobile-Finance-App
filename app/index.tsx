import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Alert} from 'react-native';

export default function App() {return (
    <SafeAreaView style={{flex: 1 , backgroundColor: 'white' }}>
    <View style={{padding: 20}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Subscribe to my channel</Text>
      <TextInput 
       placeholder='Enter your email'
       placeholderTextColor='#999'
       style={{borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginTop: 12
       }}
       />

    <TouchableOpacity 
    onPress={()=> Alert.alert('Subscribed to the channel')}
    style={{backgroundColor: '#2563EB', padding: 12, borderRadius: 8, marginTop: 12}}>
      <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Search</Text>
    </TouchableOpacity>
    </View>
 
    </SafeAreaView>
  );
}