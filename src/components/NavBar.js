import '../App.css';
import "../input.css";
import MIDILogo from "../Harp MIDI Logo.svg";
import { Link } from "react-router-dom";

function NavBar() {
    return (
      <>
      <nav className="flex items-center justify-between flex-wrap bg-slate-400 p-4 h-18">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img src={MIDILogo} alt="MIDI Logo" class="fill-current h-12 w-12 mr-2" width="54" height="54" viewBox="0 0 54 54"/>
          <span className="font-semibold text-xl tracking-tight">MIDI Sheet Music</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow space-x-6">
            <Link to="/"> Home </Link>
            <Link to="/about"> About </Link>
            <Link to="/application"> Application </Link>
            <Link to="/acknowledgements"> Acknowledgements </Link>
          </div>
        </div>
      </nav>
      
      </>
    );
  }

  export default NavBar;