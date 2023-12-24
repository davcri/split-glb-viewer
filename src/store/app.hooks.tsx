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
