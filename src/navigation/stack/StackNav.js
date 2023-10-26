import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyReadList from '../../screens/myReadList/MyReadList';
import navigationStrings from '../../config/navigationStrings';
import * as screens from '../../screens/index'
import { rspF, rspH, rspW, scrn_width, sizeHUnit } from '../../theme/responsive';
import gStyle from '../../styles/gStyle'
import fontFamily from '../../theme/fontFamily';
import colors from '../../theme/colors';
import IoIcon from 'react-native-vector-icons/Ionicons'

const Stack = createStackNavigator();

const StackNav = () => {

  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen
      name={navigationStrings.HOME} component={screens.MyReadList} />
      <Stack.Screen 
      name={navigationStrings.PDFVIEWER} component={screens.PDFViewer} />
    </Stack.Navigator>
  )
}

export default StackNav

const styles = StyleSheet.create({
    header :{
      width:scrn_width, 
      height: sizeHUnit(5),
      backgroundColor: colors.blue, 
      ...gStyle.r_sb,
      paddingHorizontal: rspW(4),

    },
    header_bcont:{
      paddingRight: rspW(5),
    },
    header_tcont : {
     flex: 1,
    },
    header_title : {
      color: '#fff',
      fontFamily: fontFamily.medium,
      fontSize: rspF(1.3),
    },
})