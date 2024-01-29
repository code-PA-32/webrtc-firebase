import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { rootRoute } from '../../router.tsx'

export const onCallRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/on-call/$meetId',
  component: lazyRouteComponent(() => import('./page.tsx'), 'OnCall'),
})