import {Dimensions, StatusBar,PixelRatio,Platform} from 'react-native'
import { initialWindowMetrics } from "react-native-safe-area-context";

const insets = initialWindowMetrics.insets;

const {width , height} = Dimensions.get('screen')


const scrn_width = width
const scrn_height = height

const act_hg = scrn_height - StatusBar.currentHeight - insets.bottom

const pl_hght = Platform.OS == 'ios' ? scrn_height : act_hg

const rspH = (val) => {
    return val * pl_hght * 0.01
}

const rspW = (val) => {
    return val * scrn_width * 0.01
}

const rspF = (val) =>{
    return val * pl_hght * pl_hght/scrn_width * 0.01
  }

const sizeHUnit = (val) => act_hg * 0.01 * val
const sizeWUnit = (val) => scrn_width * 0.01 * val


export  {
    scrn_width,
    scrn_height,
    act_hg,
    sizeWUnit,
    sizeHUnit,
    rspF,
    rspH,
    rspW,
}   