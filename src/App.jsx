import { useEffect } from 'react';
import System from './containers/System';
import Production from './containers/Production';
import Nutrition from './containers/Nutrition';
import Groupings from './containers/Groupings';

import './App.css';

function App() {
  // Awful hack.
  useEffect(() => {
    window.dispatchEvent(new Event('resize')); 
  }, [])

  return (
    <>
      <h1>Burning Meat: Living in a 3°C - 4°C World by 2100</h1>
      <System/>
      <Production/>
      <Nutrition/>
    </>
  )
}

export default App
