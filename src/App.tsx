import { Environment, OrbitControls, ScreenQuad, useGLTF } from "@react-three/drei";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Scene, ShaderMaterial, WebGLRenderTarget } from "three";
import { create } from "zustand";

const fullscreenVert = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D map;
uniform sampler2D map2;
uniform vec2 uResolution;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec4 sampledDiffuseColor = texture2D( map, uv );
  vec4 sampledDiffuseColor2 = texture2D( map2, uv );

  gl_FragColor = (step(uv.x, 0.5) * sampledDiffuseColor2) + step(0.5, uv.x) * sampledDiffuseColor;
}`;


const envPreset = "city"
const model1 = "/DamagedHelmet.glb"
const model2 = "/DamagedHelmet@128px_draco_compressed.glb"

export default function App() {
  return (
    <>
      <div className="h-screen flex" onClick={(ev) => {
        console.log('clicchete')
      }}>
        <div className="flex-1"></div>
        <div className="bg-black bg-opacity-50 min-w-[3px]"></div>
        <div className="flex-1"></div>
      </div>

      <Canvas style={{ position: "fixed", inset: 0, zIndex: -1 }}>
        <color attach="background" args={["white"]} />
        <OrbitControls />
        <Environment preset={envPreset} blur={0.9} background />

        <SplitViewScene />
      </Canvas>
    </>
  );
}

const EnvironmentLighting = () => {
  return <>
    {/* <ambientLight intensity={30} /> */}
    <hemisphereLight intensity={20} />
    <directionalLight intensity={1} position={[1, 0.2, 0]} />
    <Environment preset={envPreset}  />
  </>
}

function SplitViewScene() {
  const [vScene] = useState(() => new Scene());
  const store = useStore();
  const planeMat = useRef<ShaderMaterial>(undefined!);
  // const map2UniformAttr = useRef<Uniform>(new Uniform(store.rt2.current));
  const uniforms = useMemo(() => {
    return {
      map: { value: store.rt1.current?.texture },
      map2: { value: store.rt2.current?.texture },
      uResolution: { value: [window.innerWidth, window.innerHeight] },
    };
  }, []);

  useFrame(({ gl }) => {
    if (!planeMat.current) return;
    const canvas = gl.domElement;

    if (store.rt1.current && uniforms.map && uniforms.map2 && store.rt2.current) {
      // this can be done only once
      uniforms.map.value = store.rt1.current.texture;
      uniforms.map2.value = store.rt2.current.texture;

      uniforms.uResolution.value = [canvas.width, canvas.height];
    }
  });

  return (
    <>
      <ScreenQuad>
        <shaderMaterial uniforms={uniforms} ref={planeMat} vertexShader={fullscreenVert} fragmentShader={fragmentShader} transparent />
      </ScreenQuad>

      {createPortal(
        <>
          <Suspense fallback={null}>
            <RT1 />
            <RT2 />
          </Suspense>
        </>,
        vScene
      )}
    </>
  );
}

type SplitViewerStore = {
  rt1: { current: WebGLRenderTarget | null };
  rt2: { current: WebGLRenderTarget | null };
};

const useStore = create<SplitViewerStore>((set) => ({
  rt1: { current: null },
  rt2: { current: null },
}));

function RT1() {
  const sceneRef = useRef<Scene>(undefined!);
  const renderTarget = useRef<WebGLRenderTarget>(new WebGLRenderTarget(1280, 1280));
  const gltf = useGLTF(model1);
  const { environment } = useThree(s => s.scene)

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
    useStore.setState({ rt1: renderTarget });
  }, []);

  useFrame(({ gl, camera }) => {
    gl.setRenderTarget(renderTarget.current);
    gl.render(sceneRef.current, camera);
    gl.setRenderTarget(null);
  });

  return (
    <scene ref={sceneRef}>
      <EnvironmentLighting />
      <primitive key={"rt1"} object={scene} />
    </scene>
  );
}

function RT2() {
  const sceneRef = useRef<Scene>(undefined!);
  const renderTarget = useRef<WebGLRenderTarget>(new WebGLRenderTarget(1280, 1280));
  const gltf = useGLTF(model2);
  const { environment } = useThree(s => s.scene)

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
    useStore.setState({ rt2: renderTarget });
  }, []);

  useFrame(({ gl, camera }) => {
    gl.setRenderTarget(renderTarget.current);
    gl.render(sceneRef.current, camera);
    gl.setRenderTarget(null);
  });

  return (
    <scene ref={sceneRef}>
      <EnvironmentLighting />
      <primitive key={"rt2"} object={scene} />
    </scene>
  );
}
