import {Platform} from 'react-native';
import Request from "../util/request";

const BASE_URL = 'http://192.168.0.100:3000';

export default class API {
  // 邮箱登录
  static async loginForEmail(email: string, pwd: string) {
    return await Request.GET(`${BASE_URL}/login?email=${email}&password=${pwd}`)
  }

  // 获取轮播数据
  static async requestSwiper(): Promise<Object> {
    let type: number = 0;
    if (Platform.OS === 'ios') {
      type = Platform.isPad ? 3 : 2;
    } else if (Platform.OS === 'android') {
      type = 1;
    }
    try {
      return await Request.GET(`${BASE_URL}/banner?type=${type}`);
    } catch (e) {
      return new Error(`获取轮播数据失败：${e}`);
    }
  }

  // 每日推荐歌单
  static async requestRecommendSongList(): Promise<Object> {
    try{
      return await Request.GET(`${BASE_URL}/recommend/resource`);
    } catch (e) {
      return new Error('每日歌单请求失败！');
    }
  }

  // 每日推荐歌曲
  static async requestRecommendSongs(){
    try{
      return await Request.GET(`${BASE_URL}/recommend/songs`);
    } catch (e) {
      return new Error('每日歌曲请求失败！');
    }
  }

  // 推荐新音乐
  static async requestNewSong() {
    try{
      return await Request.GET(`${BASE_URL}/personalized/newsong`);
    } catch (e) {
      return new Error('推荐新音乐请求失败！');
    }
  }

  // 新碟
  static async requestNewAlbum(offset: number, limit: number) {
    try{
      return await Request.GET(`${BASE_URL}/top/album?offset=${offset}&limit=${limit}`);
    } catch (e) {
      return new Error('新碟请求失败！');
    }
  }

  // 搜索
  static async requestSearch(keywords: string) {
    try{
      return await Request.GET(`${BASE_URL}/search?keywords=${keywords}`);
    } catch (e) {
      return new Error('搜索歌曲失败！');
    }
  }

  // 搜索建议
  static async requestSearchSuggest(keywords: string) {
    try{
      return await Request.GET(`${BASE_URL}/search/suggest?keywords=${keywords}&type=mobile`);
    } catch (e) {
      return new Error('搜索歌曲失败！');
    }
  }

  // 热搜
  static async requestHotSearchDetail() {
    try{
      return await Request.GET(`${BASE_URL}/search/hot/detail`);
    } catch (e) {
      return new Error('搜索热搜失败！');
    }
  }

  // 歌手列表
  static async requestArtist(limit: number, offset: number, type: number, area: number) {
    try{
      return await Request.GET(`${BASE_URL}/artist/list?limit=${limit}&offset=${offset}&type=${type}&area=${area}`);
    } catch (e) {
      return new Error('歌手列表失败！');
    }
  }

  // 用户详情
  static async requestUserInfo(uid: number) {
    try{
      return await Request.GET(`${BASE_URL}/user/detail?uid=${uid}`);
    } catch (e) {
      return new Error('每日歌单请求失败！');
    }
  }
}
