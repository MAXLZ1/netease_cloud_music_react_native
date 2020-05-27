import {SET_WEBVIEW_TITLE, RESET_WEBVIEW_TITLE, WebViewInfoActions} from "../actions/webView-action-types";

interface WebViewInfoState {
  title?: string
}

const initWebViewInfo: WebViewInfoState = {
  title: '网易云音乐'
};

const webViewInfo = (state: WebViewInfoState = initWebViewInfo, action: WebViewInfoActions): WebViewInfoState => {
  switch (action.type) {
    case SET_WEBVIEW_TITLE:
      return {...state, title: action.title};
    case RESET_WEBVIEW_TITLE:
      return {...state, title: '网易云音乐'}
    default:
      return state;
  }
};

export default webViewInfo;
