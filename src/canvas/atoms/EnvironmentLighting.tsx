import { Environment } from "@react-three/drei";
import { envPreset } from "../../App";

export const EnvironmentLighting = () => {
  return (
    <>
      {/* <ambientLight intensity={30} /> */}
      <hemisphereLight intensity={20} />
      <directionalLight intensity={1} position={[1, 0.2, 0]} />
      <Environment preset={envPreset} />
    </>
  );
};
