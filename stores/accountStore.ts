import { data } from "@/data";
import { AccountModel, SyncOpsModel } from "@/models";
import { StorageService } from "@/services/StorageService";
import { CheckSumUtil } from "@/utils";
import { sortAccounts } from "@/utils/sortNestedCode";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface AccountStore {
  isFetching?: boolean;
  accounts: AccountModel[];
  
  init: () => void;
  addAccount: (account: AccountModel) => void;
  deleteAccount: (code: string) => void;

  isSynchronizable?: boolean;
  synchronize: () => Promise<void>;
}

const SYNC_OPS_KEY = "sync-ops";
const ACCOUNTS_KEY = "accounts";

const accountStore = create<AccountStore>((set, get) => ({
  isFetching: true,
  accounts: [],
  async synchronize() {
    try {
      const syncOps = await StorageService.get<SyncOpsModel>(SYNC_OPS_KEY);

      console.log("Syncing", syncOps);

      // call external Rest API in case synchronization matters

      // delete on success
      await StorageService.delete(SYNC_OPS_KEY);

      set(() => ({
        isSynchronizable: false,
      }));

    } catch {
      throw new Error("Error syncing");
    }
  },
  init: async () => {
    try {
      set(() => ({ isFetching: true }));

      const entries = await StorageService.get<AccountModel[]>(ACCOUNTS_KEY);

      if (Array.isArray(entries)) {
        set(() => ({
          isFetching: false,
          accounts: entries,
        }));
      } else {
        // initial seed from local json
        const newEntries = JSON.stringify(data);
        await StorageService.save(ACCOUNTS_KEY, newEntries);

        const hasSync =
          (await StorageService.get<SyncOpsModel>(SYNC_OPS_KEY)) === false;

        if (hasSync) {
          console.log("loading sync", hasSync);
        }

        set(() => ({
          isSynchronizable: !hasSync,
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

    try {
      await StorageService.save(ACCOUNTS_KEY, accounts);
    } catch {
      console.error("Error saving new account");
    }

    try {
      let syncData = await StorageService.get<SyncOpsModel>(SYNC_OPS_KEY);
      if (syncData !== false) {
        syncData.create.push(account);
      } else {
        syncData = {
          delete: [],
          create: [account],
        };
      }
      await StorageService.save(SYNC_OPS_KEY, syncData);
      console.log("Saved sync-op [operation:create]");
    } catch (e) {
      console.error("[Error] saving sync-op [operation:create]", e);
    }

    set(() => ({
      isFetching: false,
      accounts: accounts,
      isSynchronizable: true,
      checkSums: CheckSumUtil.create(accounts),
    }));
  },
  deleteAccount: async (code: string) => {
    const accounts = get().accounts.filter((a) => a.code !== code);

    set(() => ({
      isFetching: true,
    }));

    try {
      await StorageService.save(ACCOUNTS_KEY, accounts);
    } catch {
      console.error("Error deleting account");
    }

    try {
      let syncData = await StorageService.get<SyncOpsModel>(SYNC_OPS_KEY);

      if (syncData !== false) {
        syncData.delete.push(code);
      } else {
        syncData = {
          create: [],
          delete: [code],
        };
      }
      await StorageService.save(SYNC_OPS_KEY, syncData);
      console.log("Saved sync-op [operation:delete]");
    } catch (e) {
      console.error("[Error] saving sync-op [operation:delete]", e);
    }

    set(() => ({
      accounts,
      isSynchronizable: true,
      isFetching: false,
    }));
  },
}));

export const useAccountStore = () => {
  return accountStore(useShallow((state) => ({ ...state })));
};
