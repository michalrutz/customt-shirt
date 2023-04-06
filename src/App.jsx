import { Canvas, useFrame } from "@react-three/fiber";
import { AccumulativeShadows, Environment, OrbitControls, RandomizedLight, useGLTF } from "@react-three/drei";
import { Customizer } from "./pages/Customizer";
import { Home } from "./pages/Home";
import { useEffect, useRef, useState } from "react";
import { BoxGeometry } from "three";
import * as THREE from "three"

useGLTF.preload( "./shirt_baked_collapsed.glb" )


export function App() {
  const [ touch, setTouch ] = useState(false)
  const [ color, setColor ] = useState("gray")


function checkIfTouch (setter)  {
    window.addEventListener( "touchstart", ()=> { setter(true)} ) ;
    return () => { window.removeEventListener("touchstart", window); 
    console.log("touchstart clean up") }
};
function setOnResize( setter ) {
  window.addEventListener( "resize", () => { setter(false) ; checkIfTouch(setter)} )
}

  useEffect( () => checkIfTouch(setTouch), []);
  useEffect( () => setOnResize(setTouch) , []);


  return(
    <>
      <Canvas
        camera={ {position: [0, 0.0, 0.8]  }}
        shadows
        gl={ {antilasing:true} }
      >
        <spotLight 
          intensity={0.5} castShadow 
          position={[0.5, 1 , 3 ]} lookAt={[0,0,0]} 
          color={"white"}
        />
        <spotLight 
          intensity={0.5}  
          position={[ 3, 1 , -0.2 ]} lookAt={[0,0,0]} 
          color={"red"}
        />
        <spotLight 
          intensity={0.5}  
          position={[ -2, 1 , -0.2 ]} lookAt={[0,0,0]} 
          color={"green"}
        />
        <Environment preset="city"/>
          <Shirt color={color}/>
          <Backdrop/>
        <OrbitControls
          enableZoom={ window.ontouchstart ? true : false }
          enabled ={touch}
          maxPolarAngle={Math.PI/2+Math.PI/6} minPolarAngle={Math.PI/2-Math.PI/3}
          maxAzimuthAngle={0+Math.PI/3}       minAzimuthAngle={0-Math.PI/3}
        />
      </Canvas>
      <Home/>
      <Customizer color={color} setter={setColor} />
    </>
  )
}

function Shirt ({color}) {
  const {nodes, materials} = useGLTF("./shirt_baked_collapsed.glb");
  const refShirt = useRef();
  const startingPoint = Date.now()
  useFrame( ()=> {
    window.addEventListener( "mousemove", (e)=> {
      refShirt.current.rotation.y = Math.sin((e.clientX/window.innerWidth-0.5)*4 )*2
      refShirt.current.rotation.x = Math.max(Math.sin( -(e.clientY/window.innerHeight-0.5)*4 )/2, 0.1) 
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
    >
      <meshStandardMaterial side={ THREE.DoubleSide } color={color}/> 
    </mesh>
  )
}

function Backdrop(params) {
  return(
    <mesh position= { [0,0,-0.5] } receiveShadow>
      <planeGeometry/>
      <meshStandardMaterial color={"rgb(255, 255, 255)"} /> 
    </mesh>
  )
}
