import React, { useEffect } from "react";
import { clientAtom, gamePhaseAtom, winnerAtom } from "./GlobalState.jsx";
import { useAtom, useAtomValue } from "jotai";
import { getSocket } from "./socket.js";

const socket = getSocket();
import { useParams } from "wouter";
import Game from "./Game.jsx";
import LobbyNew from "./LobbyNew.jsx";
import StarsPatterns2Shader from "./shader/starsPatterns2/StarsPatterns2Shader.jsx";
import GameRulebook from "./components/GameRulebook.jsx";
import { SocketManager } from "./SocketManager.jsx";

export default function Experience() {

  const gamePhase = useAtomValue(gamePhaseAtom)
  console.log('gamePhase', gamePhase)
  const params = useParams()

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
    console.log('connected to socket, joining room:', params.id)
    socket.emit('addUser', { roomId: params.id.toUpperCase(), savedClient: localStorage.getItem('yootGame') }, (response) => {
      console.log('addUser response:', response)
      if (response === 'success') {
        socket.emit('joinRoom', { roomId: params.id.toUpperCase() })
        console.log('joinRoom')
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
    <SocketManager />
    { (gamePhase === 'lobby') && <LobbyNew/> }
    { (gamePhase === 'pregame' || gamePhase === 'game' || gamePhase === 'finished') && <>
      <Game/>
      { (gamePhase === 'pregame' || gamePhase === 'game') && <GameRulebook/> }
    </> }
    {/* win screen experience */}
    <StarsPatterns2Shader count={10000} texturePath={'/textures/particles/3.png'}/>
    <StarsPatterns2Shader count={10000} texturePath={'/textures/particles/6.png'} size={2}/>
  </>
}