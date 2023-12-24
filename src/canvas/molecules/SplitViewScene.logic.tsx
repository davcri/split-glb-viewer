import { useEffect, useMemo, useState } from "react";
import { WebGLRenderTarget } from "three";

export function useUniforms() {
  const [leftRT, setLeftRT] = useState<WebGLRenderTarget | null>(null);
  const [rightRT, setRightRT] = useState<WebGLRenderTarget | null>(null);

  const uniforms = useMemo(() => {
    return {
      map: { value: null as null | THREE.Texture },
      map2: { value: null as null | THREE.Texture },
      uResolution: { value: [window.innerWidth, window.innerHeight] },
    };
  }, []);

  useEffect(() => {
    if (leftRT && uniforms.map && rightRT && uniforms.map2) {
      uniforms.map.value = leftRT.texture;
      uniforms.map2.value = rightRT.texture;
    }
  }, [leftRT, rightRT, uniforms]);

  return { uniforms, setLeftRT, setRightRT };
}
