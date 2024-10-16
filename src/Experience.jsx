import { useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience() {
    const hamburger = useGLTF('./hamburger.glb')

    const cube = useRef()

    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2
    })

    const eventHandlre = () => {
        cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
    }

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        {/* Come Occludere un oggetto per far passare il raycast click/pointer attraverso */}
        <mesh
            position-x={- 2}
            onClick={(e) => e.stopPropagation()}
            onPointerEnter={(e) => e.stopPropagation()}
        >
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh
            ref={cube}
            position-x={2}
            scale={1.5}
            onClick={(e) => {
                eventHandlre()
                e.stopPropagation()
            }}
            onPointerEnter={() => {
                document.body.style.cursor = 'pointer'
            }}
            onPointerLeave={() => {
                document.body.style.cursor = 'default'
            }}
        //onContextMenu : right click, lon press on mobile
        //onDoubleClick
        //onPointerOver, onPointerEnter, onPointerMove, onPointerMissed, onPointerLeave 

        >
            <boxGeometry />
            <meshStandardMaterial />
        </mesh>

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <primitive
            object={hamburger.scene}
            scale={0.25}
            position-y={0.5}
            onClick={(e) => {
                console.log(e.object.name);
                e.stopPropagation()
            }}
        />

    </>
}