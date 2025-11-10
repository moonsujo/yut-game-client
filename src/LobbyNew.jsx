// js
import { useEffect, useMemo, useRef, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import layout from "./dictionaries/layout.js";
import { useSpring, animated } from '@react-spring/three';

import GameCamera from "./sceneSetUp/GameCamera.jsx";
import DisconnectModal from "./components/DisconnectModal.jsx";
import JoinTeamModal from "./components/JoinTeamModal.jsx";
import * as THREE from 'three';

// three js
// import { Leva, useControls } from "leva"
import { Perf } from 'r3f-perf'

// server
import { socket } from "./SocketManager.jsx";
import { useParams } from "wouter";
import { 
  deviceAtom, 
  readyToStartAtom, 
  hostAtom, 
  clientAtom,
  joinTeamAtom,
  teamsAtom,
  guestBeingEdittedAtom,
  seatChosenAtom,
  portraitLobbySelectionAtom,
  landscapeLobbyThirdSectionSelectionAtom,
  blueMoonBrightnessAtom,
  audioVolumeAtom,
} from "./GlobalState.jsx";
import { Center, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import HowToPlay from "./components/HowToPlay.jsx";

// react spring
import { MeshDistortMaterial } from '@react-three/drei'
import useResponsiveSetting from "./hooks/useResponsiveSetting.jsx";
import MeteorsRealShader from "./shader/meteorsReal/MeteorsRealShader.jsx";
import MeshColors from "./components/MeshColors.jsx";
import QrCode3d from "./components/QRCode3D.jsx";
import BlueMoon from "./meshes/BlueMoon.jsx";
import YootDisplay from "./components/YootDisplay.jsx";
import Star from "./meshes/Stars/Star.jsx";
import Rocket from "./meshes/Rocket.jsx";
import Ufo from "./meshes/Ufo.jsx";
import { formatName } from "./logicHelpers/helpers.js";
import GameRules from "./components/GameRules.jsx";
import useSoundEffectsPlayer from "./soundPlayers/useSoundEffectsPlayer.jsx";
import SeatStar from "./meshes/Stars/SeatStar.jsx";
import AudioButton from "./soundPlayers/AudioButton.jsx";
import YouStars from "./components/YouStars.jsx";
import { sendLog } from './api';
import MilkyWayNew from "./shader/milkyway/MilkyWayNew.jsx";

export default function LobbyNew() {

  useResponsiveSetting();
  const device = useAtomValue(deviceAtom)
  const params = useParams();
  const setBlueMoonBrightness = useSetAtom(blueMoonBrightnessAtom)
  const { playSoundEffect } = useSoundEffectsPlayer()

  useEffect(() => {
    sendLog('pageView', { page: 'lobby' });
  }, [])

  function PlayersParty({ position=[0,0,0], scale=0.7 }) {
    const host = useAtomValue(hostAtom)
    const client = useAtomValue(clientAtom)  
    const [guestBeingEditted, setGuestBeingEditted] = useAtom(guestBeingEdittedAtom)
    const [seatChosen, setSeatChosen] = useAtom(seatChosenAtom)

    // #region animation
    const partyRef = useRef()
    const rocket0 = useRef()
    const rocket1 = useRef()
    const rocket2 = useRef()
    const rocket3 = useRef()
    const ufo0 = useRef()
    const ufo1 = useRef()
    const ufo2 = useRef()
    const ufo3 = useRef()
    const shipRefs = [rocket0, rocket1, rocket2, rocket3, ufo0, ufo1, ufo2, ufo3]
    const radius = 1.6
    const radius2 = 10.5
    const spring = useSpring({
      from: {
        boomScale: 0.6,
        boomScaleYut: 0.14
      },
      to: [
        {
          boomScale: 0.603,
          boomScaleYut: 0.145,
          config: {
            tension: 500,
            clamp: true
          }
        },
        {
          boomScale: 0.6,
          boomScaleYut: 0.14,
        },
      ],
      loop: true,
      delay: 234
    })
    useFrame((state) => {
      const time = state.clock.elapsedTime
      // partyRef.current.rotation.y = -time / 4;
      if (shipRefs[0].current) {
        shipRefs.forEach((value, index) => {
          if (value.current) {
            if (device === 'portrait') {
              value.current.position.x = Math.cos(-time / 3 + (Math.PI * 2 / shipRefs.length * index)) * radius2
              value.current.position.y = 5
              value.current.position.z = Math.sin(-time / 3 + (Math.PI * 2 / shipRefs.length * index)) * radius2 + 3.5
            } else {
              value.current.position.x = Math.cos((Math.PI * 2 / shipRefs.length * (index-1.5))) * radius2
              value.current.position.y = 5
              value.current.position.z = Math.sin((Math.PI * 2 / shipRefs.length * (index-1.5))) * radius2 + 2
            }
          }
        })
      }
    })
    // #endregion

    const setJoinTeam = useSetAtom(joinTeamAtom)

    function Seats({ position, scale }) {
      const teams = useAtomValue(teamsAtom)
      
      // Helper function to determine seat font size
      const getSeatFontSize = (seatTeam, seatIndex) => {
        
        // 2. If the seat is occupied by another player, size should be 0.7
        if (teams[seatTeam].players[seatIndex]) {
          return 0.7;
        }
        
        // 4. Otherwise (empty seat on opposite team), size should be 0.5
        return 0.5;
      };
      
      // #region Seat hover
      const [seat1Team0Hover, setSeat1Team0Hover] = useState(false)
      const [seat2Team0Hover, setSeat2Team0Hover] = useState(false)
      const [seat3Team0Hover, setSeat3Team0Hover] = useState(false)
      const [seat4Team0Hover, setSeat4Team0Hover] = useState(false)
      const [seat1Team1Hover, setSeat1Team1Hover] = useState(false)
      const [seat2Team1Hover, setSeat2Team1Hover] = useState(false)
      const [seat3Team1Hover, setSeat3Team1Hover] = useState(false)
      const [seat4Team1Hover, setSeat4Team1Hover] = useState(false)
      const [audioVolume, setAudioVolume] = useAtom(audioVolumeAtom)

      function handleSeat1Team0PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat1Team0Hover(true)
      }
      function handleSeat1Team0PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat1Team0Hover(false)
      }
      function handleSeat2Team0PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat2Team0Hover(true)
      }
      function handleSeat2Team0PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat2Team0Hover(false)
      }
      function handleSeat3Team0PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat3Team0Hover(true)
      }
      function handleSeat3Team0PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat3Team0Hover(false)
      }
      function handleSeat4Team0PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat4Team0Hover(true)
      }
      function handleSeat4Team0PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat4Team0Hover(false)
      }
      function handleSeat1Team1PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat1Team1Hover(true)
      }
      function handleSeat1Team1PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat1Team1Hover(false)
      }
      function handleSeat2Team1PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat2Team1Hover(true)
      }
      function handleSeat2Team1PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat2Team1Hover(false)
      }
      function handleSeat3Team1PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat3Team1Hover(true)
      }
      function handleSeat3Team1PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat3Team1Hover(false)
      }
      function handleSeat4Team1PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat4Team1Hover(true)
      }
      function handleSeat4Team1PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat4Team1Hover(false)
      }
      // #endregion

      function handleSeatPointerDown(e, team, seatIndex) {
        e.stopPropagation()

        if (client.socketId === host.socketId) {
          if (client.team !== team && !teams[team].players[seatIndex]) {
            setSeatChosen([team, seatIndex])
          } else if (teams[team].players[seatIndex] && teams[team].players[seatIndex].socketId !== client.socketId) {
            const player = teams[team].players[seatIndex]
            setGuestBeingEditted({
              name: player.name,
              connectionState: player.connectedToRoom,
              isYou: false,
              isHost: false,
              team: player.team,
              status: player.status,
              type: player.type,
              _id: player._id,
            })
          } else {
            setSeatChosen([team, seatIndex])
          }
        } else if (client.team !== team) {
          setJoinTeam(team)
        }
        
        playSoundEffect('/sounds/effects/button-click.mp3', audioVolume)
      }

      // Players are in seat by their index in the teams[team].players array
      return <group position={position} scale={scale}>
        <animated.group 
        name='rocket-seat-0'
        scale={0.6} 
        position={[
          -Math.cos(Math.PI * 2 / 8 + Math.PI/8) * radius, 
          5, 
          -Math.sin(Math.PI * 2 / 8 + Math.PI/8) * radius - 0.5
        ]}>
          { teams[0].players[0] && host.socketId === teams[0].players[0].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[0].players[0] && client.socketId === teams[0].players[0].socketId && <YouStars team={0} position={[-7, 0, -0.5]}/> }
          { !teams[0].players[0] && <SeatStar colorStart='#ffff00' colorFinish='#bc7a00' scale={client.team === -1 ? 0.6 : 0.3}/> }
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[ -6.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={getSeatFontSize(0, 0)}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[0].players[0] ? formatName(teams[0].players[0].name, 15) : `CLICK TO SIT`}
            <meshStandardMaterial color={ (teams[0].players[0] && !teams[0].players[0].connectedToRoom) ? 'grey' : seat1Team0Hover ? 'orange' : 'red' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[-3.2, 0, 0]} 
            scale={[7.8, 0.01, 1.5]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat1Team0Hover ? 'orange' : 'red' } transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[-3.2, 0, 0]} 
            scale={[7.7, 0.02, 1.4]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
              name='wrapper' 
              position={[-3.2, 0, 0]} 
              scale={[7.8, 0.02, 1.3]}
              onPointerEnter={e => handleSeat1Team0PointerEnter(e)}
              onPointerLeave={e => handleSeat1Team0PointerLeave(e)}
              onPointerDown={e => handleSeatPointerDown(e, 0, 0)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='rocket-seat-1'
        scale={0.6} 
        position={[
          -Math.cos(Math.PI * 2 / 8 - Math.PI/8) * radius, 
          5, 
          -Math.sin(Math.PI * 2 / 8 - Math.PI/8) * radius
        ]}>
          { teams[0].players[1] && host.socketId === teams[0].players[1].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[0].players[1] && client.socketId === teams[0].players[1].socketId && <YouStars team={0} position={[-7, 0, -0.5]}/> }
          { !teams[0].players[1] && <SeatStar colorStart='#ffff00' colorFinish='#bc7a00' scale={client.team === -1 ? 0.6 : 0.3} /> }
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[ -6.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={getSeatFontSize(0, 1)}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[0].players[1] ? formatName(teams[0].players[1].name, 15) : client.team === -1 ? `CLICK TO SIT` : `OPEN SEAT`}
            <meshStandardMaterial color={ (teams[0].players[1] && !teams[0].players[1].connectedToRoom) ? 'grey' : seat2Team0Hover ? 'orange' : 'red' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[-3.2, 0, 0]} 
            scale={[7.8, 0.01, 1.5]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat2Team0Hover ? 'orange' : 'red' } transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[-3.2, 0, 0]} 
            scale={[7.7, 0.02, 1.4]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
            name='wrapper' 
            position={[-3.2, 0, 0]} 
            scale={[7.8, 0.02, 1.3]}
            onPointerEnter={e => handleSeat2Team0PointerEnter(e)}
            onPointerLeave={e => handleSeat2Team0PointerLeave(e)}
            onPointerDown={e => handleSeatPointerDown(e, 0, 1)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='rocket-seat-2'
        scale={0.6} 
        position={[
          -Math.cos(0 - Math.PI/8) * radius, 
          5, 
          -Math.sin(0 - Math.PI/8) * radius + 0.1
        ]}>
          { teams[0].players[2] && host.socketId === teams[0].players[2].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[0].players[2] && client.socketId === teams[0].players[2].socketId && <YouStars team={0} position={[-7, 0, -0.5]}/> }
          { !teams[0].players[2] && <SeatStar colorStart='#ffff00' colorFinish='#bc7a00' scale={client.team === -1 ? 0.6 : 0.3}/> }
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[ -6.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={getSeatFontSize(0, 2)}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[0].players[2] ? formatName(teams[0].players[2].name, 15) : client.team === -1 ? `CLICK TO SIT` : `OPEN SEAT`}
            <meshStandardMaterial color={ (teams[0].players[2] && !teams[0].players[2].connectedToRoom) ? 'grey' : seat3Team0Hover ? 'orange' : 'red' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[-3.2, 0, 0]} 
            scale={[7.8, 0.01, 1.5]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat3Team0Hover ? 'orange' : 'red' } transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[-3.2, 0, 0]} 
            scale={[7.7, 0.02, 1.4]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
            name='wrapper' 
            position={[-2.2, 0, 0]} 
            scale={[7.8, 0.02, 1.5]}
            onPointerEnter={e => handleSeat3Team0PointerEnter(e)}
            onPointerLeave={e => handleSeat3Team0PointerLeave(e)}
            onPointerDown={e => handleSeatPointerDown(e, 0, 2)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='rocket-seat-3'
        scale={0.6} 
        position={[
          -Math.cos(-Math.PI * 2 / 8 - Math.PI/8) * radius - 0.2, 
          5, 
          -Math.sin(-Math.PI * 2 / 8 - Math.PI/8) * radius + 0.6
        ]}>
          { teams[0].players[3] && host.socketId === teams[0].players[3].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[0].players[3] && client.socketId === teams[0].players[3].socketId && <YouStars team={0} position={[-7, 0, -0.5]}/> }
          { !teams[0].players[3] && <SeatStar colorStart='#ffff00' colorFinish='#bc7a00' scale={client.team === -1 ? 0.6 : 0.3}/> }
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[ -6.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={getSeatFontSize(0, 3)}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[0].players[3] ? formatName(teams[0].players[3].name, 15) : client.team === -1 ? `CLICK TO SIT` : `OPEN SEAT`}
            <meshStandardMaterial color={ (teams[0].players[3] && !teams[0].players[3].connectedToRoom) ? 'grey' : seat4Team0Hover ? 'orange' : 'red' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[-3.2, 0, 0]} 
            scale={[7.8, 0.01, 1.5]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat4Team0Hover ? 'orange' : 'red' } transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[-3.2, 0, 0]} 
            scale={[7.7, 0.02, 1.4]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
            name='wrapper' 
            position={[-3.2, 0, 0]} 
            scale={[7.8, 0.02, 1.5]}
            onPointerEnter={e => handleSeat4Team0PointerEnter(e)}
            onPointerLeave={e => handleSeat4Team0PointerLeave(e)}
            onPointerDown={e => handleSeatPointerDown(e, 0, 3)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='ufo-seat-0'
        scale={0.6} 
        position={[
          Math.cos(Math.PI * 2 / 8 + Math.PI/8) * radius, 
          5, 
          -Math.sin(Math.PI * 2 / 8 + Math.PI/8) * radius - 0.5
        ]}>
          { teams[1].players[0] && host.socketId === teams[1].players[0].socketId && <Star scale={0.45} position={[6.4, 0, 0]} color='yellow'/> }
          { teams[1].players[0] && client.socketId === teams[1].players[0].socketId && <YouStars team={1} position={[-0.5, 0, -0.5]}/> }
          { !teams[1].players[0] && <SeatStar colorStart='#ffff00' colorFinish='turquoise' scale={client.team === -1 ? 0.6 : 0.3} position={[6.4, 0, 0]}/> }
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[ -0.3, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={getSeatFontSize(1, 0)}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[1].players[0] ? formatName(teams[1].players[0].name, 12) : client.team === -1 ? `CLICK TO SIT` : `OPEN SEAT`}
            <meshStandardMaterial color={ (teams[1].players[0] && !teams[1].players[0].connectedToRoom) ? 'grey' : seat1Team1Hover ? 'green' : 'turquoise' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[3.2, 0, 0]} 
            scale={[7.8, 0.01, 1.5]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat1Team1Hover ? 'green' : 'turquoise' } transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[3.2, 0, 0]} 
            scale={[7.7, 0.02, 1.4]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
            name='wrapper' 
            position={[3.2, 0, 0]} 
            scale={[7.8, 0.02, 1.5]}
            onPointerEnter={e => handleSeat1Team1PointerEnter(e)}
            onPointerLeave={e => handleSeat1Team1PointerLeave(e)}
            onPointerDown={e => handleSeatPointerDown(e, 1, 0)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='ufo-seat-1'
        scale={0.6} 
        position={[
          Math.cos(Math.PI * 2 / 8 - Math.PI/8) * radius, 
          5, 
          -Math.sin(Math.PI * 2 / 8 - Math.PI/8) * radius
        ]}>
          { teams[1].players[1] && host.socketId === teams[1].players[1].socketId && <Star scale={0.45} position={[6.4, 0, 0]} color='yellow'/> }
          { teams[1].players[1] && client.socketId === teams[1].players[1].socketId && <YouStars team={1} position={[-0.5, 0, -0.5]}/>}
          { !teams[1].players[1] && <SeatStar colorStart='#ffff00' colorFinish='turquoise' scale={client.team === -1 ? 0.6 : 0.3} position={[6.4, 0, 0]}/> }
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[ -0.3, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={getSeatFontSize(1, 1)}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[1].players[1] ? formatName(teams[1].players[1].name, 15) : client.team === -1 ? `CLICK TO SIT` : `OPEN SEAT`}
            <meshStandardMaterial color={ (teams[1].players[1] && !teams[1].players[1].connectedToRoom) ? 'grey' : seat2Team1Hover ? 'green' : 'turquoise' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[3.2, 0, 0]} 
            scale={[7.8, 0.01, 1.5]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat2Team1Hover ? 'green' : 'turquoise' } transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[3.2, 0, 0]} 
            scale={[7.7, 0.02, 1.4]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
            name='wrapper' 
            position={[3.2, 0, 0]} 
            scale={[7.8, 0.02, 1.5]}
            onPointerEnter={e => handleSeat2Team1PointerEnter(e)}
            onPointerLeave={e => handleSeat2Team1PointerLeave(e)}
            onPointerDown={e => handleSeatPointerDown(e, 1, 1)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='ufo-seat-2'
        scale={0.6} 
        position={[
          Math.cos(0 - Math.PI/8) * radius, 
          5, 
          -Math.sin(0 - Math.PI/8) * radius + 0.1
        ]}>
          { teams[1].players[2] && host.socketId === teams[1].players[2].socketId && <Star scale={0.45} position={[6.4, 0, 0]} color='yellow'/> }
          { teams[1].players[2] && client.socketId === teams[1].players[2].socketId && <YouStars team={1} position={[-0.5, 0, -0.5]}/>}
          { !teams[1].players[2] && <SeatStar colorStart='#ffff00' colorFinish='turquoise' scale={client.team === -1 ? 0.6 : 0.3} position={[6.4, 0, 0]}/> }
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[ -0.3, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={getSeatFontSize(1, 2)}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[1].players[2] ? formatName(teams[1].players[2].name, 15) : client.team === -1 ? `CLICK TO SIT` : `OPEN SEAT`}
            <meshStandardMaterial color={ (teams[1].players[2] && !teams[1].players[2].connectedToRoom) ? 'grey' : seat3Team1Hover ? 'green' : 'turquoise' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[3.2, 0, 0]} 
            scale={[7.8, 0.01, 1.5]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat3Team1Hover ? 'green' : 'turquoise' } transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[3.2, 0, 0]} 
            scale={[7.7, 0.02, 1.4]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
            name='wrapper' 
            position={[3.2, 0, 0]} 
            scale={[7.8, 0.02, 1.5]}
            onPointerEnter={e => handleSeat3Team1PointerEnter(e)}
            onPointerLeave={e => handleSeat3Team1PointerLeave(e)}
            onPointerDown={e => handleSeatPointerDown(e, 1, 2)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='ufo-seat-3'
        scale={0.6} 
        position={[
          Math.cos(-Math.PI * 2 / 8 - Math.PI/8) * radius + 0.2, 
          5, 
          -Math.sin(-Math.PI * 2 / 8 - Math.PI/8) * radius + 0.6
        ]}>
          { teams[1].players[3] && host.socketId === teams[1].players[3].socketId && <Star scale={0.45} position={[6.4, 0, 0]} color='yellow'/> }
          { teams[1].players[3] && client.socketId === teams[1].players[3].socketId && <YouStars team={1} position={[-0.5, 0, -0.5]}/>}
          { !teams[1].players[3] && <SeatStar colorStart='#ffff00' colorFinish='turquoise' scale={client.team === -1 ? 0.6 : 0.3} position={[6.4, 0, 0]}/> }
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[ -0.3, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={getSeatFontSize(1, 3)}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[1].players[3] ? formatName(teams[1].players[3].name, 15) : client.team === -1 ? `CLICK TO SIT` : `OPEN SEAT`}
            <meshStandardMaterial color={ (teams[1].players[3] && !teams[1].players[3].connectedToRoom) ? 'grey' : seat4Team1Hover ? 'green' : 'turquoise' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[3.2, 0, 0]} 
            scale={[7.8, 0.01, 1.5]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat4Team1Hover ? 'green' : 'turquoise' } transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[3.2, 0, 0]} 
            scale={[7.7, 0.02, 1.4]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
            name='wrapper' 
            position={[3.2, 0, 0]} 
            scale={[7.8, 0.02, 1.5]}
            onPointerEnter={e => handleSeat4Team1PointerEnter(e)}
            onPointerLeave={e => handleSeat4Team1PointerLeave(e)}
            onPointerDown={e => handleSeatPointerDown(e, 1, 3)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
      </group>
    }

    function mapTeamToPlayerColor(team) {
      if (team === -1) {
        return '#9F9F9F'
      } else if (team === 0) {
        return 'red'
      } else if (team === 1) {
        return 'turquoise'
      }
    }

    // -1 team: spectator
    function EditOneGuest({ position=[0,0,0], scale=1 }) {  
      function CloseButton({ position, rotation, scale }) {
        const [hover, setHover] = useState(false)
        const audioVolume = useAtomValue(audioVolumeAtom)
    
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        function handlePointerDown(e) {
          e.stopPropagation()
          setGuestBeingEditted(null)
          playSoundEffect('/sounds/effects/button-click.mp3', audioVolume)
        }
    
        return <group position={position} rotation={rotation} scale={scale}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[1.55, 0.01, 0.55]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
            <mesh name='background-inner' scale={[1.45, 0.02, 0.45]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='background-wrapper' 
            scale={[1.55, 0.02, 0.55]}
            onPointerEnter={e=>handlePointerEnter(e)}
            onPointerLeave={e=>handlePointerLeave(e)}
            onPointerDown={e=>handlePointerDown(e)}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-0.63,0.02,0.14]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.26}
            height={0.01}
          >
            X CLOSE
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
      }
      function AssignHostButton({ position=[0,0,0] }) {
        const [hover, setHover] = useState(false);
        const audioVolume = useAtomValue(audioVolumeAtom)
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        function handlePointerDown(e) {
          e.stopPropagation()
          socket.emit('assignHost', { 
            roomId: params.id.toUpperCase(),
            clientId: client._id,
            userId: guestBeingEditted._id,
            team: guestBeingEditted.team,
            name: guestBeingEditted.name
          }, (response) => {
            if (response === 'success') {
              setGuestBeingEditted(null)
            }
          })
          playSoundEffect('/sounds/effects/button-click.mp3', audioVolume)
        }
        return <group name='assign-host-button' position={position}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[8.5, 0.01, 1]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
            <mesh name='background-inner' scale={[8.4, 0.02, 0.9]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='wrapper'
              onPointerEnter={e => handlePointerEnter(e)}
              onPointerLeave={e => handlePointerLeave(e)}
              onPointerDown={e => handlePointerDown(e)}
              scale={[8.5, 0.02, 1]}
            >
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-4.05,0.02,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            ASSIGN HOST
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
      }
      function KickButton({ position=[0,0,0] }) {
        const [hover, setHover] = useState(false);
        const audioVolume = useAtomValue(audioVolumeAtom)
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        function handlePointerDown(e) {
          e.stopPropagation()
          socket.emit('kick', { 
            roomId: params.id.toUpperCase(),
            clientId: client._id,
            team: guestBeingEditted.team,
            name: guestBeingEditted.name,
          }, (response) => {
            if (response === 'success') {
              setGuestBeingEditted(null)
            }
          })
          playSoundEffect('/sounds/effects/button-click.mp3', audioVolume)
        }
        return <group name='kick-button' position={position}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[8.5, 0.01, 1]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'red' }/>
            </mesh>
            <mesh name='background-inner' scale={[8.4, 0.02, 0.9]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='wrapper'
              onPointerEnter={e => handlePointerEnter(e)}
              onPointerLeave={e => handlePointerLeave(e)}
              onPointerDown={e => handlePointerDown(e)}
              scale={[8.5, 0.02, 1]}
            >
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-4.05,0.02,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            KICK
            <meshStandardMaterial color={ hover ? 'green' : 'red' }/>
          </Text3D>
        </group>
      }
      function SetSpectatorButton({ position=[0,0,0] }) {
        const [hover, setHover] = useState(false);
        const audioVolume = useAtomValue(audioVolumeAtom)
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        function handlePointerDown(e) {
          e.stopPropagation()
          // set player to spectator
          socket.emit('setTeam', {
            roomId: params.id.toUpperCase(),
            clientId: client._id,
            userId: guestBeingEditted._id,
            name: guestBeingEditted.name,
            currTeamId: guestBeingEditted.team,
            newTeamId: -1
          }, (response) => {
            if (response === 'success') {
              setGuestBeingEditted(null)
            }
          })
          playSoundEffect('/sounds/effects/button-click.mp3', audioVolume)
        }
        return <group name='set-spectator-button' position={position}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[8.5, 0.01, 1]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
            <mesh name='background-inner' scale={[8.4, 0.02, 0.9]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='wrapper'
              onPointerEnter={e => handlePointerEnter(e)}
              onPointerLeave={e => handlePointerLeave(e)}
              onPointerDown={e => handlePointerDown(e)}
              scale={[8.5, 0.02, 1]}
            >
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-4.05,0.02,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            SET SPECTATOR
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
      }
      function handlePointerEnter(e) {
        e.stopPropagation()
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
      }
      
      // position={[0, 0.02, (-0.8) + (1 + 0.1) * 0]}
      // position={[0, 0.02, (-0.8) + (1 + 0.1) * 1]}
      // position={[0, 0.02, (-0.8) + (1 + 0.1) * 2]}
      const seatModalButtons = []
      if (guestBeingEditted.type === 'ai') {
        seatModalButtons.push(<KickButton/>)
      } else {
        seatModalButtons.push(<SetSpectatorButton/>)
        seatModalButtons.push(<AssignHostButton/>)
        seatModalButtons.push(<KickButton/>)
      }
      const backgroundDimensions = {
        position: [0, 0, 0.1 + 0.5 * (seatModalButtons.length - 3.5)],
        scaleOuter: [9, 0.01, 1 * seatModalButtons.length + 1],
        scaleInner: [8.9, 0.02, 1 * seatModalButtons.length + 0.9]
      }

      return <group position={position} scale={scale}>
        {/* background */}
        <group name='background' position={backgroundDimensions.position}
          onPointerEnter={e=>handlePointerEnter(e)}
          onPointerLeave={e=>handlePointerLeave(e)}
        >
          <mesh name='background-outer' scale={backgroundDimensions.scaleOuter}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='yellow'/>
          </mesh>
          <mesh name='background-inner' scale={backgroundDimensions.scaleInner}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
        </group>
        {/* title */}
        <group name='title' position={[0.34, 0.02, -2.2]}>
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-4.6,0,0.7]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            EDIT
            <meshStandardMaterial color='yellow'/>
          </Text3D>
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-3.2,0,0.7]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            {guestBeingEditted.name}
            <meshStandardMaterial color={mapTeamToPlayerColor(guestBeingEditted.team)}/>
          </Text3D>
        </group>
        {/* navigation */}
        <CloseButton position={[3.5, 0.02, -1.725]}/>
        {/* action buttons */}
        { seatModalButtons.map((value, index) => {
          return <group position={[0, 0.02, 1 * index-0.8]} key={index}>
            {value}
          </group>
        }) }
      </group>
    }

    function SeatModal({ position, rotation, scale }) {
      function CloseButton({ position, rotation, scale }) {
        const [hover, setHover] = useState(false)
        const audioVolume = useAtomValue(audioVolumeAtom)
    
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        function handlePointerDown(e) {
          e.stopPropagation()
          setSeatChosen(null)
          playSoundEffect('/sounds/effects/button-click.mp3', audioVolume)
        }
    
        return <group position={position} rotation={rotation} scale={scale}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[1.55, 0.01, 0.55]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
            <mesh name='background-inner' scale={[1.45, 0.02, 0.45]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='background-wrapper' 
            scale={[1.55, 0.02, 0.55]}
            onPointerEnter={e=>handlePointerEnter(e)}
            onPointerLeave={e=>handlePointerLeave(e)}
            onPointerDown={e=>handlePointerDown(e)}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-0.63,0.02,0.14]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.26}
            height={0.01}
          >
            X CLOSE
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
      }
      function TakeSeatButton({ position, rotation, scale }) {
        const [hover, setHover] = useState(false)
        const audioVolume = useAtomValue(audioVolumeAtom)
    
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        function handlePointerDown(e) {
          e.stopPropagation()
          setJoinTeam(seatChosen[0])
          setSeatChosen(null)
          playSoundEffect('/sounds/effects/button-click.mp3', audioVolume)
        }
    
        return <group position={position} rotation={rotation} scale={scale}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[6.8, 0.01, 0.9]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
            <mesh name='background-inner' scale={[6.7, 0.02, 0.8]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='background-wrapper' 
            scale={[6.8, 0.02, 0.9]}
            onPointerEnter={e=>handlePointerEnter(e)}
            onPointerLeave={e=>handlePointerLeave(e)}
            onPointerDown={e=>handlePointerDown(e)}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-3.15,0.02,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            TAKE SEAT
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
      }
      function AddAIEZButton({ position, rotation, scale }) {
        const [hover, setHover] = useState(false)
    
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        async function handlePointerDown (e) {
          e.stopPropagation()
          setSeatChosen(null)
          // send 'add AI' event to server
          // must be host
          socket.emit('addAI', { roomId: params.id.toUpperCase(), clientId: client._id, team: seatChosen[0], level: 'random' })
        
          await sendLog('buttonClick', {
            button: 'addAIEZ'
          })
        }
    
        return <group position={position} rotation={rotation} scale={scale}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[6.8, 0.01, 0.9]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
            <mesh name='background-inner' scale={[6.7, 0.02, 0.8]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='background-wrapper' 
            scale={[6.8, 0.02, 0.9]}
            onPointerEnter={e=>handlePointerEnter(e)}
            onPointerLeave={e=>handlePointerLeave(e)}
            onPointerDown={e=>handlePointerDown(e)}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-3.15,0.02,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            ADD AI - EZ
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
      }
      function AddAISmartButton({ position, rotation, scale }) {
        const [hover, setHover] = useState(false)
        const audioVolume = useAtomValue(audioVolumeAtom)
    
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        async function handlePointerDown (e) {
          e.stopPropagation()
          setSeatChosen(null)
          // send 'add AI' event to server
          // must be host
          socket.emit('addAI', { roomId: params.id.toUpperCase(), clientId: client._id, team: seatChosen[0], level: 'smart' })
        
          await sendLog('buttonClick', { button: 'addAISmart' })
          
          playSoundEffect('/sounds/effects/add-ai-player.mp3', audioVolume)
        }

    
        return <group position={position} rotation={rotation} scale={scale}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[6.8, 0.01, 0.9]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
            <mesh name='background-inner' scale={[6.7, 0.02, 0.8]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='background-wrapper' 
            scale={[6.8, 0.02, 0.9]}
            onPointerEnter={e=>handlePointerEnter(e)}
            onPointerLeave={e=>handlePointerLeave(e)}
            onPointerDown={e=>handlePointerDown(e)}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-3.15,0.02,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            ADD AI
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
      }
      const seatModalButtons = [
        <TakeSeatButton/>,
        // <AddAIEZButton/>,
        <AddAISmartButton/>,
      ]
      const backgroundDimensions = {
        position: [0, 0, 0.1 + 0.5 * (seatModalButtons.length - 2)],
        scaleOuter: [7, 0.01, 1 * seatModalButtons.length + 1],
        scaleInner: [6.9, 0.02, 1 * seatModalButtons.length + 0.9]
      }

      return <group position={position} rotation={rotation} scale={scale}>
        {/* background */}
        <group name='background' position={backgroundDimensions.position}>
          <mesh name='background-outer' scale={backgroundDimensions.scaleOuter}>
          {/* <mesh name='background-outer' scale={[7, 0.01, 4.2]}> */}
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='yellow'/>
          </mesh>
          <mesh name='background-inner' scale={backgroundDimensions.scaleInner}>
          {/* <mesh name='background-inner' scale={[6.9, 0.02, 4.1]}> */}
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
        </group>
        {/* title */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-3.3, 0.02, -0.7]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          {`SEAT ${seatChosen[1]+1}`}
          <meshStandardMaterial color={ seatChosen[0] === 0 ? 'red' : 'turquoise' }/>
        </Text3D>
        {/* close button */}
        <CloseButton position={[2.45, 0.02, -0.95]} scale={1.2}/>
        { seatModalButtons.map((value, index) => {
          return <group position={[0, 0.02, 1 * index]} key={index}>
            {value}
          </group>
        }) }
      </group>
    }

    return <group scale={scale} position={position}>
      <BlueMoon scale={3.7} rotationSpeed={-0.2} position={[0, 0, 2]}/>
      <group ref={partyRef} scale={1.6} position={[0, 2, 4.3]}>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-3.2,5,-3]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.01}
          lineHeight={0.7}
        >
          {`TEAM\nROCKET`}
          <meshStandardMaterial color={ 'red' }/>
        </Text3D>
        <Rocket position={[-0.9,5,-3.5]}/>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[0.6,5,-3]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.01}
          lineHeight={0.7}
        >
          {`TEAM\nUFO`}
          <meshStandardMaterial color={ 'turquoise' }/>
        </Text3D>
        <Ufo position={[2.3,5,-2.3]}/>
        <YootDisplay scale={0.2} position={[-0.15, 5, 1.1]} rotation={[0, Math.PI/2, 0]}/>
        <Seats position={[0, 0, 1]} scale={1}/>
      </group>
      { device === 'portrait' && shipRefs.map((value, index) => {
        return (index < 4 ? <group ref={value} key={index}>
          <Rocket scale={1}/>
        </group> : <group ref={value} key={index}>
          <Ufo scale={1}/>
        </group>)
      })}
      {/* <SeatStatus/> */}
      <JoinTeamModal 
        position={layout[device].lobby.joinTeamModal.position}
        rotation={layout[device].lobby.joinTeamModal.rotation}
        scale={layout[device].lobby.joinTeamModal.scale}
      />
      { seatChosen && <SeatModal position={[0, 13, 8]} rotation={[0,0,0]} scale={1.5}/> }
      { guestBeingEditted && <EditOneGuest 
        position={[0,12,10]} 
        scale={1.3}
        guestBeingEditted={guestBeingEditted}
      /> }
    </group>
  }

  function FirstSectionNew({ position }) {
    const readyToStart = useAtomValue(readyToStartAtom)
    const host = useAtomValue(hostAtom)
    const client = useAtomValue(clientAtom)
    const isHost = client.socketId === host.socketId
    const audioVolume = useAtomValue(audioVolumeAtom)

    function StartGameButton({ position, scale }) {
      const [hover, setHover] = useState(false)
      const [pressed, setPressed] = useState(false)

      function handlePointerEnter(e) {
        e.stopPropagation()
        if (readyToStart) {
          document.body.style.cursor = 'pointer'
          setHover(true)
        }
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        if (readyToStart) {
          document.body.style.cursor = 'default'
          setHover(false)
        }
      }
      async function handlePointerDown (e) {
        e.stopPropagation()
        setHover(false)
        if (isHost && readyToStart && !pressed) {
          setPressed(true)
          playSoundEffect('/sounds/effects/set-dul-hana.mp3', audioVolume)

          await sendLog('buttonClick', { button: 'startGame' })

          // Set value so the moon can respond
          // 3
          setBlueMoonBrightness(1.2)

          // 2
          setTimeout(() => {
            setBlueMoonBrightness(1.2)
          }, 1100)

          // 1
          setTimeout(() => {
            setBlueMoonBrightness(1.2)
          }, 2200)

          setTimeout(async () => {
            setBlueMoonBrightness(null)
            socket.emit('gameStart', { roomId: params.id.toUpperCase(), clientId: client._id })
          }, 3300)
        }
      }
      return <group name='start-game-button' position={position} scale={scale}>
        <mesh name='background-outer' scale={[4.5, 0.01, 0.9]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (readyToStart && isHost && !pressed) ? (hover ? 'green' : 'yellow') : 'grey' }/>
        </mesh> 
        <mesh name='background-inner' scale={[4.45, 0.02, 0.85]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[4.5, 0.02, 0.9]}
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.6, 0.02, 0.19]}
        >
          START GAME!
          <meshStandardMaterial color={ (readyToStart && isHost && !pressed) ? (hover ? 'green' : 'yellow') : 'grey' }/>
        </Text3D>
      </group>
    }
    function MenuButtons({ position, scale }) {
      return <group name='menu-buttons' position={position} scale={scale}>
        <AudioButtonSection position={layout[device].lobby.audioButtonSection.position}/>
      </group>
    }
    function WaitingForCrewSign({ position, scale }) {
      return <group name='waiting-for-crew-sign' position={position} scale={scale}>
        <mesh name='background-outer' scale={[5.5, 0.01, 0.9]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='grey'/>
        </mesh> 
        <mesh name='background-inner' scale={[5.45, 0.02, 0.85]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-2.4, 0.02, 0.19]}
        >
          WAITING FOR CREW
          <meshStandardMaterial color='grey'/>
        </Text3D>
      </group>
    }
    function HostWillStartSign({ position, scale }) {
      return <group name='host-will-start-sign' position={position} scale={scale}>
        <mesh name='background-outer' scale={[5.1, 0.01, 0.9]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='grey'/>
        </mesh> 
        <mesh name='background-inner' scale={[5.05, 0.02, 0.85]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-2.1, 0.02, 0.19]}
        >
          HOST WILL START
          <meshStandardMaterial color='grey'/>
        </Text3D>
      </group>
    }
    return <group position={position}>
      <group name='title' position={[-3.3,0,-5.3]}>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2,0,0]}
          size={0.6}
          height={0.01}
        >
          YUT NORI!
          <meshStandardMaterial color="yellow"/>
        </Text3D>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[4.5,0,0]}
          rotation={[-Math.PI/2,0,0]}
          size={0.4}
          height={0.01}
        >
          {`ROOM ID: ${params.id}${isHost ? '  (HOST)' : ''}`}
          <meshStandardMaterial color="yellow"/>
        </Text3D>
      </group>
      <PlayersParty position={[1, 0, -0.2]} scale={0.55}/>
      <MenuButtons position={[0.9, 4, 5.3]}/>
      <StartGameButton position={[0.9, 4, 6.7]} scale={1}/>
      {/* { isHost && !readyToStart && <WaitingForCrewSign position={[0.9,0,5]} scale={0.8}/> }
      { !isHost && <HostWillStartSign position={[0.9,0,5]} scale={0.8}/> } */}
    </group>
  }

  // Rulebook
  function SecondSection({ position }) {
    const howToPlay = useMemo(() => {
      return <HowToPlay 
        device={device} 
        position={[-1,0,-1]} 
        scale={0.6}
        closeButton={false}
      />
    }, [device])
    return <group name='rulebook' position={position}>
      {/* <mesh name='background-panel' position={[0.7, -0.5, 0]}>
        <boxGeometry args={[8.4, 0.01, 14]}/>
        <meshStandardMaterial color='black' transparent opacity={0.5}/>
      </mesh> */}
      <group name='rulebook-label' position={[0.67, 0, -5.6]} scale={0.9}>
        <mesh name='background-outer' scale={[3.0, 0.01, 0.75]} position={[0,0,0]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh> 
        <mesh name='background-inner' scale={[2.95, 0.02, 0.7]} position={[0,0,0]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.3, 0.02, 0.19]}
        >
          RULEBOOK
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
      {howToPlay}
    </group>
  }

  // Invite friends and rule setting
  function ThirdSection({ position }) {
    const [display, setDisplay] = useAtom(landscapeLobbyThirdSectionSelectionAtom)
    function InviteFriendsButton() {
      const [hover, setHover] = useState(false)
      const audioVolume = useAtomValue(audioVolumeAtom)
      function handlePointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setHover(true)
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setHover(false)
      }
      function handlePointerDown(e) {
        e.stopPropagation()
        setDisplay('invite')
        playSoundEffect('/sounds/effects/button-click.mp3', audioVolume)
      }
      return <group name='invite-friends-button' position={[7.5, 0, -5.6]} scale={0.9}>
        <mesh name='background-outer' scale={[4.2, 0.01, 0.75]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (hover || display === 'invite') ? 'green' : 'yellow' }/>
        </mesh> 
        <mesh name='background-inner' scale={[4.15, 0.02, 0.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[4.2, 0.02, 0.75]}
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.9, 0.02, 0.19]}
        >
          INVITE FRIENDS
          <meshStandardMaterial color={ (hover || display === 'invite') ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function SettingsButtonLobby() {
      const [hover, setHover] = useState(false)
      const audioVolume = useAtomValue(audioVolumeAtom)
      function handlePointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setHover(true)
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setHover(false)
      }
      function handlePointerDown(e) {
        e.stopPropagation()
        setDisplay('settings')
        playSoundEffect('/sounds/effects/button-click.mp3', audioVolume)
      }
      return <group name='settings-button' position={[10.8, 0, -5.6]} scale={0.9}>
        <mesh name='background-outer' scale={[2.8, 0.01, 0.75]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (hover || display === 'settings') ? 'green' : 'yellow' }/>
        </mesh> 
        <mesh name='background-inner' scale={[2.75, 0.02, 0.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[2.8, 0.02, 0.75]}
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.2, 0.02, 0.19]}
        >
          SETTINGS
          <meshStandardMaterial color={ (hover || display === 'settings') ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function InviteFriends() {
      function CopyLinkButton({ position }) {
        const [hover, setHover] = useState(false)
        const audioVolume = useAtomValue(audioVolumeAtom)
        function handlePointerEnter(e) {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
          setHover(true)
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          document.body.style.cursor = 'default'
          setHover(false)
        }
        function copyURLToClipboard() {
          const url = window.location.href;
        
          if (navigator.clipboard && navigator.clipboard.writeText) {
            // Modern browsers with Clipboard API support
            navigator.clipboard.writeText(url)
              .then(() => {
              })
              .catch(err => {
                console.error("Failed to copy URL: ", err);
              });
          } else {
            // Fallback for older browsers
            const tempInput = document.createElement("input");
            document.body.appendChild(tempInput);
            tempInput.value = url;
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
          }
        }
        const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)
        const [springs, api] = useSpring(() => ({        
          from: {
            opacity: 0, 
          }
        }))
        function handlePointerDown(e) {
          e.stopPropagation()
          copyURLToClipboard()
          api.start({
            from: {
              opacity: 1
            },
            to: [
              {
                opacity: 1
              },
              { 
                opacity: 0,
                delay: 500,
                config: {
                  tension: 170,
                  friction: 26
                }
              }
            ]
          })
          playSoundEffect('/sounds/effects/button-click.mp3', audioVolume)
        }
        return <group name='copy-link-button' position={position}>
          <mesh name='background-outer' scale={[3, 0.01, 0.75]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh> 
          <mesh name='background-inner' scale={[2.95, 0.02, 0.7]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={MeshColors.spaceDark}/>
          </mesh>
          <mesh 
          name='wrapper' 
          scale={[3, 0.02, 0.75]}
          onPointerEnter={e => handlePointerEnter(e)}
          onPointerLeave={e => handlePointerLeave(e)}
          onPointerDown={e => handlePointerDown(e)}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='yellow' transparent opacity={0}/>
          </mesh>
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            size={0.4}
            height={0.01}
            rotation={[-Math.PI/2, 0, 0]}
            position={[-1.3, 0.02, 0.19]}
          >
            COPY LINK
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
          <Text3D 
            name='copied-tooltip'
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-1,0,-0.6]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            copied!
            <AnimatedMeshDistortMaterial
              speed={5}
              distort={0}
              color='limegreen'
              transparent
              opacity={springs.opacity}
            />
          </Text3D>
        </group>
      }

      // get image before download
      // display it as drei-image
      return <group>
        <QrCode3d text={window.location.href} position={[8.8,0.02,-2]} scale={0.8} rotation={[-Math.PI/2,0,0]}/>
        <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={[5.6,0,1.5]}
        rotation={[-Math.PI/2,0,0]}
        size={0.35}
        height={0.01}
        lineHeight={0.9}>
          {`SCAN THE QR CODE TO JOIN\nTHIS ROOM, OR COPY THE\nLINK AND SHARE WITH YOUR\nFRIENDS`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <CopyLinkButton position={[8.6, 0.02, 5]}/>
      </group>
    }

    return <group name='third-section' position={position}>
      {/* <mesh name='background-panel' position={[8.8, 0, 0]}>
        <boxGeometry args={[7.4, 0.01, 14]}/>
        <meshStandardMaterial color='black' transparent opacity={0.5}/>
      </mesh> */}
      <InviteFriendsButton/>
      { display === 'invite' && <InviteFriends/> }
      <SettingsButtonLobby/>
      { display === 'settings' && <GameRules position={[0.3,0,0]}/> }
    </group>
  }

  function TopSection({ position }) {
    const host = useAtomValue(hostAtom)
    const client = useAtomValue(clientAtom)
    const isHost = client.socketId === host.socketId

    return <group position={position}>
      <Center position={[0,0,0]}>
        <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={[0,0,0]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.8}
        height={0.01}
        lineHeight={0.7}>
          YUT NORI
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </Center>
      <Center position={[0,0,1.4]}>
        <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={[-0.3,0,1.4]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.6}
        height={0.01}
        lineHeight={0.7}
        >
          {`ROOM ID: ${params.id}${isHost ? ' (HOST)' : ''}`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </Center>
    </group>
  }

  function BodySection({ position, scale }) {
    const [selection, setSelection] = useAtom(portraitLobbySelectionAtom)
    function SettingsButton({ position, scale }) {
      const [hover, setHover] = useState(false)
      const audioVolume = useAtomValue(audioVolumeAtom)
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
      }
      function handlePointerDown(e) {
        e.stopPropagation()
        setSelection('settings')
        playSoundEffect('/sounds/effects/button-click.mp3', audioVolume)
      }
      return <group name='settings-button' position={position} scale={scale}>
        <mesh name='background-outer' scale={[2.8, 0.01, 0.75]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (hover || selection === 'settings') ? 'green' : 'yellow' }/>
        </mesh> 
        <mesh name='background-inner' scale={[2.75, 0.02, 0.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[2.8, 0.02, 0.75]}
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.2, 0.02, 0.19]}
        >
          SETTINGS
          <meshStandardMaterial color={ (hover || selection === 'settings') ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function PlayersButton({ position, scale }) {
      const [hover, setHover] = useState(false)
      const audioVolume = useAtomValue(audioVolumeAtom)
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
      }
      function handlePointerDown(e) {
        e.stopPropagation()
        setSelection('players')
        playSoundEffect('/sounds/effects/button-click.mp3', audioVolume)
      }
      return <group name='settings-button' position={position} scale={scale}>
        <mesh name='background-outer' scale={[2.55, 0.01, 0.75]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (hover || selection === 'players') ? 'green' : 'yellow' }/>
        </mesh> 
        <mesh name='background-inner' scale={[2.5, 0.02, 0.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[2.55, 0.02, 0.75]}
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.1, 0.02, 0.19]}
        >
          PLAYERS
          <meshStandardMaterial color={ (hover || selection === 'players') ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function RulebookButton({ position, scale }) {
      const [hover, setHover] = useState(false)
      const audioVolume = useAtomValue(audioVolumeAtom)
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
      }
      function handlePointerDown(e) {
        e.stopPropagation()
        setSelection('rulebook')
        playSoundEffect('/sounds/effects/button-click.mp3', audioVolume)
      }
      return <group name='settings-button' position={position} scale={scale}>
        <mesh name='background-outer' scale={[2.95, 0.01, 0.75]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (hover || selection === 'rulebook') ? 'green' : 'yellow' }/>
        </mesh> 
        <mesh name='background-inner' scale={[2.9, 0.02, 0.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[2.85, 0.02, 0.75]}
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.3, 0.02, 0.19]}
        >
          RULEBOOK
          <meshStandardMaterial color={ (hover || selection === 'rulebook') ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    return <group position={position} scale={scale}>
      <SettingsButton position={[-3.8, 0, -7]} scale={1.3}/>
      <PlayersButton position={[0,0,-7]} scale={1.3}/>
      <RulebookButton position={[3.9,0,-7]} scale={1.3}/>
      { selection === 'players' && <PlayersParty position={[0, 0, 0.5]}/> }
      { selection === 'settings' && <Center position={[0,0,0]}><GameRules  scale={1.2}/></Center> }
      { selection === 'rulebook' && <HowToPlay device={device} scale={0.75} position={[-2.3, 0, -1.6]}/> }
    </group>
  }

  function ActionSection({ position }) {
    const readyToStart = useAtomValue(readyToStartAtom)
    const host = useAtomValue(hostAtom)
    const client = useAtomValue(clientAtom)
    const isHost = host && client && client.socketId === host.socketId

    function ShareThisLobbyButton({ position }) {
      function handleSharePointerEnter(e) {
        e.stopPropagation()
      }
      function handleSharePointerLeave(e) {
        e.stopPropagation()
      }
      async function handleSharePointerDown(e) {
        e.stopPropagation()
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Yut Nori',
              text: "Let's play a game!",
              url: window.location.href,
            })

            await sendLog('buttonClick', { button: 'shareLobby' })
          } catch (err) {
            console.error('Error sharing:', err)
          }
        } else {
          alert('Web Share API is not supported. Copy the URL to share.')
        }
      }

      return <group name='share-this-lobby-button' position={position}>
        <mesh scale={[11.4, 0.01, 1.8]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh scale={[11.3, 0.02, 1.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[11.4, 0.02, 1.8]}
        onPointerEnter={e => handleSharePointerEnter(e)}
        onPointerLeave={e => handleSharePointerLeave(e)}
        onPointerDown={e => handleSharePointerDown(e) }
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-3,0.02,0.23]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.01}
          lineHeight={0.7}>
          SHARE THIS LOBBY
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
    }

    function GuestStartButton({ position }) {
      // looks like the StartGame button but only displays text.
      // thought: pop messages: 'let's go!' for host to see
      return <group name='host-will-start' position={position}>
        <mesh scale={[11.4, 0.01, 1.8]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='grey'/>
        </mesh>
        <mesh scale={[11.3, 0.02, 1.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[11.4, 0.02, 1.8]}
        onPointerDown={e => handleStartPointerDown(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='grey' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-2.8,0.02,0.23]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.01}
          lineHeight={0.7}>
          HOST WILL START
          <meshStandardMaterial color='grey'/>
        </Text3D>
      </group>
    }

    {/* For host: 'waiting for crew', 'start game!' */}
    function StartGameButton({ position }) {
      const [pressed, setPressed] = useState(false) // for set-dul-hana countdown
      async function handleStartPointerDown(e) {
        e.stopPropagation()
        if (isHost && readyToStart && !pressed) {
          setPressed(true)
          socket.emit('gameStart', { roomId: params.id.toUpperCase(), clientId: client._id })
          
          // const audio = new Audio('sounds/effects/boot-up.mp3');
          // audio.volume = 1;
          // audio.play();

          await sendLog('buttonClick', { button: 'startGame' })
        }
      }
      return <group name='start-game-button' position={position}>
        <mesh scale={[11.4, 0.01, 1.8]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (isHost && readyToStart && !pressed)  ? 'yellow' : 'grey' }/>
        </mesh>
        <mesh scale={[11.3, 0.02, 1.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[11.4, 0.02, 1.8]}
        onPointerDown={e => handleStartPointerDown(e) }>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[ (readyToStart ? -2.2 : -3.2) ,0.02, 0.23]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.01}
          lineHeight={0.7}>
          { readyToStart ? `START GAME!` : `WAITING FOR CREW` }
          <meshStandardMaterial color={ (isHost && readyToStart && !pressed) ? 'yellow' : 'grey' }/>
        </Text3D>
      </group>
    }

    const selection = useAtomValue(portraitLobbySelectionAtom)

    return <group position={position}>
      { selection === 'players' && <AudioButtonSection position={layout[device].lobby.audioButtonSection.position}/> }
      <ShareThisLobbyButton position={[0, 5, 2.6]}/>
      { !isHost && <GuestStartButton position={[0, 5, 4.6]}/> }
      { isHost && <StartGameButton position={[0, 5, 4.6]}/> } 
    </group>
  }

  // Shared between portrait and landscape
  function AudioButtonSection({ position }) {
    return <Center position={position}>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={layout[device].lobby.audioButtonSection.text.position}
        rotation={[-Math.PI/2, 0, 0]}
        size={layout[device].lobby.audioButtonSection.text.size}
        height={0.01}
        lineHeight={0.7}>
          SOUND: 
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <AudioButton scale={layout[device].lobby.audioButtonSection.button.scale}/>
    </Center>
  }
  
  const meteorShaderColor = new THREE.Color();
  meteorShaderColor.setHSL(0.05, 0.7, 0.4)
  return <animated.group>
    <GameCamera position={layout[device].camera.position}/>
    { device === 'landscapeDesktop' && <group>
      <FirstSectionNew position={[-9, 0, 0]} />
      <SecondSection position={[0.5, 0, 0]}/>
      <ThirdSection position={[0, 0, 0]}/>
    </group> }
    { device === 'portrait' && <group>
      <TopSection position={[0, 0, -10]}/>
      <BodySection position={[0, 0, 0]}/>
      <ActionSection position={[0, 0, 7]}/>
    </group>}
    { !socket.connected && <DisconnectModal
      position={layout[device].lobby.disconnectModal.position}
      rotation={layout[device].lobby.disconnectModal.rotation}
    /> }
    <MeteorsRealShader color={meteorShaderColor}/>
    <MilkyWayNew // will not show without a camera
      rotation={[-Math.PI/2, 0, -35.0]} 
      position={[0, -10, -4]}
      scale={5}
      brightness={0.5}
      colorTint1={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
      colorTint2={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
      colorTint3={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
    />
  </animated.group>
}