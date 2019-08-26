import React from 'react';
import './App.css';
import AddContact from './components/addContact'
import ListContact from './components/listContact'

function App() {
  return (
    <div className="app-container">
      <AddContact/>
      <ListContact/>
    </div>
  );
}

export default App;
