
import { socket } from "../SocketManager";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useRef } from "react";
import { getLegalTiles } from "../helpers/legalTiles";
import Rocket from "../meshes/Rocket.jsx";
import Ufo from "../meshes/Ufo.jsx";
import { teamsAtom, gamePhaseAtom, selectionAtom, tilesAtom, legalTilesAtom, hasTurnAtom, clientAtom, pauseGameAtom, backdoLaunchAtom, shortcutOptionsAtom, showFinishMovesAtom, helperTilesAtom } from "../GlobalState.jsx";
import { useParams } from "wouter";
import { tileType } from "../helpers/helpers.js";
import { animated } from "@react-spring/three";
import { useAnimationPlaying } from "../hooks/useAnimationPlaying.jsx";
import useSoundEffectsPlayer from "../soundPlayers/useSoundEffectsPlayer.jsx";

export default function Piece ({
  position=[0,0,0],
  rotation=[0,0,0],
  tile,
  team,
  id,
  scale=1,
  selectable=false,
  selected=false,
  onBoard=false,
}) {
  const [selection, setSelection] = useAtom(selectionAtom);
  const [legalTiles, setLegalTiles] = useAtom(legalTilesAtom)
  const [client] = useAtom(clientAtom)
  const [teams] = useAtom(teamsAtom);
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [tiles] = useAtom(tilesAtom)
  const [hasTurn] = useAtom(hasTurnAtom)
  const animationPlaying = useAnimationPlaying()
  const params = useParams()
  const paused = useAtomValue(pauseGameAtom)
  const backdoLaunch = useAtomValue(backdoLaunchAtom)
  const shortcutOptions = useAtomValue(shortcutOptionsAtom)
  const { playSoundEffect } = useSoundEffectsPlayer()
  const setShowFinishMoves = useSetAtom(showFinishMovesAtom)
  const setHelperTiles = useSetAtom(helperTilesAtom)

  const group = useRef();
  const wrapperMat = useRef();
  const wrapper = useRef();

  function handlePointerEnter(event) {
    event.stopPropagation();
    // wrapperMat.current.opacity += 0.2;
    document.body.style.cursor = "pointer";
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    // wrapperMat.current.opacity -= 0.2;
    document.body.style.cursor = "default";
  }

  // Piece selected: bulge
  // rocket shaking on selected
  function handlePointerDown(event) {
    if (gamePhase === "game" && hasTurn && client.team === team && !animationPlaying && !paused) {
      event.stopPropagation();
      if (selection === null) {
        let pieces;
        let history;
        if (tileType(tile) === 'home') {
          history = []
          pieces = [{tile, team, id, history}]
        } else {
          history = tiles[tile][0].history // go back the way you came from of the first token
          pieces = tiles[tile];
        }
        let legalTiles = getLegalTiles(tile, teams[team].moves, teams[team].pieces, history, backdoLaunch, shortcutOptions)
        if (!(Object.keys(legalTiles).length === 0)) {
          // const audio = new Audio('sounds/effects/select.mp3');
          // audio.volume = 0.5;
          // audio.play();
          // const audio2 = new Audio('sounds/effects/legalTile.mp3');
          // audio2.volume = 0.5;
          // audio2.play();

          // update client
          setSelection({ tile, pieces })
          setLegalTiles(legalTiles)
          
          let helperTiles = {}

          for (const legalTile of Object.keys(legalTiles)) {
            if (legalTile !== '29') {
              let moveInfo = legalTiles[legalTile]
              helperTiles[legalTile] = parseInt(moveInfo.move)
            }
          }

          setHelperTiles(helperTiles)

          if (!legalTiles[29]) {
            if (team === 0) playSoundEffect('/sounds/effects/rocket-select.mp3')
            // else if (team === 1) playSoundEffect('/sounds/effects/rocket-select.mp3') // play ufo effect
          } else {
            if (team === 0) playSoundEffect('/sounds/effects/rocket-select-finishable.mp3')
            // else if (team === 1) playSoundEffect('/sounds/effects/rocket-select.mp3') // play ufo effect
          }

          // update other clients
          socket.emit("select", { roomId: params.id.toUpperCase(), selection: { tile, pieces }, legalTiles })
        }
      } else {
        if (selection.tile != tile && tile in legalTiles) {
          socket.emit("move", { roomId: params.id.toUpperCase(), tile, playerName: client.name });
          playSoundEffect('/sounds/effects/star-move.mp3')
        } else { // deselect
          
          // update client
          setSelection(null)
          setLegalTiles({})
          setHelperTiles({})
          setShowFinishMoves(false)
          
          // update other clients
          socket.emit("select", { roomId: params.id.toUpperCase(), selection: null, legalTiles: {} });
          // const audio = new Audio('sounds/effects/deselect.mp3');
          // audio.volume = 0.5;
          // audio.play();
        }
      }
    }
  }

  return (
    <animated.group
      position={position}
      rotation={rotation}
      ref={group}
      scale={scale}
    >
      <mesh
        castShadow
        rotation={[-Math.PI / 4, 0, 0]}
        onPointerDown={(event) => handlePointerDown(event)}
        onPointerOver={(event) => handlePointerEnter(event)}
        onPointerLeave={(event) => handlePointerLeave(event)}
        ref={wrapper}
      >
        <sphereGeometry args={[0.55, 32, 16]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          ref={wrapperMat}
          depthWrite={false}
        />
      </mesh>
      { team === 0 ? <Rocket 
      animationPlaying={animationPlaying}
      selected={selected}
      onBoard={onBoard}
      selectable={selectable}
      selection={selection}/> : <Ufo 
      animationPlaying={animationPlaying}
      selected={selected}
      onBoard={onBoard}
      selectable={selectable}
      selection={selection}/>}
    </animated.group>
  )      
};