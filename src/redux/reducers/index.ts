import webViewInfo from "./webView-reducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  webViewInfo
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
