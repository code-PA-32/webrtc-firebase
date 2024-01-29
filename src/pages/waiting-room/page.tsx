import { useNavigate } from '@tanstack/react-router'
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@nextui-org/react'

import { useMeetStore } from '../../store/meet-store.ts'

import { useWebRTC } from '../../hooks/use-web-rtc.ts'
import { MeetControlButton } from './components/meet-control-button.tsx'

export const MeetWaitingRoom = () => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null)
  const { state, updateMeetState } = useMeetStore()
  const { joinMeeting, createMeeting } = useWebRTC()
  const [stream, setStream] = useState<MediaStream | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    void navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((it) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = it
        setStream(it)
        return it
      }
      return null
    })
  }, [])

  useEffect(() => {
    if (stream) {
      for (const track of stream.getAudioTracks()) {
        track.enabled = state.isMicOn
      }
      for (const track of stream.getVideoTracks()) {
        track.enabled = state.isCameraOn
      }
    }
  }, [stream, state.isMicOn, state.isCameraOn])

  const joinMeetingHandler = async () => {
    state.isHost ? await createMeeting() : await joinMeeting()
    updateMeetState({
      isCameraOn: state.isCameraOn,
      isMicOn: state.isMicOn,
      isCallActive: true,
      isWaiting: false,
    })

    await navigate({ to: '/on-call/$meetId', params: { meetId: state.meetId } })
  }

  return (
    <div className="flex w-full items-center justify-between gap-5 p-8">
      <div className="relative">
        <video
          disablePictureInPicture
          className="aspect-video w-full rounded-md bg-black object-cover"
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
        />
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-4">
          <MeetControlButton
            iconOn={<Mic size={20}/>}
            iconOff={<MicOff size={20}/>}
            deviceState={state.isMicOn}
            stateField="isMicOn"
            onPressHandler={() => updateMeetState({ isMicOn: !state.isMicOn })}
          />
          <MeetControlButton
            iconOn={<Video size={20}/>}
            iconOff={<VideoOff size={20}/>}
            deviceState={state.isCameraOn}
            stateField="isCameraOn"
            onPressHandler={() => updateMeetState({ isCameraOn: !state.isCameraOn })}
          />
        </div>
      </div>
      <div className="flex w-2/6 flex-col items-center justify-center gap-4">
        <h3 className="text-2xl">Ready to join?</h3>
        <Button
          color="primary"
          className="rounded-3xl w-full text-white text-xs shadow-md"
          onPress={joinMeetingHandler}
        >
          Join now
        </Button>
      </div>
    </div>
  )
}
