import { Text3D } from '@react-three/drei';
import layout from '../dictionaries/layout';

export default function About(props) {


  return <group {...props}>
    <Text3D 
        font="/fonts/Luckiest Guy_Regular.json"
        position={[0,0,0]}
        rotation={[-Math.PI/2,0,0]}
        size={layout[props.device].about.title.size}
        height={0.01}
    >
      {`ABOUT THE APP`}
      <meshStandardMaterial color='yellow'/>
    </Text3D>
    <Text3D 
        font="/fonts/Luckiest Guy_Regular.json"
        position={[0, 0, 1]}
        rotation={[-Math.PI/2,0,0]}
        size={layout[props.device].about.description.size}
        height={0.01}
    >
      {`YUTNORI IS A GAME I PLAYED WITH MY FAMILY\nDURING THE HOLIDAYS IN KOREA.`}
      <meshStandardMaterial color='limegreen'/>
    </Text3D>
    <Text3D 
        font="/fonts/Luckiest Guy_Regular.json"
        position={[0, 0, 4]}
        rotation={[-Math.PI/2,0,0]}
        size={layout[props.device].about.description.size}
        height={0.01}
    >
      {`I CREATED A VIRTUAL SPACE WHERE\nPEOPLE CAN ENJOY THIS GAME\nTO PRESERVE IT.`}
      <meshStandardMaterial color='limegreen'/>
    </Text3D>
    <Text3D 
        font="/fonts/Luckiest Guy_Regular.json"
        position={[0, 0, 8.5]}
        rotation={[-Math.PI/2,0,0]}
        size={layout[props.device].about.description.size}
        height={0.01}
    >
      {`I DESIGNED THE UI AND PROGRAMMED\nTHE GAME WITH THE HELP OF ARTISTS\nFROM AROUND THE WORLD. HOPE YOU ENJOY IT!`}
      <meshStandardMaterial color='limegreen'/>
    </Text3D>
    <Text3D 
      font="/fonts/Luckiest Guy_Regular.json"
      position={[0, 0, 15]}
      rotation={[-Math.PI/2,0,0]}
      size={layout[props.device].about.description.size}
      height={0.01}
    >
      {`beatrhino@gmail.com\nbeat rhino studio © 2025`}
      <meshStandardMaterial color='limegreen'/>
    </Text3D>
  </group>
}