import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import gStyle from '../styles/gStyle'
import IoIcon from 'react-native-vector-icons/Ionicons'
import { rspF, rspW, scrn_width, sizeHUnit } from '../theme/responsive'
import colors from '../theme/colors'
import fontFamily from '../theme/fontFamily'
import { useNavigation } from '@react-navigation/native'


const Header = ({title="",back}) => {
    const navigation = useNavigation()
  return (
    <View style={styles.header}>
         {
            back &&
          <TouchableOpacity
          onPress={()=>{
            navigation.goBack()
          }}
          activeOpacity={0.3}
          style={styles.header_bcont}>
          <IoIcon
            name="chevron-back-outline"
            size={rspF(1.3)}
            color={colors.white}
            />
          </TouchableOpacity>}
            
            <View style={styles.header_tcont}>
            <Text style={styles.header_title}>{title}</Text>
            </View>
        </View>
  )
}

export default Header

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