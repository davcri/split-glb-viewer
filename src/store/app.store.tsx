import { create } from "zustand";

type SplitViewerStore = {
  modelLeft?: string;
  modelRight?: string;
};

export const useAppStore = create<SplitViewerStore>((set) => ({
  modelLeft: undefined,
  modelRight: undefined,
}));
