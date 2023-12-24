import { ScreenQuad } from "@react-three/drei";
import { createPortal, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Scene, ShaderMaterial } from "three";
import { ModelRenderTarget } from "./ModelRenderTarget";
import { fullscreenVert, fragmentShader } from "./SplitViewScene.shaders";
import { useUniforms } from "./SplitViewScene.logic";

type SplitModelViewProps = {
  modelLeft?: string;
  modelRight?: string;
};

export function SplitViewScene({ modelLeft, modelRight }: SplitModelViewProps) {
  const [vScene] = useState(() => new Scene());
  const planeMat = useRef<ShaderMaterial>(undefined!);
  const { uniforms, setLeftRT, setRightRT } = useUniforms();

  useFrame(({ gl }) => {
    if (!planeMat.current) return;
    const canvas = gl.domElement;
    uniforms.uResolution.value = [canvas.width, canvas.height];
  });

  return (
    <>
      <ScreenQuad>
        <shaderMaterial
          uniforms={uniforms}
          ref={planeMat}
          vertexShader={fullscreenVert}
          fragmentShader={fragmentShader}
          transparent
        />
      </ScreenQuad>

      {createPortal(
        <>
          <Suspense fallback={null}>
            {modelLeft && (
              <ModelRenderTarget
                model={modelLeft}
                renderTargetAttach={(rt) => {
                  setLeftRT(rt);
                }}
              />
            )}

            {modelRight && (
              <ModelRenderTarget
                model={modelRight}
                renderTargetAttach={(rt) => {
                  setRightRT(rt);
                }}
              />
            )}
          </Suspense>
        </>,
        vScene
      )}
    </>
  );
}
