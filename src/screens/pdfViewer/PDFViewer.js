import {StyleSheet, Text, View, Dimensions, TextInput , TouchableOpacity, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import Pdf from 'react-native-pdf';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { act_hg, rspF, rspH, rspW, scrn_height, scrn_width } from '../../theme/responsive';

const PDFViewer = ({route}) => {

  const { path } = route?.params?.item

  const [totalPages, settotalPages] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);
  const animatedPageBox = useSharedValue(1);
  
  const fadeOutIn = async () => {
    animatedPageBox.value = 
    withSequence(
    withTiming(
    0,
        {
            duration: 500,
        }
    ),
    withDelay(
      1000,
      withTiming(100, {
        duration: 2000,
      }),
    ));
  };

  const animatedBox = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedPageBox.value, [0, 100], [1, 0]),
    };
  });


  return (
    
      <View>

      <Pdf      
        source= {{ uri: path, cache: true }}
        trustAllCerts={false}
        enablePaging
        horizontal
        onLoadComplete={(numberOfPages, filePath) => {
          settotalPages(numberOfPages);
          console.log(`Number of pages: ${numberOfPages}`);
        }}

        onPageSingleTap={()=>{
          console.log("Single Tap")
          fadeOutIn()
        
        }}
      
        onPageChanged={(page, numberOfPages) => {
          setcurrentPage(page);
          fadeOutIn()
          console.log(`Current page: ${page}`);
        }}

        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />


      <Animated.View style={[styles.pageCon,animatedBox]}>
        <Text style={styles.pageTxt}>{`${currentPage} of ${totalPages}`}</Text>
      </Animated.View>

      </View>

  );
};

export default PDFViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    width: scrn_width,
    height: act_hg,
  },
  pageCon: {
    position: 'absolute',
    bottom: rspH(4),
    // right: rspW(4),
    alignSelf:'center',
    backgroundColor: '#00000070',
    width: Dimensions.get('window').width / 4,
    height: rspH(4.6),
    borderRadius: Dimensions.get('window').height / 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageRedCon: {
    position: 'absolute',
    left: rspW(6),
    top: rspH(4),
    backgroundColor: '#00000070',
    width: rspW(40),
    height: rspH(4.6),
    flexDirection:'row',
    borderRadius: Dimensions.get('window').height / 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTxt: {
    fontSize: rspF(1),
    lineHeight: rspF(1.4),
    textAlign: 'center',
    color: '#fff',
  },
  
});
