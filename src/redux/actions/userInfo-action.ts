import API from "../../services";
import {SET_USER_INFO, UserInfoState} from "./userInfo-action-types";

const setUserInfo = (userInfo: UserInfoState) => ({
  type: SET_USER_INFO,
  userInfo
});

export const getUserInfo = (uid: number) => {
  return async (dispatch: Function) => {
    const result: any = await API.requestUserInfo(uid);
    const {code, level, profile, userPoint} = result;

    if (code === 200) {
      const userInfo: UserInfoState = {
        level,
        profile,
        userPoint
      };
      dispatch(setUserInfo(userInfo))
    } else {
      dispatch(setUserInfo({}))
    }
  }
};
