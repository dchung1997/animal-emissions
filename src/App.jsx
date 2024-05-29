import { useEffect } from 'react';
import System from './containers/System';
import Planets from './containers/Planets';
import Groupings from './containers/Groupings';

import './App.css';

function App() {
  // Awful hack.
  useEffect(() => {
    window.dispatchEvent(new Event('resize')); 
  }, [])

  return (
    <>
      <h1>Burning Meat: 1.5 - 2°C by 2100</h1>
      <System/>
      <Planets/>
      <Groupings/>
    </>
  )
}

export default App
