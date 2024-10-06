import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import Home from './pages/Home'
import Kuran from './pages/Kuran'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ThemeProvider } from './components/theme-provider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router}/>
      </ThemeProvider>
    </>
  )
}

export default App
