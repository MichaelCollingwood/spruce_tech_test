import React from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index'
import { Main } from './main'
import { ControllerProvider } from './contexts/ControllerContext'

const root = createRoot(document.getElementById('root')!)
root.render(<ControllerProvider><Main /></ControllerProvider>)
