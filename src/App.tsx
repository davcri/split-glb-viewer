import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AppUI } from "./ui/organisms/AppUI";
import { useEffect } from "react";
import { useAppStore } from "./store/app.store";
import { SplitViewScene } from "./canvas/molecules/SplitViewScene";

export const envPreset = "city";
const model1 = "/DamagedHelmet.glb";
const model2 = "/DamagedHelmet@128px_draco_compressed.glb";

export default function App() {
  useEffect(() => {
    useAppStore.setState({
      modelLeft: model1,
      modelRight: model2,
    });
  }, []);

  return (
    <>
      <AppUI />

      <Canvas style={{ position: "fixed", inset: 0, zIndex: -1 }}>
        <color attach="background" args={["white"]} />
        <Environment preset={envPreset} blur={0.9} background />
        <OrbitControls />

        <SplitViewScene modelLeft={model1} modelRight={model2} />
      </Canvas>
    </>
  );
}
