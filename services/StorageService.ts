import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageService {
  static async get<T>(key: string): Promise<T | false> {
    // DEV_NOTE: uncomment for restarting
    // console.info("deleting all...")
    // await AsyncStorage.removeItem("accounts");
    // await AsyncStorage.removeItem("sync-ops");

    const value = await AsyncStorage.getItem(key);

    if (value) {
      return JSON.parse(value) as T;
    }
    return false;
  }
  
  static async save(key: string, data: unknown) {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  }

  static async delete(key: string) {
    await AsyncStorage.removeItem(key);
  }
}
