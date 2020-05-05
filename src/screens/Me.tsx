import React, {Component} from "react";
import {View, Text} from 'react-native';

class Me extends Component{
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ff0000'}}>
        <Text>Me</Text>
      </View>
    );
  }
}

export default Me;
