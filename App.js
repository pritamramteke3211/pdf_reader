import { StyleSheet, Text, View, SafeAreaView,StatusBar } from 'react-native'
import React from 'react'
import { initialWindowMetrics } from "react-native-safe-area-context";
import { scrn_height, scrn_width } from './src/styles/responsive';
import PDFViewer from './src/screens/PDFViewer';
const insets = initialWindowMetrics.insets;

const act_hg = scrn_height - StatusBar.currentHeight - insets.bottom

const rspF3 = (val) =>{
return val * act_hg * act_hg/scrn_width * 0.01
}


const App = () => {
  
  return (
   
      <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
      <PDFViewer/>
</SafeAreaView>
  )
}

export default App

export {act_hg, rspF3}

const styles = StyleSheet.create({
  main_cont:{
    height: act_hg * 0.99,
    width: '100%',
    overflow:'hidden',
  }
})