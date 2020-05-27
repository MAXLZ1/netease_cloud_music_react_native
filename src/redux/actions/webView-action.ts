import {SET_WEBVIEW_TITLE, RESET_WEBVIEW_TITLE, WebViewInfoActions} from "./webView-action-types";

export function setWebViewTitle(title: string): WebViewInfoActions {
  return {
    type: SET_WEBVIEW_TITLE,
    title
  }
}

export function resetWebViewTitle(): WebViewInfoActions {
  return {
    type: RESET_WEBVIEW_TITLE
  }
}
