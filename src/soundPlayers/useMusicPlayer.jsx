import { useAtom, useAtomValue } from "jotai";
import { audioVolumeAtom, musicAtom, musicListenerAtom, musicLoaderAtom } from "../GlobalState";
import { Audio } from "three";
import { useState } from "react";

export default function useMusicPlayer() {
  const musicLoader = useAtomValue(musicLoaderAtom)
  const musicListener = useAtomValue(musicListenerAtom)
  const [music, setMusic] = useAtom(musicAtom)
  const [musicTimer, setMusicTimer] = useState(null)
  const audioVolume = useAtomValue(audioVolumeAtom)

  function playMusic(filePath) {
    try {
      const newMusic = new Audio(musicListener)
      setMusic(newMusic)
      musicLoader.load(filePath, (buffer) => {
        newMusic.setBuffer(buffer);
        newMusic.setLoop(false);
        newMusic.setVolume(audioVolume);
        newMusic.play()
      });
    } catch (err) {
      console.log('error playing music', err)
    }
  }
  
  // add 'start' flag
  // if start, set volume to 1
  // else, set volume to the one in global state
  // create room effect should always play at volume 1
  // pass a volume argument to 'play sound effect'
  function loopMusic() {
    // play songs randomly one after the other
    clearTimeout(musicTimer)
    if (music) music.stop()

    // length: seconds
    const songs = [
      {
        'title': 'Magnetic (Lofi)',
        'artist': 'Illit, itsyu',
        'source': 'itsyu youtube',
        'path': '/sounds/music/magnetic-lofi.mp3',
        'length': 94
      },
      {
        'title': 'Hype Boy (Lofi)',
        'artist': 'New Jeans, DANI.HZ',
        'source': '다니헤르츠 DANI.HZ youtube',
        'path': '/sounds/music/hype-boy-lofi.mp3',
        'length': 215
      },
      {
        'title': 'Soda Pop (Lofi)',
        'artist': 'Andrew Choi, Neckwav, Danny Chung, Kevin Woo, SamUIL Lee, Vince, Kush, 24, Dominsuk, Ian Eisendrath, kisa',
        'source': 'kisa youtube',
        'path': '/sounds/music/soda-pop-lofi.mp3',
        'length': 98
      },
      {
        'title': 'Dynamite (Lofi)',
        'artist': 'BTS, Vien',
        'source': 'VIEN youtube',
        'path': '/sounds/music/dynamite-lofi.mp3',
        'length': 271
      },
      {
        'title': 'ASAP (Lofi)',
        'artist': 'New Jeans, DANI.HZ',
        'source': '다니헤르츠 DANI.HZ youtube',
        'path': '/sounds/music/asap-lofi.mp3',
        'length': 175
      },
      {
        'title': 'Golden (Lofi)',
        'artist': 'Ejae, Audrey Nuna, Rei Ami, kisa',
        'source': 'kisa youtube',
        'path': '/sounds/music/golden-lofi.mp3',
        'length': 142
      },
      {
        'title': 'Perfect Night (Lofi)',
        'artist': 'Le Sserafim, DANI.HZ',
        'source': '다니헤르츠 DANI.HZ youtube',
        'path': '/sounds/music/perfect-night-lofi.mp3',
        'length': 236
      },
      {
        'title': 'Supernatural (Lofi)',
        'artist': 'New Jeans, bubble lofi',
        'source': 'bubble lofi youtube',
        'path': '/sounds/music/supernatural-lofi.mp3',
        'length': 251
      },
    ]

    // every client has a different song playing
    const randomSong = songs[Math.floor(Math.random() * songs.length)]
    playMusic(randomSong.path)
    const newMusicTimer = setTimeout(() => {
      loopMusic()
    }, randomSong.length * 1000)
    setMusicTimer(newMusicTimer)
  }

  // set global volume
  // for music, on next play, set volume to 0
  // for effects, on next play, do the same
  // set current music and effects to 0
  // set global state for effect

  return { loopMusic }
}