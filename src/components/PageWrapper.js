import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header'

const PageWrapper = ({header="", children, extraStyle={}, back=false}) => {
  return (
    <View
    style={[styles.cont,extraStyle]}
    >
       { 
       header &&
       <Header
       back={back}
        title={header}
        />}
        {children}
    </View>
  )
}

export default PageWrapper

const styles = StyleSheet.create({
    cont: {
        flex:1, 
        backgroundColor:'#f5f5f5',
    }
})