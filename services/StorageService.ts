import { AccountModel } from "@/models";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageService {
  static async get(key: string): Promise<AccountModel[] | false> {
    // DEV_NOTE: uncomment for restarting
    // console.info("deleting all...")
    // await AsyncStorage.removeItem("accounts");

    const value = await AsyncStorage.getItem(key);

    if (value) {
      return JSON.parse(value) as AccountModel[];
    }
    return false;
  }
  static async save(key: string, data: unknown) {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  }
}
