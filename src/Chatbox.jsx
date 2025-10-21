import { Html, Scroll, ScrollControls } from "@react-three/drei";
import { socket } from "./SocketManager";
import { useAtomValue } from "jotai";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useParams } from "wouter";
import layout from "./layout";
import { logDisplayAtom, messagesAtom } from "./GlobalState"
import useAutoScroll from "./hooks/useAutoScroll";
import DOMPurify from 'dompurify';

export default function Chatbox({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1, 
  device='landscapeDesktop',
  boxHeight,
  boxWidth,
  padding,
  fontSize,
  borderRadius,
}) {

  const messages = useAtomValue(messagesAtom)
  const logDisplay = useAtomValue(logDisplayAtom)
  const [message, setMessage] = useState('');
  const params = useParams();
  const [inputFocus, setInputFocus] = useState(false);
  const messagesEndRef = useRef(null);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const container = useRef()

  useAutoScroll(container, [messages, logDisplay]);

  // Prevent iOS Safari viewport shift when keyboard appears
  useEffect(() => {
    if (device === 'portrait') {
      const preventScroll = (e) => {
        if (inputFocus && e.target !== inputRef.current && e.target !== container.current) {
          e.preventDefault();
        }
      };

      // Store original viewport height
      const originalHeight = window.visualViewport?.height || window.innerHeight;
      
      const handleViewportChange = () => {
        if (inputFocus && window.visualViewport) {
          // Lock the scroll position when keyboard appears
          window.scrollTo(0, 0);
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      };

      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleViewportChange);
        window.visualViewport.addEventListener('scroll', handleViewportChange);
      }
      
      window.addEventListener('scroll', preventScroll, { passive: false });

      return () => {
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', handleViewportChange);
          window.visualViewport.removeEventListener('scroll', handleViewportChange);
        }
        window.removeEventListener('scroll', preventScroll);
        document.body.style.overflow = '';
      };
    }
  }, [inputFocus, device]);

  // Update the transform, scale and font size when input focus changes
  useEffect(() => {
    const scale = inputFocus && device === 'portrait' ? 1.5 : 1;
    
    if (wrapperRef.current) {
      const translateX = inputFocus && device === 'portrait' ? 185 : 0;
      const translateY = inputFocus && device === 'portrait' ? -830 : 0;
      wrapperRef.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`;
    }
    
    // Update message container font size
    if (container.current) {
      const baseFontSize = parseFloat(fontSize);
      const newFontSize = inputFocus && device === 'portrait' ? baseFontSize * 1.2 : baseFontSize;
      container.current.style.fontSize = `${newFontSize}px`;
      
      // Update container width
      const newWidth = inputFocus && device === 'portrait' ? parseFloat(boxWidth) * 1.2 : boxWidth;
      container.current.style.width = typeof newWidth === 'number' ? `${newWidth}px` : newWidth;
    }
    
    // Update input font size and width
    if (inputRef.current) {
      const baseInputFontSize = parseFloat(layout[device].game.chat.input.fontSize);
      const newInputFontSize = inputFocus && device === 'portrait' ? baseInputFontSize * 1.5 : baseInputFontSize;
      inputRef.current.style.fontSize = `${newInputFontSize}px`;
      
      // Update input width
      const newWidth = inputFocus && device === 'portrait' ? parseFloat(boxWidth) * 1.2 : boxWidth;
      inputRef.current.style.width = typeof newWidth === 'number' ? `${newWidth}px` : newWidth;
    }
    
    // Scroll to bottom when input is focused (portrait mode only)
    if (inputFocus && device === 'portrait' && container.current) {
      // Use setTimeout to wait for transform/font-size transitions to complete
      setTimeout(() => {
        if (container.current) {
          container.current.scrollTop = container.current.scrollHeight;
        }
      }, 350); // Wait slightly longer than the 300ms transition
    }
  }, [inputFocus, device, fontSize]);
  
  function onMessageSubmit(e) {
    e.preventDefault();
    const sanitizedMessage = DOMPurify.sanitize(message).trimStart().trimEnd();
    if (sanitizedMessage) {
      socket.emit("sendMessage", { message: sanitizedMessage, roomId: params.id.toUpperCase() }, ({ joinRoomId, error }) => {
        if (error) {
          console.log('[sendMessage] error sending message to room', joinRoomId)
        } else {
          setMessage('')
        }
      })
    }
  }

  function getColorByTeam(team) {
    if (team === undefined) {
      return 'grey'
    } else if (team == 0) {
      return 'red'
    } else {
      return 'turquoise'
    }
  }

  function handleInputFocus(e) {
    console.log('handleInputFocus called', e)
    console.log('Current device:', device)
    setInputFocus(true)
  }

  function handleInputBlur(e) {
    console.log('handleInputBlur called', e)
    setInputFocus(false)
  }

  return <Html   
    position={position} 
    rotation={rotation}
    scale={scale}
    transform>
      <div 
        ref={wrapperRef}
        style={{
          position: 'absolute',
          transition: 'transform 0.3s ease-out',
          willChange: 'transform',
          transformOrigin: 'top left'
        }}>
        <form onSubmit={(e) => onMessageSubmit(e)}>
        <div ref={container} style={{
          borderRadius: borderRadius,
          height: boxHeight,
          width: boxWidth,
          padding: padding,
          fontSize: fontSize,
          'background': 'rgba(128, 128, 128, 0.3)',
          'overflowY': 'scroll',
          'wordWrap': 'break-word',
          'letterSpacing': '1.5px',
          'transition': 'font-size 0.3s ease-out, width 0.3s ease-out'
        }}>
          {messages.map((value, index) => <p style={{
            color: 'white', 
            fontFamily: 'Luckiest Guy',
            margin: '5px'
            }} 
            key={index}
            >
            <span style={{color: getColorByTeam(value.team)}}>{value.name}: </span> 
            {value.text}
          </p>
          )}
          <div ref={messagesEndRef}/>
          </div>
          <input 
            id='input-message'
            ref={inputRef}
            style={{ 
              height: layout[device].game.chat.input.height,
              borderRadius: layout[device].game.chat.input.borderRadius,
              padding: layout[device].game.chat.input.padding,
              border: layout[device].game.chat.input.border,
              width: boxWidth,
              fontSize: layout[device].game.chat.input.fontSize,
              fontFamily: 'Luckiest Guy',
              transition: 'font-size 0.3s ease-out, width 0.3s ease-out'
            }} 
            onChange={e => { setMessage(e.target.value)} }
            onFocus={e => handleInputFocus(e)}
            onBlur={e => handleInputBlur(e)}
            value={message}
            placeholder="say something..."
          />
        </form>
      </div>
  </Html>
}