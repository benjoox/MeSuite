import React from 'react';
import AccountList from './components/AccountList'
import Users from './components/Users'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <Users />
      <AccountList />
    </div>
  );
}

export default App;
