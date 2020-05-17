import React, {Component} from "react";
import {Text, TouchableHighlight, StyleSheet, GestureResponderEvent, View} from "react-native";
import Icon from "../assets/fonts/Iconfont";
import IconType from "../assets/fonts/icon";

interface CustomButtonProps {
  label: string,
  icon?: IconType,
  onPress?: (event: GestureResponderEvent) => void
}

class CustomButton extends Component<CustomButtonProps>{
  render() {
    const {label, icon, onPress} = this.props;

    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#c9cacb"
        onPress={onPress}
      >
        <View style={styles.box}>
          {icon && <Icon name={icon} size={12} color="#000000" />}
          <Text style={styles.text}>{label}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c9cacb',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 12
  },
});

export default CustomButton;
