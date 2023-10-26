import { StyleSheet, Text, View, SafeAreaView,StatusBar, PermissionsAndroid, Button, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { act_hg, scrn_height, scrn_width, sizeWUnit } from './src/theme/responsive';
import PDFViewer from './src/screens/pdfViewer/PDFViewer';
import FloatingButton from './src/components/FloatingButton';
import MyReadList from './src/screens/myReadList/MyReadList';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNav from './src/navigation/stack/StackNav';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {

  
  const requestReadPer =async ()=>{
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Read External File Permission',
          message:
            'We needs access to your Files and Folder',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can read');
      } else {
        console.log('Read permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  
  useLayoutEffect(() => {
    requestReadPer()
  }, [])
  return (
   
    <SafeAreaProvider>
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>
    </SafeAreaProvider>

  )
}

export default App

