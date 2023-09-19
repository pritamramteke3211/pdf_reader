import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
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
import { rspF3 } from '../../App';

const PDFViewer = () => {
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
    )
    )
    ;
  };

  const animatedBox = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedPageBox.value, [0, 100], [1, 0]),
    };
  });

  return (
    <View style={styles.container}>
      <Pdf
        source={require('../assets/docs/sample.pdf')}
        trustAllCerts={false}
        enablePaging
        horizontal
        
        onLoadComplete={(numberOfPages, filePath) => {
          settotalPages(numberOfPages);
          console.log(`Number of pages: ${numberOfPages}`);
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
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pageCon: {
    position: 'absolute',
    bottom: Dimensions.get('window').height / 20,
    backgroundColor: '#00000070',
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').height / 20,
    borderRadius: Dimensions.get('window').height / 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTxt: {
    fontSize: rspF3(1),
    textAlign: 'center',
    color: '#fff',
  },
});
