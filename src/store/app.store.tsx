import { create } from "zustand";

type SplitViewerStore = {
  modelLeft?: string;
  modelRight?: string;
  uiHelpVisible: boolean;
};

export const useAppStore = create<SplitViewerStore>((set) => ({
  modelLeft: undefined,
  modelRight: undefined,

  uiHelpVisible: false,
}));
