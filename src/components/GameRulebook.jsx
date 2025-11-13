import { useAtom, useAtomValue } from "jotai";
import { deviceAtom, showGameRulebookAtom } from "../GlobalState";
import { sendLog } from "../api";
import { Text3D } from "@react-three/drei";
import layout from "../dictionaries/layout";
import { useState } from "react";
import HowToPlay from "./HowToPlay";

  export default function GameRulebook() {
    const [showRulebook, setShowRulebook] = useAtom(showGameRulebookAtom);
    const device = useAtomValue(deviceAtom)

    function RulebookButton({ position, scale }) {
      const [hover, setHover] = useState(false)

      function handlePointerEnter(e) {
        e.stopPropagation();
        setHover(true)
      }

      function handlePointerLeave(e) {
        e.stopPropagation();
        setHover(false)
      }

      async function handlePointerUp(e) {
        e.stopPropagation();
        if (showRulebook) {
          setShowRulebook(false)
          await sendLog('buttonClick', {
            button: 'howToPlayGame',
            action: 'close'
          })
        } else {
          setShowRulebook(true)
          await sendLog('buttonClick', {
            button: 'howToPlayGame',
            action: 'open'
          })
        }
      }

      return <group position={position} scale={scale}>
        <mesh>
          <boxGeometry args={[1.5, 0.03, 0.6]}/>
          <meshStandardMaterial color={ hover || showRulebook ? 'green': 'yellow' }/>
        </mesh>
        <mesh>
          <boxGeometry args={[1.45, 0.04, 0.5]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh 
          name='wrapper' 
          onPointerEnter={e => handlePointerEnter(e)}
          onPointerLeave={e => handlePointerLeave(e)}
          onPointerUp={e => handlePointerUp(e)}
        >
          <boxGeometry args={[1.5, 0.1, 0.6]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-0.6,0.02,0.15]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.3}
          height={0.01}
        >
          Rules
          <meshStandardMaterial color={ hover || showRulebook ? 'green': 'yellow' }/>
        </Text3D>
      </group>
    }

    // Block pointer interactivity behind the book
    function handleRulebookPointerEnter(e) {
      e.stopPropagation()
    }
    function handleRulebookPointerLeave(e) {
      e.stopPropagation()
    }
    function handleRulebookPointerDown(e) {
      e.stopPropagation()
    }
    function handleRulebookPointerUp(e) {
      e.stopPropagation()
    }

    return <group>
      <RulebookButton 
        position={layout[device].game.rulebookButton.position}
        scale={layout[device].game.rulebookButton.scale}
      />
      { showRulebook && <group 
        position={layout[device].game.rulebook.position}
        scale={layout[device].game.rulebook.scale}>
        <group 
          position={layout[device].game.rulebook.blocker.position} 
        >
          <mesh name='blocker-inner' scale={layout[device].game.rulebook.blocker.innerScale}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='blocker-outer' scale={layout[device].game.rulebook.blocker.outerScale}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='yellow'/>
          </mesh>
          <mesh name='blocker-wrap' 
            scale={[
              layout[device].game.rulebook.blocker.outerScale[0], 
              layout[device].game.rulebook.blocker.innerScale[1], 
              layout[device].game.rulebook.blocker.outerScale[2], 
            ]}
            onPointerEnter={e=>handleRulebookPointerEnter(e)}
            onPointerLeave={e=>handleRulebookPointerLeave(e)}
            onPointerDown={e=>handleRulebookPointerDown(e)}
            onPointerUp={e=>handleRulebookPointerUp(e)}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='yellow' transparent opacity={0}/>
          </mesh>
        </group>
        <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={layout[device].game.rulebook.title.position}
        rotation={layout[device].game.rulebook.title.rotation}
        size={layout[device].game.rulebook.title.size}
        height={layout[device].game.rulebook.title.height}>
          RULEBOOK
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <HowToPlay
          device={device}
          closeButton={true}
          setShowRulebook={setShowRulebook}
          position={layout[device].game.rulebook.content.position}
        />
      </group> }
    </group>
  }