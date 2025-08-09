import { AccountModel } from "@/data/stores/accountStore";

export const sortAccounts = (accounts: AccountModel[]) => {
  return accounts.sort((a, b) => {
    const partsA = a.code.split(".").map(Number);
    const partsB = b.code.split(".").map(Number);

    const length = Math.max(partsA.length, partsB.length);

    for (let i = 0; i < length; i++) {
      const valA = partsA[i] ?? 0;
      const valB = partsB[i] ?? 0;
      if (valA !== valB) return valA - valB;
    }

    return 0;
  });
};
