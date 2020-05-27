import webViewInfo from "./webView-reducer";
import userInfo from "./userInfo-reducer";
import {combineReducers} from "redux";


const rootReducer = combineReducers({
  webViewInfo,
  userInfo
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
