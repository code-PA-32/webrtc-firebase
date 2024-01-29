import { useNavigate } from '@tanstack/react-router'
import { Video } from 'lucide-react'
import React, { useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import WebRTCImage from '../../assets/web.png'
import {createMeetingId} from '../../hooks/use-web-rtc.ts'
import { useMeetStore } from '../../store/meet-store.ts'

export const CreateCall = () => {
  const { updateMeetState } = useMeetStore()
  const [meetIdInput, setMeetIdInput] = useState<string>("")
  const navigate = useNavigate()

  const createMeetingHandler = async () => {
    const createdMeetingId = await createMeetingId()
    updateMeetState({
      meetId: createdMeetingId,
      isCallActive: true,
      isHost: true,
      isWaiting: true,
    })
    void navigate({ to: "/waiting/$meetId", params: { meetId: createdMeetingId } })
  }

  const joinMeetingHandler = async () => {
    updateMeetState({
      isCallActive: true,
      isHost: false,
      isWaiting: true,
    })
    void navigate({ to: "/waiting/$meetId", params: { meetId: meetIdInput } })
  }
  const meetIdInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetIdInput(event.target.value.trim())
    updateMeetState({ meetId: event.target.value })
  }


  return (
    <div className="flex w-full flex-col flex-wrap items-center justify-between gap-12 p-8">
      <div className="flex w-full flex-col gap-8 items-center justify-center">
        <img src={WebRTCImage} alt="webRTC" className="h-40 w-48"/>
        <div className="flex gap-4 items-center justify-center">
          <Button className="flex w-52 h-12 gap-2 px-2 text-sm" variant="solid" color='primary' onPress={createMeetingHandler}>
            <Video size={18} />
            New meeting
          </Button>
          <Input
            placeholder="Enter an ID to join a meeting"
            size="sm"
            value={meetIdInput}
            onChange={(event) => meetIdInputHandler(event)}
          />
          <Button variant="solid" color='primary' className="h-12"  isDisabled={!meetIdInput} onPress={joinMeetingHandler}>
            Join
          </Button>
        </div>
      </div>
    </div>
  )
}