import React, {Component} from "react";
import WebView from "react-native-webview";
import {WebViewEvent} from "react-native-webview/lib/WebViewTypes";
import {connect} from 'react-redux';
import {AnyAction, Dispatch} from "redux";
import {resetWebViewTitle, setWebViewTitle} from "../../redux/actions/webView-action";

interface CustomWebViewProps {
  route: any,
  setWebViewTitle: (title: string) => void,
  resetWebViewTitle: () => void
}

class CustomWebView extends Component<CustomWebViewProps>{
  onLoad = (e: WebViewEvent) => {
    const {title} = e.nativeEvent;
    title && this.props.setWebViewTitle(title);
  };

  componentWillUnmount() {
    this.props.resetWebViewTitle();
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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  setWebViewTitle: (title: string) => {
    dispatch(setWebViewTitle(title))
  },
  resetWebViewTitle: () => {
    dispatch(resetWebViewTitle())
  }
});

export default connect(null, mapDispatchToProps)(CustomWebView);
