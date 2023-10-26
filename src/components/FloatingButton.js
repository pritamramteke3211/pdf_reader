import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { sizeHUnit, sizeWUnit } from '../theme/responsive'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'

const FloatingButton = ({onPress = null}) => {
  return (
    <TouchableOpacity style={styles.btnCont}
    onPress={()=>{
        if (onPress) {
            onPress()
        }
    }}
    >
        <FA5Icon
        name={'plus'}
        size={24}
        color={'#FFF'}
        />
    </TouchableOpacity>
  )
}

export default FloatingButton

const styles = StyleSheet.create({
    btnCont:{
        position: 'absolute',
        bottom: sizeHUnit(4),
        right: sizeWUnit(8),
        backgroundColor: '#2d64bc',
        width: sizeWUnit(14),
        aspectRatio:1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: sizeWUnit(7),
      },
   
})