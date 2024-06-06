import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login.component';
import SignUp from './signUp.component';
import NavBar from './navBar';

function App() {
  return (
    <Router>
      <div className="App">
       
            <Routes>
              <Route path="/" element={<NavBar />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/navBar" element={<NavBar />} />
             
            </Routes>

      </div>
    </Router>
  );
}

export default App;
