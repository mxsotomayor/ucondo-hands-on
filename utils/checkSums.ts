import { stringMd5 } from "react-native-quick-md5";

export class CheckSumUtil {
  static create(data: unknown) {
    return stringMd5(JSON.stringify(data));
  }
  static hashChanges(currentCheckSum: string, data: unknown) {
    return currentCheckSum === stringMd5(JSON.stringify(data));
  }
}
