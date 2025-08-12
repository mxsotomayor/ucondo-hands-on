export type AccountModelType = "expenses" | "revenues";

export interface AccountModel {
  name: string;
  releasable: boolean;
  code: string;
  type: AccountModelType;
}

export class AccountModelMapper {
  static fromJsonToList(data: unknown[]): AccountModel[] {
    console.log("data to parse", data);
    return data.map?.((item) => item as AccountModel) ?? [];
  }
}
