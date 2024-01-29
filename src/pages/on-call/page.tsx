import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useMeetStore } from '../../store/meet-store.ts'
import { closeMeeting, useWebRTC } from '../../hooks/use-web-rtc.ts'
import { twMerge } from 'tailwind-merge'
import { OnCallControls } from './components/on-call-controls.tsx'


export const OnCall = () => {
  const videoContainerRef = useRef<HTMLDivElement | null>(null)
  const localVideoRef = useRef<HTMLVideoElement | null>(null)
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null)
  const { state, updateMeetState } = useMeetStore()
  const screenShareRef = useRef<HTMLVideoElement | null>(null)
  const { shareScreen } = useWebRTC()
  const navigate = useNavigate()

  useEffect(() => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = state.remoteStream
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = state.localStream
    }
  }, [state.localStream, state.remoteStream])

  useEffect(() => {
    if (localVideoRef.current) {
      const stream = localVideoRef.current.srcObject as MediaStream
      if (stream) {
        for (const track of stream.getVideoTracks()) {
          track.enabled = state.isCameraOn
        }
        for (const track of stream.getAudioTracks()) {
          track.enabled = state.isMicOn
        }
      }
    }
  }, [state.isCameraOn, state.isMicOn])

  const onHoldToggleHandler = () => {
    updateMeetState({
      isOnHold: !state.isOnHold,
    })
    if (localVideoRef.current) {
      const stream = localVideoRef.current.srcObject as MediaStream
      for (const track of stream.getTracks()) {
        track.enabled = state.isOnHold
      }
    }
  }

  const hangUpHandler = () => {
    updateMeetState({
      isCallActive: false,
      isWaiting: false,
      isHost: false,
      isOnHold: false,
      isCameraOn: false,
      isMicOn: false,
      isPresenting: false,
      isFullScreen: false,
    })
    closeMeeting()
    void navigate({ to: '/' })
  }
  const shareDesktop = async () => {
    if (screenShareRef.current) {
      // @ts-expect-error-ref
      await shareScreen({ ref: screenShareRef.current })
    }
  }

  return (
    <div
      className="flex w-full flex-col flex-wrap items-center justify-between lg:flex-row lg:gap-0">
      <div className="h-screen w-full">
        <div className="relative flex 2xl:justify-center" ref={videoContainerRef}>
          <video
            disablePictureInPicture

            className={twMerge(
              'absolute left-2 top-2 aspect-video w-36 z-10 rounded-md border-[1px]' +
              ' border-indigo-800 bg-black object-cover lg:w-60',
              state.isFullScreen && 'w-96 rounded-md object-cover',
            )}
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
          />
          <video
            disablePictureInPicture
            className={twMerge(
              'aspect-video h-full w-full rounded-md bg-black object-cover',
              state.isFullScreen &&
              'aspect-video h-full w-full rounded-md bg-black object-cover',
              state.isPresenting && 'absolute left-2 top-40 aspect-video w-60 h-auto z-10',
            )}
            ref={remoteVideoRef}
            autoPlay
            playsInline
          />
          <video
            className={twMerge(
              'absolute bottom-0 right-0 h-60 w-96 rounded-md',
              state.isPresenting && ' border-2 border-white h-full w-full relative object-contain',
            )}
            autoPlay
            playsInline
            ref={screenShareRef}
          />
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-4">
            <OnCallControls
              ref={videoContainerRef}
              videoStreamToggleHandler={() =>
                updateMeetState({ isCameraOn: !state.isCameraOn })
              }
              audioStreamToggleHandler={() =>
                updateMeetState({ isMicOn: !state.isMicOn })
              }
              hangUpHandler={hangUpHandler}
              onHoldToggleHandler={onHoldToggleHandler}
              shareDesktop={shareDesktop}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
