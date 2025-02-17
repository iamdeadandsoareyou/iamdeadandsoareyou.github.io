import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Quaternion, Vector3 } from "three"; // Import Quaternion and Vector3
import { suspend } from "suspend-react";
import { geometry } from "maath";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import "@react-three/fiber"
extend(geometry);

const HelveticaNeueBold = import("/fonts/HelveticaNeueCondensedBold.woff");

//function is currently not exactly making things that much more readable but is necessary for later inclusion of other features
function openLink(page_url) {
    return window.open(page_url);
}


function Box({ isPointerDown, ...props }) {
    const meshRef = useRef();
    const { mouse } = useThree();
    const moveSpeedX = useRef(0);
    const moveSpeedY = useRef(0);

    const moveSpeedInitial = 3; // Initial speed
    const dampingFactor = 0.95; // inertia damping
    const minSpeedThreshold = 0.001; /* need to eventually stop the cube. threshold to decide if
    the cube is moving slow enough where stopping it would look smooth removal would create an everspinning cube
    editing to higher values make creat a cube with jerky stopping*/


    const yVector = new Vector3(0, 1, 0); // Y-axis
    const xVector = new Vector3(1, 0, 0); // X-axis

    //runs every frame makes an acceleration effect
    useFrame((state, delta) => {
        const mesh = meshRef.current;

        if (isPointerDown) {
            //changes speed of cube per mouse x and y
            moveSpeedX.current = -mouse.x * moveSpeedInitial;
            moveSpeedY.current = -mouse.y * moveSpeedInitial;

            // how far you move the mouse creates a slight deviation in speed feels pretty intuitive
            const deltaX = new Quaternion().setFromAxisAngle(
                yVector,
                -moveSpeedX.current * delta
            );
            const deltaY = new Quaternion().setFromAxisAngle(
                xVector,
                moveSpeedY.current * delta
            );

            /*applies speed to x and y vector every frame creating an acceleration feeling*/
            mesh.quaternion.multiplyQuaternions(deltaX, mesh.quaternion);
            mesh.quaternion.multiplyQuaternions(deltaY, mesh.quaternion);
        } else {
             /* this is necessary in order to avoid jerky motionjust didn't feel right without this bit of code*/
            // checks if the currrent movement speed is fast enough to where it still would need to apply damping
            if (
                Math.abs(moveSpeedX.current) > minSpeedThreshold ||
                Math.abs(moveSpeedY.current) > minSpeedThreshold
            ) {
                // damps speed by a constant may add getter and setter
                // for damping factor and speed eventually not necessary now though
                /* another not is that we are actually multiplying by less than a whole integer which actually divides
                the speed every frame once mouse is released
                 */
                moveSpeedX.current *= dampingFactor;
                moveSpeedY.current *= dampingFactor;

                //slows the cube by applying the new move speed which is less than 1 whole integer to the y vector over
                // a delta
                const deltaX = new Quaternion().setFromAxisAngle(
                    yVector,
                    -moveSpeedX.current * delta
                );
                const deltaY = new Quaternion().setFromAxisAngle(
                    xVector,
                    moveSpeedY.current * delta
                );
                mesh.quaternion.multiplyQuaternions(deltaX, mesh.quaternion);
                mesh.quaternion.multiplyQuaternions(deltaY, mesh.quaternion);
            }
        }
    });

    return (
        <group {...props} ref={meshRef}>
            <Text
                font={suspend(HelveticaNeueBold).default}
                fontSize={0.2}
                anchorY="center"
                anchorX="center"
                lineHeight={0.8}
                position={[0, 0.2, 0.7]}
                rotation={[0, 0, 0]}
                material-toneMapped={false}
                onClick={(event) => openLink("https://soundcloud.com/swimisdead")}
            >
                [listen]
            </Text>

            <Text
                font={suspend(HelveticaNeueBold).default}
                fontSize={0.2}
                anchorY="center"
                anchorX="center"
                lineHeight={0.8}
                position={[0, 0.2, -0.7]}
                rotation={[0, 3.14, 0]}
                material-toneMapped={false}
                onClick={(event) => openLink("https://www.youtube.com/@SWIMisdead")}
            >
                [watch]
            </Text>

            <Text
                font={suspend(HelveticaNeueBold).default}
                fontSize={0.2}
                anchorY="center"
                anchorX="center"
                lineHeight={0.8}
                position={[0.7, 0.2, 0]}
                rotation={[0, 1.585, 0]}
                material-toneMapped={false}
                onClick={(event) => openLink("https://jay-swim.bandcamp.com/releases")}
            >
                [buy]
            </Text>

            <Text
                font={suspend(HelveticaNeueBold).default}
                fontSize={0.2}
                anchorY="center"
                anchorX="center"
                lineHeight={0.8}
                position={[-0.7, 0.2, 0]}
                rotation={[0, -1.54, 0]}
                material-toneMapped={false}
                onClick={(event) => openLink("https://x.com/DeeJay_Swim")}
            >
                [read]
            </Text>

            <Text
                font={suspend(HelveticaNeueBold).default}
                fontSize={0.2}
                anchorY="center"
                anchorX="center"
                lineHeight={0.8}
                position={[0, 0.7, -0.2]}
                rotation={[-1.55, 0, 0]}
                material-toneMapped={false}
                onClick={(event) => openLink("https://www.instagram.com/swimisdead/")}
            >
                [nopoint]
            </Text>

            <Text
                font={suspend(HelveticaNeueBold).default}
                fontSize={0.2}
                anchorY="center"
                anchorX="center"
                lineHeight={0.8}
                position={[0, -0.7, 0.2]}
                rotation={[1.55, 0, 0]}
                material-toneMapped={false}
                onClick={(event) => openLink("https://ko-fi.com/urdeadlol")}
            >
                [help me float]
            </Text>

            <mesh scale={1}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={"purple"} />
            </mesh>
        </group>
    );
}

function Floating_Menu() {
    const [isPointerDown, setIsPointerDown] = useState(false);

    //need to detect whenever the user pushes mouse 1 and lifts mouse
    useEffect(() => {
        const handlePointerDown = () => setIsPointerDown(true);
        const handlePointerUp = () => setIsPointerDown(false);

        //sets up event listeners for if someone presses down mouse 1 withint the window or not then sets pointerdown state
        window.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("pointerup", handlePointerUp);

        //needs to clean up and remove those listeners when we remove the component
        return () => {
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, []);

    return (
        <Canvas>
            <ambientLight intensity={0.5}/>
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <Box position={[0, 0, 0]} isPointerDown={isPointerDown} />
            <EffectComposer>
                <Bloom />
            </EffectComposer>
        </Canvas>
    );
}

export default Floating_Menu;