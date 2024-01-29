import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { rootRoute } from '../../router.tsx'

export const waitingRoomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/waiting/$meetId',
  component: lazyRouteComponent(() => import('./page.tsx'), 'MeetWaitingRoom'),
})