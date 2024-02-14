import { StyleSheet, TextInput,Text, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import gStyle from '../styles/gStyle'
import IoIcon from 'react-native-vector-icons/Ionicons'
import { rspF, rspH, rspW, scrn_width, sizeHUnit } from '../theme/responsive'
import colors from '../theme/colors'
import fontFamily from '../theme/fontFamily'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeOut, SlideInLeft, SlideInRight, SlideOutRight, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import FAIcon from 'react-native-vector-icons/FontAwesome'
import { SlideFromRightIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets'


const Header = ({title="",back}) => {
    const navigation = useNavigation()
    const animation = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(()=>{
        return{
      width  :  animation.value == 1? withTiming(300, {duration: 500})
      :
      withTiming(0, {duration: 500})
    }
    })

    const [value, setvalue] = useState(0)
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
            
           {
           value == 0 ?
           <Animated.View style={styles.header_tcont}
           entering={SlideInLeft}
           >
            <Text style={styles.header_title}>{title}</Text>
            </Animated.View>
            :
            <Animated.View
            entering={SlideInRight}
            exiting={SlideOutRight}
      style={[{
        
        width: '100%',
        height: '80%',
        backgroundColor:'#E7E7E7',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems:'center',
      },
      // animatedStyle
    ]}
      >
        <TextInput style={{width : '85%', color: colors.black,
      paddingHorizontal:rspW(4),  
      paddingVertical: rspH(0),
      fontSize: rspF(1),
      lineHeight: rspF(1.1),
      }}
        placeholderTextColor={colors.grey}
        placeholder={'Search here...'} />
        
      </Animated.View>
        }


            <TouchableOpacity onPress={() => {
            if (animation.value == 1) {
                animation.value = 0;
                setvalue(0)
            }
            else{
                animation.value = 1;
                setvalue(1)
            }
        }}
        style={{position:'absolute', right:rspF(1)}}
        >
          <View style={{width: rspW(8), height: rspW(8),justifyContent:'center'}}>
            <FAIcon
            name={value == 1 ? 'close' : 'search'}
            size={rspF(1.5)}
            color={colors.white}
            />
            </View>
        </TouchableOpacity>
            
            
            
        
            
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
      textAlign: 'center',
    },
})