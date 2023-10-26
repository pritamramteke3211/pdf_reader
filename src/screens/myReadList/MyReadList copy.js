import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import FloatingButton from '../../components/FloatingButton'
import DocumentPicker from 'react-native-document-picker'
import { rspF, sizeHUnit, sizeWUnit } from '../../theme/responsive'
import ADIcon from 'react-native-vector-icons/AntDesign'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'
import colors from '../../theme/colors'
import styles from './styles'
import RNFS from 'react-native-fs'
import randomColorGenerator from '../../utils/randomColor'
import navigationStrings from '../../config/navigationStrings'
import PageWrapper from '../../components/PageWrapper'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

const Item = ({itm,index, navigation}) => {
  
    console.log("itm",itm)
   const bg = {backgroundColor: randomColorGenerator()}
        return(
          <GestureHandlerRootView>
            <PanGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              // Handle gesture state change here
              console.log("nativeEvent.state",nativeEvent.state)
              if (nativeEvent.state === 5) {
                // Gesture ended (5 is the state for "END")
                // translateX.value = withSpring(0);
                // translateY.value = withSpring(0);
                console.log("END")
              }
            }}
            >
            <Pressable 
            onPress={()=>{
              navigation.navigate(navigationStrings.PDFVIEWER, {
                item: itm
              })
            }}
            >
              <Animated.View
              style={styles.item}
              >
              <View style={{...styles.leftcont,...bg}}>
                <Text adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.leftcont_txt}>{index + 1}</Text>
              </View>
              <View
              style={styles.centercont}
              >
                
                
                <Text
                adjustsFontSizeToFit
                style={styles.centercont_txt}
                numberOfLines={1} >{itm.name.slice(0,-4)}</Text>
                </View>
              

              <View
              style={styles.rightcont}
              >
                <FA5Icon 
                size={rspF(1.2)}
                name={'trash'} 
                color={colors.red}
                />
<FA5Icon 
                size={rspF(1.2)}
                name={'share'} 
                color={colors.green}
                />
              </View>
              </Animated.View>
           </Pressable>
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
        console.log("uploadPdf")
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
          console.log("err", err)
        }
      }

    const updateLis = async ()=>{
      try {
        const folderExists = await RNFS.exists(folderPath);
        if (!folderExists) {
          await RNFS.mkdir(folderPath);
        }  
        const all_pdfs = await RNFS.readDir(folderPath);
        console.log("all_pdfs",all_pdfs.length)
        let pdfsList = [...readlist]     
        let new_pdfs = []
        if (pdfsList.length > 0) {
          new_pdfs = all_pdfs.filter( v => !pdfsList.map(j => j.path).includes('file://' + v.path) )  
        }
        else{
          new_pdfs = all_pdfs
        }

        console.log("new_pdfs",new_pdfs.length)
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
          console.log("pdfsList",pdfsList)
          setreadlist(pdfsList)
         
        }
   
      } catch (err) {
        console.log("err while getting pdfs", err)
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
            />
        )
    }

    const EmptyCont = () =>(
      <View style={styles.emptylistcont}>
        <Text style={styles.emptylisttxt}>No Pdf Selected By You</Text>
      </View>
    )
      
  return (
    <PageWrapper  header={route.name}>
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

