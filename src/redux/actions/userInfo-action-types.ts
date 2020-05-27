export const SET_USER_INFO = 'SET_USER_INFO';

interface UserPoint {
  userId: number
}

export interface Profile {
  nickname: string,
  avatarUrl: string,
  vipType: number,
  userType: number,
  createTime: number,
  userId: number,
  gender: number,
  birthday: number
}

interface SetUserInfoAction {
  type: string,
  userInfo: UserInfoState
}

export interface UserInfoState {
  level?: number,
  userPoint?: UserPoint,
  profile?: Profile
}

export type UserInfoAction = SetUserInfoAction;
