import '../App.css';
import "../input.css";
import MIDILogo from "../Harp MIDI Logo.svg";
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import firebase from 'firebase/app';
import { auth } from '../firebase_setup/firebase';

function NavBar() {

    const [user, setUser] = useState(auth.currentUser);

    function signOut() {
      auth.signOut().then(function() {
        setUser(null);
      }, function(error) {
        console.error('Sign Out Error', error);
      });
    }

    useEffect(() => {
      const user = auth.currentUser;
      if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;
      }
      
    }, [user]);

    return (
      <>
      <nav className="flex items-center justify-between flex-wrap bg-slate-400 p-4 h-18 sticky top-0 z-50">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img src={MIDILogo} alt="MIDI Logo" className="fill-current h-12 w-12 mr-2" width="54" height="54" viewBox="0 0 54 54"/>
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
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {user !== null ? 
            null
          : <>
              <Link to="/signup" className="text-md"> Sign Up </Link>
              <Link to="/login" className="px-8 text-md"> Login </Link>
            </>}
          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="relative flex rounded-full bg-white outline outline-2 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={MIDILogo}
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link to="/profile/settings" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1"> Account </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link to="/profile/settings" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1"> Display Settings </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button className="block px-4 py-2 text-sm text-gray-700" onClick={signOut}> Sign Out </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
      </>
    );
  }

  export default NavBar;