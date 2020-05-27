import {SET_USER_INFO, UserInfoAction, UserInfoState} from "../actions/userInfo-action-types";

const initUserInfo: UserInfoState = {

};

const userInfo = (state: UserInfoState = initUserInfo, action: UserInfoAction) => {
  switch(action.type){
    case SET_USER_INFO:
      return {...state, ...action.userInfo}
    default:
      return state;
  }
};

export default userInfo;
