import React from "react"
import { twMerge } from 'tailwind-merge'
import { Button } from "@nextui-org/react"
import type { MeetState } from "../../../store/meet-store.ts"
import { useMeetStore } from "../../../store/meet-store.ts"

interface MeetControlButtonProps {
  iconOn: React.ReactNode
  iconOff: React.ReactNode
  deviceState: boolean
  stateField: keyof MeetState
  onPressHandler?: () => void
  customStyles?: string
}

export const MeetControlButton = (props: MeetControlButtonProps) => {
  const { state, updateMeetState } = useMeetStore()
  const { iconOn, iconOff, deviceState, stateField, onPressHandler, customStyles } = props
  return (
    <Button
      variant="solid"
      onPress={() => {
        updateMeetState({ [stateField]: !deviceState } as Partial<MeetState>)
        if (onPressHandler) {
          onPressHandler()
        }
      }}
      className={twMerge(
        `h-14 w-14 cursor-pointer rounded-full bg-transparent p-2 text-white transition-all  duration-300 hover:bg-indigo-800 ${customStyles}`,
        state[stateField]
          ? "focus-visible:bg-transparent"
          : "bg-rose-700 hover:bg-rose-800 focus-visible:bg-rose-700",
      )}
    >
      {state[stateField] ? iconOn : iconOff}
    </Button>
  )
}
