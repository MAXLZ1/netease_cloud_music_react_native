import * as React from "react";
import {Platform, TouchableNativeFeedback, TouchableHighlight} from "react-native";

export default function TouchableCompatibility(props: any) {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback {...props} />
    )
  }
  return (
    <TouchableHighlight activeOpacity={0.6} underlayColor="#dddddd" {...props} />
  );
}
