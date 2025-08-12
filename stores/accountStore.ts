import { CheckSumUtil } from "@/utils";
import { sortAccounts } from "@/utils/sortNestedCode";
import { create } from "zustand";
import { data } from "@/data";
import { AccountModel } from "@/models";
import { StorageService } from "@/services/StorageService";
import { useShallow } from "zustand/react/shallow";

interface AccountStore {
  isFetching?: boolean;
  accounts: AccountModel[];
  init: () => void;
  addAccount: (account: AccountModel) => void;
  deleteAccount: (code: string) => void;
}

const accountStore = create<AccountStore>((set, get) => ({
  isFetching: true,
  accounts: [],
  init: async () => {
    try {
      set(() => ({ isFetching: true }));

      const entries = await StorageService.get("accounts");

      if (entries) {
        set(() => ({
          isFetching: false,
          accounts: entries,
        }));
      } else {

        // initial seed from local json
        const newEntries = JSON.stringify(data);
        await StorageService.save("accounts", newEntries);
        set(() => ({
          isFetching: false,
          accounts: data as AccountModel[],
        }));
      }
    } catch (e) {
      console.log("error loading", e);
      set(() => ({
        isFetching: false,
      }));
    }
  },
  addAccount: async (account: AccountModel) => {
    set(() => ({
      isFetching: true,
    }));
    const accounts = sortAccounts([...get().accounts, account]);
    await StorageService.save("accounts", accounts);
    set(() => ({
      isFetching: false,
      accounts: accounts,
      checkSums: CheckSumUtil.create(accounts),
    }));
  },
  deleteAccount: async (code: string) => {
    const accounts = get().accounts.filter((a) => a.code !== code);
    set(() => ({
      isFetching: true,
    }));
    await StorageService.save("accounts", accounts);
    set(() => ({
      accounts,
      isFetching: false,
    }));
  },
}));

export const useAccountStore = () => {
  return accountStore(useShallow((state) => ({ ...state })));
};
