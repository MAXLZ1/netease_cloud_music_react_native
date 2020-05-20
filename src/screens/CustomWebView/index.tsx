import React, {Component} from "react";
import WebView from "react-native-webview";
import {WebViewEvent} from "react-native-webview/lib/WebViewTypes";

interface CustomWebViewProps {
  route: any
}

class CustomWebView extends Component<CustomWebViewProps>{
  onLoad(e: WebViewEvent) {
    console.log(e)
  }

  render() {
    const uri = this.props.route.params.uri;
    return (
      <WebView
        source={{uri}}
        onLoad={this.onLoad}
      />
    );
  }
}

export default CustomWebView;
