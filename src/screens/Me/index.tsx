import React, {Component} from "react";
import {View, Text, ScrollView, Dimensions, NativeModules, Platform} from 'react-native';
const {width, height} = Dimensions.get('window')
const {StatusBarManager} = NativeModules

let statusHeight: number = 0
if (Platform.OS === 'ios') {

  StatusBarManager.getHeight((statusBarHeight: any)=>{
    statusHeight = statusBarHeight.height
  })
} else if (Platform.OS === 'android') {
  statusHeight = StatusBarManager.HEIGHT || 0
}

class Index extends Component{
  render() {
    return (
      <ScrollView pagingEnabled={true}>
        <View style={{width: width, height: height - statusHeight - 50, backgroundColor: '#ff0000'}} />
        <View style={{width: width, height: height - statusHeight - 50, backgroundColor: '#4cff13'}} />
        <View style={{width: width, height: height - statusHeight - 50, backgroundColor: '#94b8ff'}} />
        <View style={{width: width, height: height - statusHeight - 50, backgroundColor: '#ffd020'}} />
        <View style={{width: width, height: height - statusHeight - 50, backgroundColor: '#ff84f9'}} />
      </ScrollView>
    );
  }
}

export default Index;
