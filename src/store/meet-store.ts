import { create } from "zustand"

export interface MeetState {
  meetId: string
  isMicOn: boolean
  isCameraOn: boolean
  isFullScreen: boolean
  isPresenting: boolean
  isCallActive: boolean
  isWaiting: boolean
  isOnHold: boolean
  isHost: boolean
  localStream: MediaStream | null
  remoteStream: MediaStream | null
}

export interface MeetStoreState {
  state: MeetState
  updateMeetState: (data: Partial<MeetState>) => void
  clearMeeting: () => void
}

export const useMeetStore = create<MeetStoreState>((set) => {
  const storedMeetState = localStorage.getItem("meetState")
  const initialState = storedMeetState
    ? (JSON.parse(storedMeetState) as MeetState)
    : {
      meetId: "",
      isMicOn: false,
      isCameraOn: false,
      isFullScreen: false,
      isPresenting: false,
      isCallActive: false,
      isWaiting: false,
      isOnHold: false,
      isHost: false,
      localStream: null,
      remoteStream: null,
    }
  return {
    state: initialState,
    updateMeetState: (data: Partial<MeetState>) => {
      set((previous) => {
        if (data.meetId && previous.state.meetId !== data.meetId) {
          const newState = {
            ...previous.state,
            ...data,
          }
          localStorage.setItem("meetState", JSON.stringify(newState))
          return { state: newState }
        }
        const newState = { ...previous.state, ...data }
        localStorage.setItem("meetState", JSON.stringify(newState))
        return { state: newState }
      })
    },
    clearMeeting: () => {
      localStorage.removeItem("meetState")
      set({
        state: {
          meetId: "",
          isMicOn: false,
          isCameraOn: false,
          isFullScreen: false,
          isPresenting: false,
          isCallActive: false,
          isWaiting: false,
          isOnHold: false,
          isHost: false,
          localStream: null,
          remoteStream: null,
        },
      })
    },
  }
})
