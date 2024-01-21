import { useEffect, useRef, useState } from 'react';
import db from './utils/index.tsx'

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers)

export const App = () => {
  let localStream: MediaStream | null = null;
  let remoteStream: MediaStream | null = null;
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const shareVideoRef = useRef<HTMLVideoElement | null>(null);
  const meetIdInput = useRef<HTMLInputElement | null>(null);
  const [id, setId] = useState('');

  useEffect(() => {

  }, [])


  return (
    <div>
      <video ref={localVideoRef} autoPlay playsInline/>
      <video ref={remoteVideoRef} autoPlay playsInline/>
      <video ref={shareVideoRef} autoPlay playsInline/>
      <input ref={meetIdInput} type="text"/>
    </div>
  )
}

