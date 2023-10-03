import '../App.css';
import "../input.css";
import MIDILogo from "../Harp MIDI Logo.svg";
import { Link } from "react-router-dom";

function NavBar() {
    return (
      <>
      <nav className="flex items-center justify-between flex-wrap bg-slate-400 p-4 h-18 sticky top-0 z-50">
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
        <div class="relative ml-3">
          <div>
            <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <img class="h-8 w-8 rounded-full" src={MIDILogo} alt="user-logo"/>
            </button>
          </div>
          <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            <Link to="/profile/settings" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1"> About </Link>
            <Link to="/about" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1"> About </Link>
            <Link to="/about" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1"> About </Link>
          </div>
        </div>
      </nav>
      
      </>
    );
  }

  export default NavBar;