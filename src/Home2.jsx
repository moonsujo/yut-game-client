import { useEffect, useState } from 'react';
import { Float, Html, Text3D } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import { useAtomValue, useSetAtom } from "jotai";
import layout from './dictionaries/layout';
import RocketAnimated from './meshes/RocketAnimated';
import UfoAnimated from './meshes/UfoAnimated';
import { useLocation } from 'wouter';
import HowToPlay from './components/HowToPlay';
import { socket } from './SocketManager';
import { audioVolumeAtom, blueMoonBrightnessAtom, clientAtom, connectedToServerAtom, deviceAtom } from './GlobalState';
import Board from './components/Board';
import GameCamera from './sceneSetUp/GameCamera';
import Rocket from './meshes/Rocket';
import Ufo from './meshes/Ufo';
import useResponsiveSetting from './hooks/useResponsiveSetting';
import MeteorsRealShader from './shader/meteorsReal/MeteorsRealShader';
import YootDisplay from './components/YootDisplay';
import DisconnectModal from './components/DisconnectModal';
import useQueryLogs from './hooks/useQueryLogs';
import * as THREE from 'three';
import useSoundEffectsPlayer from './soundPlayers/useSoundEffectsPlayer';
import useMusicPlayer from './soundPlayers/useMusicPlayer';
import Showroom from './components/Showroom';
import MilkyWayNew from './shader/milkyway/MilkyWayNew';
import { sendLog } from './api';
import { IS_DEV } from './config/env';
import About from './components/About';
import StarsPatterns2Shader from './shader/starsPatterns2/StarsPatterns2Shader';
import Constellation from './shader/constellation/Constellation';

export default function Home2({ showRulebookDefault = false, showAboutDefault = false }) {

  useResponsiveSetting();
  const device = useAtomValue(deviceAtom)
  const [display, setDisplay] = useState(showRulebookDefault ? 'howToPlay' : showAboutDefault ? 'about' : 'title')
  const client = useAtomValue(clientAtom)
  const connectedToServer = useAtomValue(connectedToServerAtom)
  const setBlueMoonBrightness = useSetAtom(blueMoonBrightnessAtom)
  const [_location, setLocation] = useLocation();
  const { playSoundEffect } = useSoundEffectsPlayer()
  const { loopMusic } = useMusicPlayer()
  const setAudioVolume = useSetAtom(audioVolumeAtom)
  useEffect(() => {
    sendLog('pageView', { page: 'home' });
  }, [])
  
  // games played, page visits, yut thrown
  // stats page button
  function PageVisits({ position, rotation }) {
    const [numVisitsResult, loading] = useQueryLogs({ 
      eventName: 'pageView', 
      payload: {
        'page': 'home'
      }
    })
    const numVisits = numVisitsResult?.[0]?.[0]?.value

    return <group>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={position}
        rotation={rotation}
        size={0.3}
        height={0.01}
        color='limegreen'
      >
        {`Visits: ${ numVisits ? numVisits : '' }`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  }

  function GamesPlayed({ position, rotation }) {
    const [numGamesPlayedResult] = useQueryLogs({ 
      eventName: 'buttonClick', 
      payload: {
        'button': 'startGame'
      }
    })
    const numGamesPlayed = numGamesPlayedResult?.[0]?.[0]?.value

    return <group>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={position}
        rotation={rotation}
        size={0.3}
        height={0.01}
        color='limegreen'
      >
        {`Games Played: ${ numGamesPlayed ? numGamesPlayed : '' }`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  }

  function Title({ position, rotation, scale }) {

    const [hover, setHover] = useState(false);
    const { playSoundEffect } = useSoundEffectsPlayer()
    function handlePointerEnter() {
        setHover(true)
    }
    function handlePointerLeave() {
        setHover(false)
    }
    function handlePointerDown(e) {
      e.stopPropagation()
      setDisplay('title')
      playSoundEffect('/sounds/effects/button-click.mp3', 1)
    }

    return <group scale={scale} position={position} rotation={rotation}>
      {/* line 1 */}
      {/* line 2 */}
      {/* wrapper */}
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        size={0.4}
        height={0.01}
        position={[0, -0.5, 0]}
        letterSpacing={0.04}
      >
        YUT
        <meshStandardMaterial color={hover ? "green": [0.8, 0.8, 0]} />
      </Text3D>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        size={0.4}
        height={0.01}
        position={[0, -1, 0]}
        letterSpacing={0.03}
      >
        NORI
        <meshStandardMaterial color={hover ? "green": [0.8, 0.8, 0]} />
      </Text3D>
      <mesh 
        position={[0.7, -0.5, 0]} 
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={e=>handlePointerDown(e)}
      >
        <boxGeometry args={[1.5, 1, 0.1]}/>
        <meshStandardMaterial color="grey" transparent opacity={0}/>
      </mesh>
    </group>
  }

  function Pieces() {
    return <group>
      {/* rocket on star 1 */}
      <Float 
        speed={3} 
        rotationIntensity={0.2}
        floatIntensity={0.1}
        floatingRange={[-0.1, 0.1]}
      >
        <RocketAnimated position={[1.7,0.5,4.3]} rotation={[-Math.PI/4, 0, 0]} scale={0.4}/>
      </Float>
      {/* rocket on moon */}
      <Float 
        speed={3} 
        rotationIntensity={0.3}
        floatIntensity={0.1}
        floatingRange={[-1, 1]}
      >
        <RocketAnimated position={[0,2,-0.1]} rotation={[-Math.PI/4, 0, 0]} scale={0.4}/>
      </Float>
      {/* rocket home pieces */}
      <Rocket 
        position={layout[device].title.pieces.rocketHome0.position} 
        rotation={layout[device].title.pieces.rocketHome0.rotation} 
        scale={layout[device].title.pieces.rocketHome0.scale}
      />
      <Rocket 
        position={layout[device].title.pieces.rocketHome1.position} 
        rotation={layout[device].title.pieces.rocketHome1.rotation} 
        scale={layout[device].title.pieces.rocketHome1.scale}
      />
      <mesh name='rocket-home' scale={layout[device].title.rocketHome.scale} position={layout[device].title.rocketHome.position}>
        <cylinderGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial color='red' transparent opacity={0.1}/>
      </mesh>
      {/* ufo home piece */}
      <Ufo 
        rotation={layout[device].title.pieces.ufoHome.rotation} 
        position={layout[device].title.pieces.ufoHome.position} 
        scale={layout[device].title.pieces.ufoHome.scale}
      />
      <mesh name='ufo-home' scale={layout[device].title.ufoHome.scale} position={layout[device].title.ufoHome.position}>
        <cylinderGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial color='turquoise' transparent opacity={0.1}/>
      </mesh>
      {/* ufo on mars */}
      <Float 
        rotationIntensity={0.05} 
        speed={4} 
        floatIntensity={1}
        floatingRange={[0, 0.2]}
      >
        <UfoAnimated rotation={[-Math.PI/4,0,0]} position={[5.0, 0.8, -0.5]} scale={0.5}/>
      </Float>
      {/* ufo on saturn */}
      <Float rotationIntensity={0.03} speed={3} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
        <UfoAnimated rotation={[-Math.PI/4,0,0]} position={[-3.3, 0.8, -4.3]} scale={0.5}/>
        <UfoAnimated rotation={[-Math.PI/4,0,0]} position={[-2.6, 0.8, -4.3]} scale={0.5}/>
      </Float>
    </group>
  }

  function HowToPlayButton({ position, rotation, scale }) {
    const [hover, setHover] = useState(false)

    function handlePointerEnter(e) {
      e.stopPropagation();
        document.body.style.cursor = 'pointer'
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
        document.body.style.cursor = 'default'
      setHover(false)
    }

    async function handlePointerDown(e) {
      e.stopPropagation();
      setDisplay('howToPlay')

      playSoundEffect('/sounds/effects/button-click.mp3', 1)

      await sendLog('buttonClick', {
        button: 'howToPlayHome',
      })
    }

    return <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[2.8, 0.03, 0.55]}/>
        <meshStandardMaterial color={ hover || display === 'howToPlay' ? 'green': [0.8, 0.8, 0]}/>
      </mesh>
      <mesh>
        <boxGeometry args={[2.75, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[2.8, 0.1, 0.55]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.27, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.3}
        height={0.01}
      >
        How To Play
        <meshStandardMaterial color={ hover || display === 'howToPlay' ? 'green': [0.8, 0.8, 0]}/>
      </Text3D>
    </group>
  }

  function LetsPlayButton({ position, rotation, scale }) {
    const [hover, setHover] = useState(false)

    function handlePointerEnter(e) {
      e.stopPropagation();
        document.body.style.cursor = 'pointer'
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
        document.body.style.cursor = 'default'
      setHover(false)
    }

    const [isThrottled, setIsThrottled] = useState(false)
    async function handlePointerUp(e) {
      e.stopPropagation();
      if (isThrottled) return
      
      setIsThrottled(true)

      setTimeout(() => {
        setIsThrottled(false)
      }, 1000)

      socket.emit('createRoom', { hostId: client._id }, ({ shortId }) => {
        setLocation(`/${shortId}`)
      })

      // this doesn't play
      // music doesn't play either
      playSoundEffect('/sounds/effects/create-game.mp3', 1)
      loopMusic(1, true)
      setAudioVolume(1) // use this in the next music play
      
      setBlueMoonBrightness(null)

      await sendLog('buttonClick', {
        button: 'createGame'
      })
    }

    return <group position={position} rotation={rotation} scale={scale}>
      <mesh name='background-outer'>
        <boxGeometry args={[2.85, 0.03, 0.55]}/>
        <meshStandardMaterial color={ hover ? 'green': [0.8, 0.8, 0]}/>
      </mesh>
      <mesh name='background-inner'>
        <boxGeometry args={[2.8, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerUp={e => handlePointerUp(e)}
      >
        <boxGeometry args={[2.85, 0.1, 0.55]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.27, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.3}
        height={0.01}
      >
        Host a game
        <meshStandardMaterial color={ hover ? 'green': [0.8, 0.8, 0]}/>
      </Text3D>
    </group>
  }

  const [joinGameModalDisplay, setJoinGameModalDisplay] = useState(false);
  function JoinGameButton({ position, rotation, scale }) {
    const [hover, setHover] = useState(false)

    function handlePointerEnter(e) {
      e.stopPropagation();
      document.body.style.cursor = 'pointer'
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      document.body.style.cursor = 'default'
      setHover(false)
    }

    function handlePointerDown(e) {
      e.stopPropagation();

      playSoundEffect('/sounds/effects/button-click.mp3', 1)
      
      setJoinGameModalDisplay(true)
      
    }

    return <group position={position} rotation={rotation} scale={scale}>
      <mesh name='background-outer'>
        <boxGeometry args={[2.7, 0.03, 0.55]}/>
        <meshStandardMaterial color={ hover ? 'green': [0.8, 0.8, 0]}/>
      </mesh>
      <mesh name='background-inner'>
        <boxGeometry args={[2.65, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[2.7, 0.1, 0.55]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.22, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.3}
        height={0.01}
      >
        Join a game
        <meshStandardMaterial color={ hover ? 'green': [0.8, 0.8, 0]}/>
      </Text3D>
    </group>
  }

  function JoinGameModal({ position, rotation, scale }) {
    const [roomId, setRoomId] = useState('')
    const [alert, setAlert] = useState('')
    const [submitHover, setSubmitHover] = useState(false)
    const [cancelHover, setCancelHover] = useState(false)
    
    function isAlphaNumeric(str) {
      for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123) && // lower alpha (a-z)
            !(code === 32)) { // whitespace
          return false;
        }
      }
      return true;
    };

    function handleJoinSubmit(e) {
      e.preventDefault();
      if (isAlphaNumeric(roomId)) {
        socket.emit('checkRoomExists', { roomId: roomId.toUpperCase() }, ({ exists }) => {
          if (exists) {
            setLocation(`/${roomId.toUpperCase()}`)
          } else {
            setAlert("Room with that ID doesn't exist")
          }
        })
      } else {
        setAlert("ID can only contain letters and numbers")
      }
    }
    
    function handleJoinCancel(e) {
      e.preventDefault()
      setJoinGameModalDisplay(false);
      setAlert('');
    }

    function handleSubmitMouseEnter () {
      setSubmitHover(true)
    }
    function handleSubmitMouseLeave () {
      setSubmitHover(false)
    }
    function handleCancelMouseEnter () {
      setCancelHover(true)
    }
    function handleCancelMouseLeave () {
      setCancelHover(false)
    }

    return <group 
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <Html transform>
        <div style={{ position: 'absolute' }}>
          <form onSubmit={e => handleJoinSubmit(e)}>
            <div style={{
              top: '40%',
              width: '155px',
              backgroundColor: 'black',
              border: '2px solid #F1EE92',
              padding: '10px'
            }}>
              <p style={{
                fontFamily: 'Luckiest Guy',
                color: '#F1EE92',
                fontSize: '15px',
                padding: '5px',
                margin: '0px',
                textAlign: 'center',
                letterSpacing: '0.6px'
              }}>
                Enter the Room ID
              </p>
              <input
                style={{
                  width: `142px`,
                  background: 'none',
                  border: 'none',
                  fontFamily: 'Luckiest Guy',
                  fontSize: `15px`,
                  color: '#F1EE92',
                  padding: '5px',
                  border: '2px solid #F1EE92'
                }}
                onChange={e => setRoomId(e.target.value)}
                placeholder="here..."/>
              <div>
                <p style={{ margin: '5px', color: 'red', fontFamily: 'Luckiest Guy', fontSize: '10px' }}>
                  {alert}
                </p>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
              }}>
                <button 
                  id='join-team-submit-button'
                  style={{
                    fontFamily: 'Luckiest Guy',
                    fontSize: `15px`,
                    background: 'none',
                    border: `2px solid ${submitHover ? 'white' : '#F1EE92'}`,
                    margin: '4px',
                    padding: '4px',
                    color: `${submitHover ? 'white' : '#F1EE92'}`,
                    position: 'relative',
                    letterSpacing: '0.6px'
                  }}
                  onMouseOver={handleSubmitMouseEnter}
                  onMouseOut={handleSubmitMouseLeave}
                  type="submit">
                LETS GO!
                </button>
                {/* highlight on hover */}
                <button 
                  id='join-team-cancel-button'
                  style={{
                    fontFamily: 'Luckiest Guy',
                    fontSize: `15px`,
                    background: 'none',
                    border: `2px solid ${cancelHover ? 'white' : 'red'}`,
                    margin: '4px',
                    padding: '4px',
                    color: `${cancelHover ? 'white' : 'red'}`,
                  }}
                  onMouseOver={handleCancelMouseEnter}
                  onMouseOut={handleCancelMouseLeave}
                  onMouseDown={e => handleJoinCancel(e)}
                  // need this to stop form from submitting
                  type="button">
                CANCEL
                </button>
              </div>
            </div>
          </form>
        </div>
      </Html>
    </group>
  }

  function ShowroomButtonLandscape(props) {
    const [hover, setHover] = useState(false)

    function handlePointerEnter(e) {
      e.stopPropagation();
      document.body.style.cursor = 'pointer'
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      document.body.style.cursor = 'default'
      setHover(false)
    }

    function handlePointerDown(e) {
      e.stopPropagation();

      playSoundEffect('/sounds/effects/button-click.mp3', 1)
      
      setDisplay('showroom')
    }

    return <group {...props}>
      <mesh name='background-outer'>
        <boxGeometry args={[2.55, 0.03, 0.55]}/>
        <meshStandardMaterial color={ hover ? 'green': [0.8, 0.8, 0]}/>
      </mesh>
      <mesh name='background-inner'>
        <boxGeometry args={[2.5, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[2.7, 0.1, 0.55]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.13, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.3}
        height={0.01}
      >
        SHOWROOM
        <meshStandardMaterial color={ hover ? 'green': [0.8, 0.8, 0]}/>
      </Text3D>
    </group>
  }
  function ShowroomButtonPortrait(props) {
    const [hover, setHover] = useState(false)

    function handlePointerEnter(e) {
      e.stopPropagation();
      document.body.style.cursor = 'pointer'
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      document.body.style.cursor = 'default'
      setHover(false)
    }

    function handlePointerDown(e) {
      e.stopPropagation();

      playSoundEffect('/sounds/effects/button-click.mp3', 1)
      
      setDisplay('showroom')
    }

    return <group {...props}>
      {/* <mesh name='background-outer'>
        <boxGeometry args={[2.5, 0.03, 2.1]}/>
        <meshStandardMaterial color={ hover ? 'green': [0.8, 0.8, 0]}/>
      </mesh>
      <mesh name='background-inner'>
        <boxGeometry args={[2.45, 0.04, 2.05]}/>
        <meshStandardMaterial color='black'/>
      </mesh> */}
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[2.5, 0.1, 2.1]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
    </group>
  }
  function AboutButtonLandscape(props) {
    const [hover, setHover] = useState(false)

    function handlePointerEnter(e) {
      e.stopPropagation();
      document.body.style.cursor = 'pointer'
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      document.body.style.cursor = 'default'
      setHover(false)
    }

    function handlePointerDown(e) {
      e.stopPropagation();

      playSoundEffect('/sounds/effects/button-click.mp3', 1)
      
      setDisplay('about')
    }

    return <group {...props}>
      <mesh name='background-outer'>
        <boxGeometry args={[1.6, 0.03, 0.55]}/>
        <meshStandardMaterial color={ hover ? 'green': [0.8, 0.8, 0]}/>
      </mesh>
      <mesh name='background-inner'>
        <boxGeometry args={[1.55, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[1.6, 0.1, 0.55]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.65, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.3}
        height={0.01}
      >
        ABOUT
        <meshStandardMaterial color={ hover ? 'green': [0.8, 0.8, 0]}/>
      </Text3D>
    </group>
  }

  // To make room in portrait mode
  const { titleScale, titlePosition, titleBoardScale, howToPlayScale, showroomScale, navigationPosition, milkyWayPosition, milkyWayScale, showroomButtonPortraitScale, aboutScale } = useSpring({
    titleScale: display === 'howToPlay' ? 0.5 : 1,
    titlePosition: display === 'howToPlay' ? [-2,0,-5] : [0,0,0],
    yutDisplayScale: display === 'howToPlay' ? 0.5 : 1,
    yutDisplayPosition: display === 'howToPlay' ? [-2,0,-5] : [0,0,0],
    titleBoardScale: display === 'title' ? 1 : 0,
    howToPlayScale: display === 'howToPlay' ? 1 : 0,
    showroomScale: display === 'showroom' ? 1 : 0,
    navigationPosition: display === 'showroom' ? [-13,0,0] : [0,0,0],
    milkyWayPosition: display === 'showroom' ? [-4,0,0] : [0,0,0],
    milkyWayScale: display !== 'showroom' ? 1 : 0,
    aboutScale: display === 'about' ? 1 : 0,
    showroomButtonPortraitScale: (device === 'portrait' && display === 'showroom') ? 0 : 1,
    config: {
      tension: 170,
      friction: 26
    },
  })
  
  const meteorShaderColor = new THREE.Color();
  meteorShaderColor.setHSL(0.05, 0.7, 0.4)
  return <>
    <GameCamera 
      position={layout[device].title.camera.position}
      lookAt={layout[device].title.camera.lookAt}
    />
    <animated.group name='navigation' position={navigationPosition}>
      { device === 'portrait' && <animated.group scale={titleScale} position={titlePosition}>
        <Title 
          position={layout[device].title.text.position}
          rotation={layout[device].title.text.rotation}
          scale={layout[device].title.text.scale}
          setDisplay={setDisplay}
        />
      </animated.group>}
      { device === 'landscapeDesktop' && <Title 
        position={layout[device].title.text.position}
        rotation={layout[device].title.text.rotation}
        scale={layout[device].title.text.scale}
        setDisplay={setDisplay}
      />}
      { device === 'portrait' && <animated.group scale={titleScale} position={titlePosition}>
        <YootDisplay
          position={layout[device].title.yoots.position}
          rotation={layout[device].title.yoots.rotation}
          scale={layout[device].title.yoots.scale} 
        />
      </animated.group> }
      { device === 'landscapeDesktop' && <YootDisplay
        position={layout[device].title.yoots.position}
        rotation={layout[device].title.yoots.rotation}
        scale={layout[device].title.yoots.scale} 
      />}
      <HowToPlayButton
        position={layout[device].title.howToPlay.position} 
        rotation={layout[device].title.howToPlay.rotation}
        scale={layout[device].title.howToPlay.scale}
      />
      <JoinGameButton
        position={layout[device].title.joinGame.position} 
        rotation={layout[device].title.joinGame.rotation}
        scale={layout[device].title.joinGame.scale}
      />
      { joinGameModalDisplay && <JoinGameModal
        position={layout[device].title.joinGameModal.position} 
        rotation={layout[device].title.joinGameModal.rotation}
        scale={layout[device].title.joinGameModal.scale}
      /> }
      <LetsPlayButton
        position={layout[device].title.letsPlay.position} 
        rotation={layout[device].title.letsPlay.rotation}
        scale={layout[device].title.letsPlay.scale}
      />
      { device === 'landscapeDesktop' && <ShowroomButtonLandscape
        position={layout[device].title.showroom.position} 
        rotation={layout[device].title.showroom.rotation}
        scale={layout[device].title.showroom.scale}
      /> }
      { device === 'portrait' && <animated.group scale={showroomButtonPortraitScale}>
        <ShowroomButtonPortrait
        position={layout[device].title.showroom.position} 
        rotation={layout[device].title.showroom.rotation}
        scale={layout[device].title.showroom.scale}
      /></animated.group> }
      { device === 'landscapeDesktop' && <AboutButtonLandscape
        position={layout[device].title.about.position} 
        rotation={layout[device].title.about.rotation}
        scale={layout[device].title.about.scale}
      /> }
    </animated.group>
    { IS_DEV && display === 'title' && <group name='stats'>
      { device === 'landscapeDesktop' && <PageVisits 
        position={layout[device].title.pageVisits.position} 
        rotation={layout[device].title.pageVisits.rotation}
      /> }
      { device === 'landscapeDesktop' && <GamesPlayed 
        position={layout[device].title.gamesPlayed.position} 
        rotation={layout[device].title.gamesPlayed.rotation}
      /> }
    </group> }
    <group name='display'>
      <group position={layout[device].title.board.position} 
        scale={layout[device].title.board.scale}>
        <animated.group scale={titleBoardScale}>
          <Board 
            showStart={true} 
            interactive={false}/>
          <Pieces/>
        </animated.group>
      </group>
      {/* have to display conditionally in order for it to not play the fireworks */}
      { display === 'howToPlay' && <animated.group scale={howToPlayScale}>
        <HowToPlay 
          device={device}
          position={layout[device].howToPlay.position}
          rotation={[0,0,0]}
          scale={layout[device].howToPlay.scale}
          tabOrientation='right'
        />
      </animated.group> }
      <animated.group scale={aboutScale}>
        <About
          device={device}
          position={[-4,0,-4.5]}
          scale={layout[device].about.scale}
        />
      </animated.group>
      <animated.group scale={showroomScale}>
        <Showroom
          position={layout[device].showroom.position}
          rotation={layout[device].showroom.rotation}
          scale={layout[device].showroom.scale}
          setHomeDisplay={setDisplay}
          homeDisplay={display}
        />  
      </animated.group>
    </group>
    { !connectedToServer && <DisconnectModal
      position={layout[device].title.disconnectModal.position}
      rotation={layout[device].title.disconnectModal.rotation}
    /> }
    <MeteorsRealShader color={meteorShaderColor}/>
    <animated.group position={milkyWayPosition} scale={milkyWayScale}>
      <MilkyWayNew
        rotation={[-Math.PI/2, 0, -35.0]} 
        position={[0,-1,0]} 
        scale={4}
        brightness={0.5}
        colorTint1={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
        colorTint2={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
        colorTint3={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
      />
    </animated.group>
    <StarsPatterns2Shader count={10000} texturePath={'/textures/particles/3.png'}/>
    <StarsPatterns2Shader count={15000} texturePath={'/textures/particles/6.png'} size={2}/>
    <Constellation omitFactor={2} position={[-15.5,-1,-6.5]} rotation={[-Math.PI/2, 0, Math.PI/16]} scale={1.3} modelPath={'/models/star.glb'}/>
    <Constellation omitFactor={4} position={[-8.7,-1,-7.1]} rotation={[-Math.PI/2, 0, Math.PI/4]} scale={0.9} modelPath={'/models/star.glb'}/>
    <Constellation omitFactor={2} position={[-15.5,-1,3.5]} rotation={[-Math.PI/2, 0, Math.PI/6]} scale={1.2} modelPath={'/models/star.glb'}/>
    <Constellation omitFactor={2} position={[-8.5,-1,3.5]} rotation={[-Math.PI/2, 0, Math.PI/4]} scale={1.3} modelPath={'/models/star.glb'}/>
    {/* top right */}
    <Constellation omitFactor={2} position={[4.4,-1,-6.3]} rotation={[-Math.PI/2, 0, Math.PI/4]} scale={1.3} modelPath={'/models/star.glb'}/>
  </>
}