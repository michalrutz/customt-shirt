import { Canvas, useFrame } from "@react-three/fiber";
import { AccumulativeShadows, Environment, OrbitControls, RandomizedLight, useGLTF } from "@react-three/drei";
import { Customizer } from "./pages/Customizer";
import { Home } from "./pages/Home";
import { useRef } from "react";
import { BoxGeometry } from "three";

useGLTF.preload( "./shirt_baked_collapsed.glb" )

export function App() {

  return(
    <>
      <Canvas
        camera={ {position: [0,0.1,1]  }}
        shadows
      >
        <ambientLight intensity={1}  />
        <spotLight 
          intensity={1} castShadow penumbra={2} decay={1}
          position={[0.2, 0.1 ,3 ]} lookAt={[0,0,0]} 
          color={"white"}
        />
        <spotLight 
          intensity={2} 
          position={[2, 2 ,-2]} lookAt={[0,0,0]} 
          color={"darkred"}
        />
        <spotLight 
          intensity={2} 
          position={[-2, 2 ,-2]} lookAt={[0,0,0]} 
          color={"darkblue"}
        />
        <Environment preset="city"/>
        <group>
          <Shirt/>
          <Backdrop/>

        </group>
        
        <OrbitControls
          enableZoom={ window.ontouchstart ? true : false }
          //enabled ={ window.ontouchstart ? true : false }
          maxPolarAngle={Math.PI/2+Math.PI/6} minPolarAngle={Math.PI/2-Math.PI/3}
          maxAzimuthAngle={0+Math.PI/3}       minAzimuthAngle={0-Math.PI/3}
        />
      </Canvas>
      <Home/>
      <Customizer/>
    </>
  )
}

function Shirt () {
  const {nodes, materials} = useGLTF("./shirt_baked_collapsed.glb");
  const refShirt = useRef();
  const startingPoint = Date.now()
  useFrame( ()=> {
    window.addEventListener( "mousemove", (e)=> {
      refShirt.current.rotation.y = Math.sin(-(1-(e.clientX/window.innerWidth)*2))
      refShirt.current.rotation.x = Math.sin(((e.clientY/window.innerHeight)*4))/2

      console.log(e)
    })
    let timeElapsed = Date.now()-startingPoint
    //refShirt.current.rotation.y = Math.sin((timeElapsed)/1000)/8  
    //refShirt.current.rotation.x = Math.cos((timeElapsed)/900)/12 
  } 
  )

  return (
    <mesh
          ref = {refShirt}          
          geometry={nodes.T_Shirt_male.geometry} 
          castShadow 
          material={materials.lambert1}
        >
    </mesh>
  )
}

function Backdrop(params) {
  return(
    <mesh position= { [0,0,-0.3] } castShadow receiveShadow>
      <planeGeometry/>
      <meshStandardMaterial color={"rgb(255, 255, 255)"}/>
      
    </mesh>
  )
}