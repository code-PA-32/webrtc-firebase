import ReactDOM from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/react';
import './utils/index.ts'
import {
  RouterProvider,
} from '@tanstack/react-router'
import { router } from './router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <RouterProvider router={router}/>
  </NextUIProvider>,
)
