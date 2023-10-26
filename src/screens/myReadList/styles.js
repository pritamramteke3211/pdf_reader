import { StyleSheet} from 'react-native'
import { rspF, sizeHUnit, sizeWUnit } from '../../theme/responsive'
import colors from '../../theme/colors'
import fontFamily from '../../theme/fontFamily'
import gStyle from '../../styles/gStyle'


const styles = StyleSheet.create({
    emptylistcont : {
      alignItems: 'center', 
      justifyContent: 'center', 
      flex: 1
    },
    emptylisttxt : {
      color: colors.black,
      fontSize: rspF(1.3),
      fontWeight: '500',
      fontFamily: fontFamily.medium,
    },
    item:{
      width: '100%',
      backgroundColor: colors.white,
      alignSelf:'center',
      marginBottom: sizeHUnit(1),
      height: sizeHUnit(10), 
      ...gStyle.r_sb,
      ...gStyle.box_shadow,
      },
    leftcont:{
      width:sizeWUnit(12),
      height: '100%',
      ...gStyle.r_center,
      paddingTop: sizeHUnit(1.4),
      paddingHorizontal: sizeWUnit(1),
    },
    leftcont_txt:{
      color: colors.white,
      fontSize: rspF(1.5),
      fontFamily: fontFamily.medium,
      lineHeight: rspF(1.7),
      textAlign:'center',
    },
    centercont:{
      paddingHorizontal: sizeWUnit(2),
      ...gStyle.r_sb,
      height: '100%',
      flex: 1,
      
    },
    center_txt_cont:{
        height: '100%',
        // alignItems:'flex-start',
        justifyContent:'center',
        flex: 1,
        paddingHorizontal: sizeWUnit(2),
    },
    centercont_txt:{
        fontFamily: fontFamily.medium,
        fontSize: rspF(1),
        color: colors.black,
    },
    rightcont:{
    width: '20%',
      paddingHorizontal: sizeWUnit(2),
      ...gStyle.r_sb,
      height: '100%',
      paddingVertical: sizeHUnit(0.8),
    },
    rightcont_txt:{
        fontFamily: fontFamily.semibold,
        fontSize: rspF(1),
        color: colors.black,
    }
  })

  export default styles