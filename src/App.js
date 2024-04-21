import Container from './components/container';
import './App.css';
import { useState } from 'react';

function App() {
  const [reren,changeRerun] = useState(true)
  
  return (
    <div className="App">
      <h1 className='tit'>Connect4</h1>
      {reren && <Container/>}
    </div>
  );
}

export default App;
