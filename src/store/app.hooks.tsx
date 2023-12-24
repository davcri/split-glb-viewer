import { useAppStore } from "./app.store";

export function useAnyModelLoaded() {
  const leftModelSet = useAppStore((s) => s.modelLeft) !== undefined;
  const rightModelSet = useAppStore((s) => s.modelRight) !== undefined;
  return leftModelSet || rightModelSet;
}

export function useNoModelLoaded() {
  const leftModelSet = useAppStore((s) => s.modelLeft) !== undefined;
  const rightModelSet = useAppStore((s) => s.modelRight) !== undefined;
  return !leftModelSet && !rightModelSet;
}

export function loadDemoModels() {
  const model1 = "/DamagedHelmet.glb";
  const model2 = "/DamagedHelmet@128px_draco_compressed.glb";
  useAppStore.setState({
    modelLeft: model1,
    modelRight: model2,
  });
}
