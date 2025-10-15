import { Float, Text3D } from "@react-three/drei";
import { useAtomValue, useSetAtom } from "jotai";
import { deviceAtom, showGalaxyBackgroundAtom } from "../GlobalState";
import { formatName, generateRandomNumberInRange } from "../helpers/helpers";
import Rocket from "../meshes/Rocket";
import Earth from "../meshes/Earth";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Ufo from "../meshes/Ufo";
import * as THREE from 'three';
import layout from "../layout";
import ShareLinkButton from "./ShareLinkButton";
import PlayAgainButton from "./PlayAgainButton";
import DiscordButton from "./DiscordButton";
import useResponsiveSetting from "../hooks/useResponsiveSetting";
import { useSpring, animated } from "@react-spring/three";

export default function RocketsWin2Preview({ position }) {

  // Hooks
  useResponsiveSetting();
  const device = useAtomValue(deviceAtom)

  // State
  const teamRockets = { players: [] }
  const teamUfos = { players: [] }
  let rocketsScore = 4
  let ufosScore = 0
  const earth = useRef()
  const rocket0 = useRef()
  const rocket1 = useRef()
  const rocket2 = useRef()
  const rocket3 = useRef()

  // Animation - Ufos lose
  const ufos = []
  const numUfos = 5
  const resetTime = 17
  const shiftTime = resetTime / numUfos
  for (let i = 0; i < numUfos; i++) {
    ufos.push(useRef())
  }

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    rocket0.current.position.y = Math.cos(time) * 0.05
    rocket1.current.position.y = Math.cos(time) * 0.05
    rocket2.current.position.y = Math.cos(time) * 0.05
    rocket2.current.position.x = Math.sin(time) * 0.05
    rocket3.current.position.y = Math.cos(time) * 0.05

    // Ufos
    for (let i = 0; i < numUfos; i++) {
      let t = (time + i * shiftTime) % resetTime
      let timeSlowed = t / 2
      const ufo = ufos[i]
      if (ufo.current) {
        // scale
        if (t < 1) {
          ufo.current.scale.x = Math.min(t, 1)
          ufo.current.scale.y = Math.min(t, 1)
          ufo.current.scale.z = Math.min(t, 1)
        } else if (t < (resetTime - 1)) {
          // resetTime - 1 = max
          // resetTime - 1 - t
          // 1 - 0.5 * ((t - 1) / (resetTime - 1 - 1))
          ufo.current.scale.x = 1 - 0.5 * ((t - 1) / (resetTime - 1 - 1))
          ufo.current.scale.y = 1 - 0.5 * ((t - 1) / (resetTime - 1 - 1))
          ufo.current.scale.z = 1 - 0.5 * ((t - 1) / (resetTime - 1 - 1))
        } else {
          ufo.current.scale.x = Math.max(resetTime - t - 0.5, 0)
          ufo.current.scale.y = Math.max(resetTime - t - 0.5, 0)
          ufo.current.scale.z = Math.max(resetTime - t - 0.5, 0)
        }
        ufo.current.position.x = Math.cos(timeSlowed) * 5 * Math.exp(-0.2 * timeSlowed)
        ufo.current.position.y = -Math.sin(timeSlowed) * 5 * Math.exp(-0.2 * timeSlowed)
        ufo.current.position.z = 0
        // ufo.current.rotation.x = Math.PI/2 // removing this makes scene awesome
        ufo.current.rotation.y = timeSlowed
        ufo.current.rotation.x = timeSlowed / 8
      }
    }
  })

  const [ springs, api ] = useSpring(() => ({
    from: {
      scale: 0
    }
  }))
  useEffect(() => {
    api.start({
      from: {
        scale: 0
      },
      to: {
        scale: 1
      },
      config: {
        tension: 70, 
        friction: 20,
      }
    })
  }, [])

  const meteorShaderColor = new THREE.Color();
  meteorShaderColor.setHSL(0.05, 0.7, 0.4)
  return <animated.group position={position} scale={springs.scale}>
    <Text3D name='title'
      font="/fonts/Luckiest Guy_Regular.json"
      position={layout[device].rocketsWinScene.title.position}
      rotation={layout[device].rocketsWinScene.title.rotation}
      size={layout[device].rocketsWinScene.title.fontSize} 
      height={0.003} 
      lineHeight={0.7}
    >
      {layout[device].rocketsWinScene.title.text}
      <meshStandardMaterial color='yellow'/>
    </Text3D>
    {/* team score and names */}
    <group name='teams' 
    position={layout[device].rocketsWinScene.teams.position}
    scale={layout[device].rocketsWinScene.teams.scale}
    >
      <group name='score' position={[0, 0, 0]}>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4} 
          height={0.003} 
          position={[0, 0, 0]} // camera is shifted up (y-axis)
        >
          {`ROCKETS   ${rocketsScore}`}
          <meshStandardMaterial color='red'/>
        </Text3D>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4} 
          height={0.003} 
          position={[3, 0, 0]} // camera is shifted up (y-axis)
        >
          {`:`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4} 
          height={0.003} 
          position={[3.1, 0, 0]} // camera is shifted up (y-axis)
        >
          {`   ${ufosScore}   UFOS`}
          <meshStandardMaterial color='turquoise'/>
        </Text3D>
      </group>
      <group name='player-names' position={[0, -1.5, 0]}>
        <group name='player-names-rockets' position={[0, 0, 0]}>
          { teamRockets.players.map((value, index) => 
            <Text3D
              key={index}
              font="/fonts/Luckiest Guy_Regular.json"
              rotation={[-Math.PI/2, 0, 0]}
              size={0.4} 
              height={0.003} 
              position={[0, 0, 0]} // camera is shifted up (y-axis)
            >
              {formatName(value.name, 10)}
              <meshStandardMaterial color='red'/>
            </Text3D>
          )}
        </group>
        <group name='player-names-ufos' position={[3.9, 0, 0]}>
          { teamUfos.players.map((value, index) => 
            <Text3D
              key={index}
              font="/fonts/Luckiest Guy_Regular.json"
              rotation={[-Math.PI/2, 0, 0]}
              size={0.4} 
              height={0.003} 
              position={[0, 0, 0]} // camera is shifted up (y-axis)
            >
              {formatName(value.name, 10)}
              <meshStandardMaterial color='turquoise'/>
            </Text3D>
          )}
        </group>
      </group>
    </group>
    {/* scene 0 on the left */}
    { device === 'landscapeDesktop' && <group name='scene-0' 
    position={layout[device].rocketsWinScene.scene0.position} 
    scale={layout[device].rocketsWinScene.scene0.scale}>
      <group name='pieces' position={[0.4, -1.9, -1]} rotation={[-Math.PI/2, 0, 0]}>
        {ufos.map((value, index) => {
          return <group ref={value} key={index}>
            <Ufo position={[0, 0, 0]}/>
            {/* <Ufo position={[0, 0, 0]} smiling={false} scale={[4, 4, 4]}/> */}
          </group>
        })}
      </group>
    </group> }
    {/* scene 1 in the middle */}
    <group name='scene-1' 
    position={layout[device].rocketsWinScene.scene1.position}
    scale={layout[device].rocketsWinScene.scene1.scale}>
      <group name='earth-wrapper' rotation={[-Math.PI/2, 0, Math.PI/16]} ref={earth}>
        <Earth scale={2} rotation={[0, 0, 0]} position={[0, 0, 0]} showParticles={false}/>
      </group>
      <Float rotationIntensity={0.05} speed={5} floatIntensity={0.05}>
        <group ref={rocket0}>
          <Rocket onBoard position={[-1.2, 5, 0.9]} scale={2} rotation={[-Math.PI/12, 0, 0]}/>
        </group>
      </Float>
      <Float rotationIntensity={0.05} speed={5} floatIntensity={0.05}>
        <group ref={rocket1}>
          <Rocket onBoard position={[0.9, 5, 0.7]} scale={2} rotation={[-Math.PI/12, 0, 0]}/>
        </group>
      </Float>
      <Float rotationIntensity={0.05} speed={5} floatIntensity={0.05}>
        <group ref={rocket2}>
          <Rocket onBoard position={[-1.3, 5, 3.2]} scale={2} rotation={[-Math.PI/12, 0, 0]}/>
        </group>
      </Float>
      <Float rotationIntensity={0.05} speed={5} floatIntensity={0.05}>
        <group ref={rocket3}>
          <Rocket onBoard position={[0.7, 5, 3]} scale={2} rotation={[-Math.PI/12, 0, 0]}/>
        </group>
      </Float>
    </group>
    {/* room id and buttons */}
    <group name='action-buttons' 
    position={layout[device].rocketsWinScene.actionButtons.position} 
    scale={layout[device].rocketsWinScene.actionButtons.scale}>
      { device === 'landscapeDesktop' && <group name='room-id' >
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.03} 
          position={layout[device].endSceneActionButtons.roomId.position}
        >
          ROOM ID: 9999
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group> }
      <PlayAgainButton 
      position={layout[device].endSceneActionButtons.playAgainButton.position} 
      rotation={layout[device].endSceneActionButtons.playAgainButton.rotation} 
      device={device}/>
      <ShareLinkButton 
      position={layout[device].endSceneActionButtons.shareLinkButton.position} 
      rotation={layout[device].endSceneActionButtons.shareLinkButton.rotation} 
      device={device}/>
      <DiscordButton
      position={layout[device].endSceneActionButtons.discordButton.position}
      rotation={layout[device].endSceneActionButtons.discordButton.rotation}
      device={device}/>
    </group>
  </animated.group>
}