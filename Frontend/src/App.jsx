import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 className='text-3xl font-bold underline text-red-500'>Hello World</h1>
      <button className='bg-blue-500 text-white p-2 rounded-md'>Click me</button>
    </div>
  )
}

export default App
