import { AccountModel } from "./AccountModel";

export interface SyncOpsModel {
  delete: string[];
  create: AccountModel[];
}
