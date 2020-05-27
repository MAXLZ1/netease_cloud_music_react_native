export const SET_WEBVIEW_TITLE = 'SET_WEBVIEW_TITLE';

export const RESET_WEBVIEW_TITLE = 'RESET_WEBVIEW_TITLE';

interface SetWebViewTitleAction {
  type: string,
  title: string
}

interface ResetWebViewTitleAction {
  type: string,
  title?: string
}

export type WebViewInfoActions = SetWebViewTitleAction | ResetWebViewTitleAction;
