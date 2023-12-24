import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Scene, WebGLRenderTarget } from "three";
import { EnvironmentLighting } from "../atoms/EnvironmentLighting";

type ModelRenderTargetProps = {
  model: string;
  renderTargetAttach: (rt: WebGLRenderTarget) => void;
};

export function ModelRenderTarget({ model, renderTargetAttach }: ModelRenderTargetProps) {
  const sceneRef = useRef<Scene>(undefined!);
  const renderTarget = useRef<WebGLRenderTarget>(new WebGLRenderTarget(1280, 1280));
  const gltf = useGLTF(model);
  const { environment } = useThree((s) => s.scene);

  const scene = useMemo(() => {
    const clonedScene = gltf.scene.clone();
    clonedScene.traverse((object) => {
      if (object.type === "Mesh") {
        // @ts-ignore
        object.material.envMap = environment;
        // @ts-ignore
        object.material.needsUpdate = true;
      }
    });
    return clonedScene;
  }, [gltf.scene, environment]);

  useEffect(() => {
    renderTargetAttach(renderTarget.current);
    // useStore.setState({ rt1: renderTarget });
  }, []);

  useFrame(({ gl, camera }) => {
    gl.setRenderTarget(renderTarget.current);
    gl.render(sceneRef.current, camera);
    gl.setRenderTarget(null);
  });

  return (
    <scene ref={sceneRef}>
      <EnvironmentLighting />
      <primitive object={scene} />
    </scene>
  );
}
