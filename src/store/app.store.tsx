import { create } from "zustand";

const model1 = "/DamagedHelmet.glb";
const model2 = "/DamagedHelmet@128px_draco_compressed.glb";

type SplitViewerStore = {
  modelLeft?: string;
  modelRight?: string;
};

export const useAppStore = create<SplitViewerStore>((set) => ({
  modelLeft: undefined,
  modelRight: undefined,
}));
