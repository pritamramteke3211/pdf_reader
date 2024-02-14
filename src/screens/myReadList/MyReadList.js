import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import FloatingButton from '../../components/FloatingButton'
import DocumentPicker from 'react-native-document-picker'
import { rspF, scrn_width, sizeHUnit, sizeWUnit } from '../../theme/responsive'
import ADIcon from 'react-native-vector-icons/AntDesign'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'
import colors from '../../theme/colors'
import styles from './styles'
import RNFS from 'react-native-fs'
import randomColorGenerator from '../../utils/randomColor'
import navigationStrings from '../../config/navigationStrings'
import PageWrapper from '../../components/PageWrapper'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { Layout, SlideInLeft, SlideInRight, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import Share from "react-native-share";



const Item = ({itm,index, navigation,removeItem,SharePDF}) => {

  const animation = useSharedValue(0)  
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
        ctx.startX = animation.value
    },
    onActive:(event, ctx)=>{
    
      if (ctx.startX < 0 && ctx.startX >= - 167) {
    
        if (event.translationX > 0 && event.translationX < 170) {
          animation.value = ctx.startX + event.translationX;    
        }
        
      }
      else
      if (event.translationX < 1 && event.translationX > - 167) {
 
        animation.value = ctx.startX + event.translationX;  
      }
      
    },
    onEnd:(event, ctx)=>{
 
      if (animation.value < -84) {
        animation.value = withTiming(-167)
      }
      else{
        animation.value = withTiming(0)
      }
      
    }
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animation.value }]
    }
  })
  
 
   const bg = {backgroundColor: randomColorGenerator()}
        return(
          <GestureHandlerRootView>
     
            <PanGestureHandler
  onGestureEvent={gestureHandler}
  
  >
      <Animated.View style={styles.item}
      layout={Layout.stiffness()}
      exiting={SlideInRight}
      entering={SlideInLeft}

      >
        
           <Animated.View
           style={{
            flex:3,
            height: '100%',
            backgroundColor: colors.white,
            alignItems:'center',
            justifyContent:'center',
            borderWidth:1,
            borderColor: colors.white,
          }}
          
           />
    
           <TouchableOpacity
           onPress={()=>{
            animation.value = withTiming(0)
                         Alert.alert("Are You Sure?", "You want to remove this pdf.", [
              {
                text: "Cancel",
              },
              {
                text: "OK",
                onPress: () => {
               
                  removeItem(index)
                },
              },
            ]);
           }}
           activeOpacity={0.5}
           style={{
            flex:1,
            height: '100%',
            backgroundColor: colors.lightBlue,
            alignItems:'center',
            justifyContent:'center',
            borderWidth:1,
            borderColor: colors.white,
          }}
           >
          <FA5Icon 
                size={rspF(1.2)}
                name={'trash'} 
                color={colors.red}
                />
           </TouchableOpacity>

           <TouchableOpacity
           activeOpacity={0.5}
           onPress={()=>{
            SharePDF(index)
           }}
           style={{
            flex:1,
            height: '100%',
            backgroundColor: colors.lightPurple,
            alignItems:'center',
            justifyContent:'center',
            borderWidth:1,
            borderColor: colors.white,
          }}
           >
           <FA5Icon 
                size={rspF(1.2)}
                name={'share'} 
                color={colors.green}
                />
           </TouchableOpacity>
           <Animated.View
      
        style={[{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          flexDirection:'row',
          alignItems:'center',
        },
        animatedStyle
      ]}
        >

        <Pressable
        
          onPress={()=>{
            navigation.navigate(navigationStrings.PDFVIEWER, {
              item: itm
            })
          }}
    
        style={[{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          flexDirection:'row',
          alignItems:'center',
        }
      ]}
        >

     

       <View style={{...styles.leftcont,...bg}}>
                <Text 
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.leftcont_txt}>
                  {index + 1}
                  </Text>
              </View>
              
              <View
              style={styles.centercont}
              >
                
                
                <Text
                // adjustsFontSizeToFit
                style={styles.centercont_txt}
                numberOfLines={1} 
                >{itm.name.slice(0,-4)}</Text>
                </View>
          

           
        </Pressable>
        </Animated.View>
      </Animated.View>
      </PanGestureHandler>
           </GestureHandlerRootView>
        )
}

const MyReadList = ({navigation,route}) => {

    const [readlist, setreadlist] = useState([])
    const [currentPath, setcurrentPath] = useState(RNFS.DocumentDirectoryPath)
    const [folderUp, setfolderUp] = useState(false)

    const folderPath = currentPath+'/pdfs'

    const uploadPdf = async () =>{
     
        try {
          const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf],
            allowMultiSelection: true,
          });
    
          for (let i = 0; i < result.length; i++) {
            const itm = result[i];
            const pdfPath = `${folderPath}/${itm?.name}`;
            const fexists = await RNFS.exists(pdfPath)

            if (!fexists) {
              await RNFS.moveFile(itm?.uri, pdfPath);  
            }
            setfolderUp(!folderUp)
          }
         
        } catch (err) {
          // console.log("err", err)
        }
      }

    const updateLis = async ()=>{
      try {
        const folderExists = await RNFS.exists(folderPath);
        if (!folderExists) {
          await RNFS.mkdir(folderPath);
        }  
        const all_pdfs = await RNFS.readDir(folderPath);
    
        let pdfsList = [...readlist]     
        let new_pdfs = []
        if (pdfsList.length > 0) {
          new_pdfs = all_pdfs.filter( v => !pdfsList.map(j => j.path).includes('file://' + v.path) )  
        }
        else{
          new_pdfs = all_pdfs
        }

        if (new_pdfs.length > 0) {
          for (let i = 0; i < new_pdfs.length; i++) {
            const pdf_itm = new_pdfs[i];
            const pdfPath = pdf_itm.path
            const compl_pdfPath = 'file://'+ pdfPath
            const fileStats = await RNFS.stat(pdfPath);
          const fileSizeInBytes = fileStats.size;
    
          // Convert to KB, MB, or GB as needed
          const fileSizeInMB = (fileSizeInBytes / 1024 / 1024).toFixed(3)
          
            let pdfitm = {
              name: pdf_itm?.name,
              size: fileSizeInMB,
              path: compl_pdfPath
            }

            pdfsList.push(pdfitm)
             
          }

          setreadlist(pdfsList)
         
        }
   
      } catch (err) {
        // console.log("err while getting pdfs", err)
      }
     
     
    }

    const removeItem = (itm_idx)=>{
   
      let itm = readlist[itm_idx]
  
      let itm_path = itm.path.split("///")[1]

  RNFS.unlink(itm_path)
  .then(() => {
    setreadlist(prev => prev.filter((v,index) => index != itm_idx ))
  })
  .catch((err) => {
    // console.log(err.message);
  });
  
    }

    const SharePDF = async (itm_idx) => {

      let itm = readlist[itm_idx]
      

        try {
          const pdfFilePath = itm.path // Replace with the actual path to your PDF file
    
          const options = {
            title: 'Share PDF',
            url: pdfFilePath,
            type: 'application/pdf',
          };
    
          await Share.open(options);
        } catch (error) {
          // console.log('Error sharing PDF:', error);
        }
      
    }


      useLayoutEffect(() => {
        updateLis()
      }, [folderUp])
      

    
    const renderItem = ({item,index}) => {
    
        return(
            <Item
            itm={item}
            index={index}
            navigation={navigation}
            removeItem={removeItem}
            SharePDF={SharePDF}
            />
        )
    }

    const EmptyCont = () =>(
      <View style={styles.emptylistcont}>
        <Text style={styles.emptylisttxt}>No Pdf Selected By You</Text>
      </View>
    )
      
  return (
    <PageWrapper  header={route.name}
    
    >
      <FloatingButton onPress={uploadPdf} />
        <View style={{marginTop: sizeHUnit(5)}}>
      <FlatList
        ListEmptyComponent={EmptyCont}
        data={readlist}
        renderItem={renderItem}
        keyExtractor={item => item.path}
        />
        </View>
    </PageWrapper>
  )
}

export default MyReadList

