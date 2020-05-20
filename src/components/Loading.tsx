import React, {Component} from "react";
import {Text, View, StyleSheet, Animated, Easing} from "react-native";
import {ThemeColor} from "../constants/theme";

class Loading extends Component{
  private animatedValue: Animated.Value;

  constructor(props: Readonly<{}>) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount(): void {
    this.heightChange();
  }

  heightChange() {
    this.animatedValue.setValue(0);

    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start(() => this.heightChange());
  }

  render() {
    const height1 = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [16, 4, 16]
    });
    const height2 = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [4, 16, 4]
    });

    return (
      <View style={styles.loading}>
        <View style={styles.lines}>
          <Animated.View style={[styles.line, {height: height1}]}/>
          <Animated.View style={[styles.line, {height: height2}]}/>
          <Animated.View style={[styles.line, {height: height1}]}/>
          <Animated.View style={[styles.line, {height: height2}]}/>
        </View>
        <Text style={styles.text}>努力加载中...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5
  },
  lines: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  line: {
    width: 1,
    backgroundColor: ThemeColor,
    marginHorizontal: 3,

  },
  text: {
    fontSize: 12,
    color: '#ababab',
    marginLeft: 6
  }
});

export default Loading;
