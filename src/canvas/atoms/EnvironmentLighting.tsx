import { Environment } from "@react-three/drei";
import { envPreset } from "../../App";

export const EnvironmentLighting = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight intensity={10} position={[1, 0, 1]} />
      <Environment preset={envPreset} />
    </>
  );
};
