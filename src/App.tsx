import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AppUI } from "./ui/organisms/AppUI";
import { useAppStore } from "./store/app.store";
import { SplitViewScene } from "./canvas/molecules/SplitViewScene";

export const envPreset = "city";

export default function App() {
  const modelLeft = useAppStore((s) => s.modelLeft);
  const modelRight = useAppStore((s) => s.modelRight);

  return (
    <>
      <AppUI />

      <Canvas style={{ position: "fixed", inset: 0, zIndex: -1 }}>
        <color attach="background" args={["white"]} />
        <Environment preset={envPreset} blur={0.9} background />
        <OrbitControls />

        <SplitViewScene modelLeft={modelLeft} modelRight={modelRight} />
      </Canvas>
    </>
  );
}
