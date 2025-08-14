import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface HomeAccountFilterStoreProps {
  filterText?: string;
  setFilterText: (text: string) => void;
  search: () => void;
}

const homeAccountFilterStore = create<HomeAccountFilterStoreProps>(
  (set, get) => ({
    async search() {

    },
    setFilterText(text) {
      set(() => ({ filterText: text }));
    },
  })
);

export const useHomeAccountFilterStore = () => {
  return homeAccountFilterStore(useShallow((state) => ({ ...state })));
};
