import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { rootRoute } from '../../router.tsx'

export const createCallRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazyRouteComponent(() => import('./page.tsx'), 'CreateCall'),
})