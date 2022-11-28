import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TransportComponent } from './components/transport.component';

function App() {
  const ctx = new AudioContext(); 
  return (
    <div className="App">
      { <header className="App-header">
        <TransportComponent ctx={ctx}/>    
      </header> }
    </div>
  );
}

export default App;
