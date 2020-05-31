import React, {Component} from "react";
import {View, StyleSheet} from "react-native";

class FooterPlayer extends Component{
  render() {
    return (
      <View style={styles.box}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: 50,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e3e3e3',
    backgroundColor: 'rgba(255, 255, 255, 0.98)'
  }
});

export default FooterPlayer;
