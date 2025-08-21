import { useAtomValue } from "jotai";
import { musicListenerAtom, musicLoaderAtom } from "../GlobalState";
import { Audio } from "three";

export default function useMusicPlayer() {
  const musicLoader = useAtomValue(musicLoaderAtom)
  const musicListener = useAtomValue(musicListenerAtom)

  function playMusic(filePath) {
    try {
      const music = new Audio(musicListener)
      musicLoader.load(filePath, (buffer) => {
        music.setBuffer(buffer);
        music.setLoop(false);
        music.setVolume(0.5);
        music.play()
      });
    } catch (err) {
      console.log('error playing music', err)
    }
  }
  
  // allow volume control

  function loopMusic() {
    // play songs randomly one after the other

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
    setTimeout(() => {
      loopMusic()
    }, randomSong.length * 1000)
  }

  return { loopMusic }
}