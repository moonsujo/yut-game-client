import QRCodeStyling from "qr-code-styling";
import { useEffect, useState } from "react";
import { TextureLoader } from "three";

export default function QrCode3d({ text, position, scale, rotation }) {
  const [texture, setTexture] = useState(null)
  const [error, setError] = useState(null)

  // Generate the QR code as an image
  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 256,
      height: 256,
      data: text,
      image: '/images/yoot.png',
      dotsOptions: {
        color: "#000000ff",
        type: "dots",
        // gradient applies to dots like a background
      },
      backgroundOptions: {
        color: "#86c082ff",
        // gradient: {
        //   type: 'radial',
        //   colorStops: [
        //     // inner
        //     {
        //       offset: 0.1, // radius, between 0 and 1 (edge of box)
        //       color: 'yellow'
        //     },
        //     // outer
        //     {
        //       offset: 0.4,
        //       color: '#005500'
        //     }
        //   ]
        // }
      },
      cornersSquareOptions: {
        type: 'dot',
        // gradient: {
        //   type: 'radial',
        //   colorStops: [
        //     // inner
        //     {
        //       offset: 0.8, // radius, between 0 and 1 (edge of box)
        //       color: 'yellow'
        //     },
        //     // outer
        //     {
        //       offset: 1,
        //       color: '#555500'
        //     }
        //   ]
        // }
      },
      cornersDotOptions: {
        type: 'dot',
        // gradient: {
        //   type: 'radial',
        //   colorStops: [
        //     // inner
        //     {
        //       offset: 0.5, // radius, between 0 and 1 (edge of box)
        //       color: 'yellow'
        //     },
        //     // outer
        //     {
        //       offset: 1,
        //       color: '#555500'
        //     }
        //   ]
        // }
      }
    });

    // Generate the blob and set the texture
    qrCode.getRawData('png').then((blob) => {
      if (!blob) {
        console.error('QR code blob generation failed');
        setError('Failed to generate QR code');
        return;
      }
      
      const url = URL.createObjectURL(blob);
      new TextureLoader().load(
        url, 
        (loadedTexture) => {
          setTexture(loadedTexture);
          URL.revokeObjectURL(url); // Cleanup the object URL
        },
        undefined, // onProgress
        (err) => {
          console.error('Failed to load QR code texture:', err);
          setError('Failed to load QR code texture');
          URL.revokeObjectURL(url); // Cleanup on error
        }
      );
    }).catch((err) => {
      console.error('QR code generation error:', err);
      setError('QR code generation failed');
    });
  }, [text]);

  if (error) {
    console.error('QR Code Error:', error);
    return null;
  }
  
  if (!texture) return null; // Wait for the texture to load

  return <group>
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial map={texture} />
    </mesh>
    {/* <Star position={[7.127, 0, -3.36]} scale={0.1} color='white'/>
    <Star position={[9.878, 0, -3.36]} scale={0.1} color='white'/>
    <Star position={[7.127, 0, -0.61]} scale={0.1} color='white'/> */}
  </group>
}