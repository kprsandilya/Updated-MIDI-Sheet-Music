import './App.css';
import "./input.css";
import { Routes, Route } from 'react-router-dom';

import About from "./components/About.js";
import Home from "./components/Home.js";
import Acknowledgements from "./components/Acknowledgements.js";
import Application from "./components/Application.js";
//import Application from "./components/ApplicationTest";
import ProfileSettings from "./components/User/Settings.js";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/about" element={<About/>}/>
        <Route path="/acknowledgements" element={<Acknowledgements/>}/>
        <Route path="/application" element={<Application/>}/>
        <Route path="/profile/settings" element={<ProfileSettings/>}/>
      </Routes>
    </div>
  );
}

export default App;
