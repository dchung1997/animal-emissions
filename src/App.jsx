import { useEffect } from 'react';
import System from './containers/System';
import Planets from './containers/Planets';

import './App.css';

function App() {
  // Awful hack.
  useEffect(() => {
    window.dispatchEvent(new Event('resize')); 
  }, [])

  return (
    <>
      <h1>Burning Meat: A New Normal</h1>
      <System/>
      <Planets/>
    </>
  )
}

export default App
