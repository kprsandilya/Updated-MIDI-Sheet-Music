import './App.css';
import "./input.css";
import { Routes, Route } from 'react-router-dom';

import About from "./components/About.js";
import Home from "./components/Home.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/about" element={<About/>}/>
      </Routes>
    </div>
  );
}

export default App;
