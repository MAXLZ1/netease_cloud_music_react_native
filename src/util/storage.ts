import {AsyncStorage} from 'react-native';

export default class Storage {
  static async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(`存储失败：`);
      console.log(e);
    }
  }

  static async getItem(key: string): Promise<string> {
    try {
      return await AsyncStorage.getItem(key) || '';
    } catch (e) {
      console.log(`获取失败：`);
      console.log(e);
      return '';
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(`删除失败：`);
      console.log(e);
    }
  }
}
