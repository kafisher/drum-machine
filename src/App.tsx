import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TransportComponent } from './components/transport.component';

function App() {
  return (
    <div className="App">
      { <header className="App-header">
        <TransportComponent/>    
      </header> }
    </div>
  );
}

export default App;
