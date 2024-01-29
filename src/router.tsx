import {
  Outlet,
  createRouter,
  createRootRoute,
} from '@tanstack/react-router'
import { createCallRoute } from './pages/create-call'
import { onCallRoute } from './pages/on-call'
import { waitingRoomRoute } from './pages/waiting-room'

export const rootRoute = createRootRoute({
  component: () =>  <Outlet />
})

const routeTree = rootRoute.addChildren([createCallRoute, waitingRoomRoute,onCallRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

