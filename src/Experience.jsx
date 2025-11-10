import React, { useEffect } from "react";
import { clientAtom, gamePhaseAtom, winnerAtom } from "./GlobalState.jsx";
import { useAtom, useAtomValue } from "jotai";
import { socket } from "./SocketManager.jsx";
import { useParams } from "wouter";
import Game from "./Game.jsx";
import RocketsWin2 from "./endScenes/RocketsWin2.jsx";
import RocketsLose from "./endScenes/RocketsLose.jsx";
import UfosWin2New from "./endScenes/UfosWin2New.jsx";
import UfosLose from "./endScenes/UfosLose.jsx";
import LobbyNew from "./LobbyNew.jsx";
import StarsPatterns2Shader from "./shader/starsPatterns2/StarsPatterns2Shader.jsx";

export default function Experience() {

  const gamePhase = useAtomValue(gamePhaseAtom)
  const params = useParams()
  // test
  // const client = { team: 0 }
  // const gamePhase = 'finished'
  // const winner = 1

  // Connect to socket when entering a room
  useEffect(() => {
    if (!socket.connected) {
      socket.connect()
    }

    return () => {
      // Optionally disconnect when leaving the room
      // socket.disconnect()
    }
  }, [])

  const handleConnect = () => {
    socket.emit('addUser', { roomId: params.id.toUpperCase(), savedClient: localStorage.getItem('yootGame') }, (response) => {
      if (response === 'success') {
        socket.emit('joinRoom', { roomId: params.id.toUpperCase() })
      } else {
        // Display message: 'room doesn't exist. create a new room from the main entrance. <button/>'
      }
    })
  }

  useEffect(() => {
    if (socket.connected) {
      handleConnect()
    } else {
      // Wait for connection before joining
      socket.once('connect', handleConnect)
      
      return () => {
        socket.off('connect', handleConnect)
      }
    }
  }, [params.id])

  return <>
    { gamePhase === 'lobby' && <LobbyNew/> }
    { (gamePhase === 'pregame' || gamePhase === 'game' || gamePhase === 'finished') && <Game/> }
    {/* win screen experience */}
    <StarsPatterns2Shader count={10000} texturePath={'/textures/particles/3.png'}/>
    <StarsPatterns2Shader count={10000} texturePath={'/textures/particles/6.png'} size={2}/>
  </>
}