import { React, Fragment, useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import '../../App.css';
import "../../input.css";
import classes from './Tabs.css';
import { Tabs } from '@mantine/core';
import { Text } from '@mantine/core';
import NavBar from "../NavBar.js";
import Footer from "../Footer.js";
import HeroPattern from "../HeroPattern";
import { collection, getDocs, query, doc, deleteDoc, getDoc, updateDoc } from "@firebase/firestore";
import { firestore } from '../../firebase_setup/firebase';
import { auth } from '../../firebase_setup/firebase';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Demo() {
  const [user, setUser] = useState(auth.currentUser);
  const [showResults, setSVGShow] = useState(false);
  const [showMIDIResults, setMIDIShow] = useState(false);
  const [svgDivs, setSVGDivs] = useState(null);
  const [midiDivs, setMIDIDivs] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab') || 'tab1';

  function signOut() {
    console.log("af")
    auth.signOut().then(function() {
      setUser(null);
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    navigate("/")
  }

  useEffect(() => {
    const user = auth.currentUser;
    if (user !== null) {
      setUser(user); 
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

  function ListUserSVGFiles(user) {
    setSVGShow(true);
  }

  function HideUserSVGFiles(user) {
    setSVGShow(false);
  }

  function ListUserMIDIFiles(user) {
    setMIDIShow(true);
  }

  function HideUserMIDIFiles(user) {
    setMIDIShow(false);
  }

  function ReturnDivs(divs) {
    var listItems;
    const generateKey = (pre) => {
      return `${ pre }_${ new Date().getTime() }_${Math.random()}`;
    }

    async function deleteFile(file) {
      const storage = getStorage();
      var itemRef;
      var firestoreRef;

      // Create a reference to the file to delete
      if (file.fileName.substring(file.fileName.length - 3) == 'mid') {
        try {
          firestoreRef = doc(firestore, 'users', user.uid, 'midiFiles', file.id);
        } catch {}
      } else if (file.fileName.substring(file.fileName.length - 3) == 'svg') {
        try {
          firestoreRef = doc(firestore, 'users', user.uid, 'svgFiles', file.id);
        } catch {}
      }

      if (file.fileName.substring(file.fileName.length - 3) == 'mid') {
        try {
          itemRef = ref(storage, 'midiFiles/' + user.uid + "/" + file.fileName);
        } catch {}
      } else if (file.fileName.substring(file.fileName.length - 3) == 'svg') {
        try {
          itemRef = ref(storage, 'svgFiles/' + user.uid + "/" + file.fileName);
        } catch {}
      }
      
      // Delete the document
      deleteDoc(firestoreRef)
        .then(() => {
          console.log('Document deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting document:', error);
        });
      }

    if (divs.divs !== undefined && divs.divs !== null) {
      listItems = divs.divs.map((doc) =>
        <HeroPattern className="flex items-center content-center">
          <div key={generateKey(doc.fileName)}>
            <div className="w-full flex flex-initial justify-center overflow-auto text-white flex-row py-8 divide-x divide-slate-600 border-b-2 border-slate-600">
              <div className="w-full ">{doc.fileName}</div>
              <button className="w-full "><a className="" href={doc.fileUrl}>Download!</a></button>
              <button onClick={() => deleteFile(doc)} className="w-full justify-start content-start">Delete File</button>
            </div>
          </div>
        </HeroPattern>
      );
    }
    return (
        <div className="pt-4">
          {listItems}
        </div>
    )
  }

  async function returnList() {
    var listItems = [];
  
    if (user != undefined && user != null) {
      try {
  
        const svgRef = collection(firestore, 'users', user.uid, 'svgFiles');

        const querySnapshot = await getDocs(svgRef);

        if (querySnapshot.empty) {
          console.log('No saved documents.');
          return;
        } 
  
        querySnapshot.forEach((doc) => {
          listItems.push(doc.data());
        });
    
      } catch (error) {
        console.error('Error listing user SVG files:', error);
      }
    }
    
    return listItems;
  };

  async function returnMIDIList() {
    var listItems = [];
  
    if (user != undefined && user != null) {
      try {
  
        const svgRef = collection(firestore, 'users', user.uid, 'midiFiles');

        const querySnapshot = await getDocs(svgRef);

        if (querySnapshot.empty) {
          console.log('No saved documents.');
          return;
        } 
  
        querySnapshot.forEach((doc) => {
          listItems.push(doc.data());
        });
    
      } catch (error) {
        console.error('Error listing user SVG files:', error);
      }
    }
    
    return listItems;
  };

  async function handleSave(input, element) {

    if (user !== undefined && user !== null) {
      const userDocRef = doc(firestore, 'users', user.uid);
      var existingInfo;
      
      // Fetch the existing data
      const userDoc = await getDoc(userDocRef);

      if (element === "username") {
        existingInfo = userDoc.data().username || "";
        // Update the Firestore document with the modified array
        await updateDoc(userDocRef, {
          username: input,
        });
      }

      if (element === "theme") {
        existingInfo = userDoc.data().theme || "";
        // Update the Firestore document with the modified array
        await updateDoc(userDocRef, {
          theme: input,
        });
      }

    } else {
      console.error("User not logged in");
    }
  }

  function ProfileAspects() {
    const [input, setInput] = useState('');
    if (user !== undefined && user !== null) {
      const username = user.username;
    }
    return (
      <div className="pl-8 pr-8 w-full py-6 flex space-y-8 flex-col">
        <p className="text-2xl text-white">Profile Settings</p>
        <div className="w-full">
          <div className="flex flex-row items-center">
              <p className="text-xl text-white pr-12">Change Username</p>
              {user !== undefined && user !== null? 
                <>
                  <input
                      type="username"
                      label="Email address"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}  
                      required                                    
                      placeholder={user.username}   
                      className=""                            
                  />
                  <button className="w-12 pl-12" onClick={() => handleSave(input, "username")}>Save</button>
                </> : null}
              
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-row items-center">
              <p className="text-xl text-white">Change Other Information</p>
          </div>
        </div>
      </div>
    );
  }

  function DisplayAspects() {
    const [input, setInput] = useState('');
    return (
      <div className="pl-8 pr-8 w-full py-6 flex space-y-8 flex-col">
        <p className="text-2xl text-white">Profile Settings</p>
        <div className="w-full">
          <div className="flex flex-row items-center">
              <p className="text-xl text-white pr-12">Theme</p>
              {user !== undefined && user !== null? 
              <>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Options
                      <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
                    <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Account settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleSave("Support", "theme")}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Support
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              License
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                </> : null}
              
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-row items-center">
              <p className="text-xl text-white">Change Other Information</p>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (user != null) {
      const fetchData = async () => {
        const result = await returnList();
        setSVGDivs(result); // Assuming you have a state variable for divs
        const midiResult = await returnMIDIList();
        setMIDIDivs(midiResult); // Assuming you have a state variable for divs
      };
    
      fetchData();
    }
  }, [showResults, showMIDIResults]); // Trigger the effect when user.email changes

  function FileAspects() {
    return (
      <div className="pl-8 pr-8 w-full py-6 flex space-y-8 flex-col">
        <p className="text-2xl text-white">File Management</p>
        <div className="w-full">
          <div className="flex flex-row items-center">
              <p className="text-xl text-white">MIDI Files</p>
              {showMIDIResults && user ?  <button className="text-white pl-8" onClick={() => HideUserMIDIFiles(user)}>Hide</button> : <button className="text-white pl-8" onClick={() => ListUserMIDIFiles(user)}>Display</button>}
          </div>
            {showMIDIResults && user ?  <ReturnDivs divs={midiDivs}/> : <p></p>}
        </div>
        <div>
          <div className="flex flex-row items-center">
            <p className="text-xl text-white">SVG Files</p>
            {showResults && user ?  <button className="text-white pl-8" onClick={() => HideUserSVGFiles(user)}>Hide</button> : <button className="text-white pl-8" onClick={() => ListUserSVGFiles(user)}>Display</button>}
          </div>
          {showResults && user ?  <ReturnDivs className="" divs={svgDivs}/> : <p></p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 items-start w-full">
      <Tabs defaultValue={activeTab} orientation="vertical" styles={classes}>
        <Tabs.List className="h-[146.5px]">
          <Tabs.Tab value="profile" className="hover:bg-slate-700"><Text size="lg" c="white">Profile</Text></Tabs.Tab>
          <Tabs.Tab value="display" className="hover:bg-slate-700"><Text size="lg" c="white">Display Settings</Text></Tabs.Tab>
          <Tabs.Tab value="file" className="hover:bg-slate-700"><Text size="lg" c="white">File Management</Text></Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile" className="border-2 border-slate-600 w-[1000px] flex items-start justify-start"><ProfileAspects/></Tabs.Panel>
        <Tabs.Panel value="display" className="border-2 border-slate-600 w-[1000px] flex items-start justify-start"><DisplayAspects/></Tabs.Panel>
        <Tabs.Panel value="file" className="border-2 border-slate-600 w-[1000px] flex items-start justify-start"><FileAspects/></Tabs.Panel>
      </Tabs>
      <button className="rounded w-[172px] h-[49px] text-white text-lg hover:bg-slate-700" onClick={signOut}> Sign Out </button>
    </div>
  );
}
  
function Body(){
  // State to store the dynamic height
  const [dynamicHeight, setDynamicHeight] = useState(0);

  // useEffect to calculate the dynamic height once the component is mounted
  useEffect(() => {
      const calculateDynamicHeight = () => {
          const newHeight = window.screen.availHeight - window.innerHeight;
          setDynamicHeight(newHeight * 3);
      };

      // Call the function once when the component is mounted
      calculateDynamicHeight();

      // Add an event listener to recalculate the height when the window is resized
      window.addEventListener('resize', calculateDynamicHeight);

      // Clean up the event listener on component unmount
      return () => {
      window.removeEventListener('resize', calculateDynamicHeight);
      };
  }, []); // Empty dependency array ensures the effect runs only once on mount
  return (
    <>
      <NavBar/>
      <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r pb-12 w-full h-full">
        <div className="h-36"></div>
        <div className="flex flex-row">
          <div className="w-1/6"></div>
          <p className="text-3xl text-slate-300">Settings</p>
        </div>
        <div className="flex flex-row pt-12">
          <div className="w-1/6"></div>
          <Demo/>
        </div>
        <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r" style={{ height: `${dynamicHeight}px` }}></div>
        <Footer/>
      </div>
    </>
  );
};

export default Body;