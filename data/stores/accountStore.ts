import { CheckSumUtil } from "@/utils";
import { create } from "zustand";

export interface AccountModel {
  account_name: string;
  allow_register: "Sim" | "Não";
  code: string;
  type: "Receita" | "Despesa";
}

interface AccountStore {
  isSynchronisable?: boolean;
  checkSums: string;
  accounts: AccountModel[];
  init: (account: AccountModel[]) => void;
  addAccount: (account: AccountModel) => void;
  deleteAccount: (code: string) => void;
}

const accountStore = create<AccountStore>((set) => ({
  checkSums: "",
  accounts: [],
  init: (accounts: AccountModel[]) => {
    set(() => ({ accounts, checkSums: CheckSumUtil.create(accounts) }));
  },

  addAccount: (account: AccountModel) => {
    const accounts = [...accountStore.getState().accounts, account];
    set((state) => ({
      accounts,
      checkSums: CheckSumUtil.create(accounts),
      isSynchronisable: true,
    }));
  },
  deleteAccount: (code: string) =>
    set((state) => ({
      accounts: state.accounts.filter((a) => a.code !== code),
      isSynchronisable: true,
    })),
}));

export default accountStore;
