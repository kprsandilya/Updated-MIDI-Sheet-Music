// import { React, Fragment, useState, useEffect } from "react";
// import '../../App.css';
// import "../../input.css";
// import classes from './Tabs.css';
// import { Tabs } from '@mantine/core';
// import { Text } from '@mantine/core';
// import NavBar from "../NavBar.js";
// import Footer from "../Footer.js";
// import { collection, getDocs, query } from "@firebase/firestore";
// import { firestore } from '../../firebase_setup/firebase';
// import { auth } from '../../firebase_setup/firebase';

// function Demo() {
//   const [user, setUser] = useState(auth.currentUser);

//   useEffect(() => {
//     const user = auth.currentUser;
//     if (user !== null) {
//       // The user object has basic properties such as display name, email, etc.
//       const displayName = user.displayName;
//       const email = user.email;
//       const photoURL = user.photoURL;
//       const emailVerified = user.emailVerified;

//       // The user's ID, unique to the Firebase project. Do NOT use
//       // this value to authenticate with your backend server, if
//       // you have one. Use User.getToken() instead.
//       const uid = user.uid;
//     }
    
//   }, [user]);

//   async function listUserMidiFiles(user) {
//     try {
//       // Get a list of MIDI files for a specific user
//       const midiFilesRef = collection(firestore, 'users', user.uid, 'midiFiles');
//       const q = query(midiFilesRef);
//       const querySnapshot = await getDocs(q);
  
//       querySnapshot.forEach((doc) => {
//         console.log('MIDI file:', doc.id, '=>', doc.data());
//       });
//     } catch (error) {
//       console.error('Error listing user MIDI files:', error);
//     }
//   }

//   function ProfileAspects() {
//     return (
//       <Text size="xl" c="white">Profile</Text>
//     );
//   }

//   function DisplayAspects() {
//     return (
//       <Text size="xl" c="white">Display Settings</Text>
//     );
//   }

//   function FileAspects() {
//     return (
//       <div>
//         <Text size="xl" c="white">File Management</Text>
//       </div>
//     );
//   }

//   return (
//     <Tabs defaultValue="gallery" orientation="vertical" styles={classes}>
//       <Tabs.List>
//         <Tabs.Tab value="gallery" className="hover:bg-slate-700"><Text size="xl" c="white">Profile</Text></Tabs.Tab>
//         <Tabs.Tab value="messages" className="hover:bg-slate-700"><Text size="xl" c="white">Display Settings</Text></Tabs.Tab>
//         <Tabs.Tab value="settings" className="hover:bg-slate-700"><Text size="xl" c="white">File Management</Text></Tabs.Tab>
//       </Tabs.List>

//       <Tabs.Panel value="gallery"><ProfileAspects/></Tabs.Panel>
//       <Tabs.Panel value="messages"><DisplayAspects/></Tabs.Panel>
//       <Tabs.Panel value="settings"><FileAspects/></Tabs.Panel>
//     </Tabs>
//   );
// }
  
// function Body(){
//   return (
//     <>
//       <NavBar/>
//       <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r pb-12 w-full h-full">
//         <div className="h-36"></div>
//         <div className="flex flex-row">
//           <div className="w-1/6"></div>
//           <p className="text-3xl text-slate-300">Settings</p>
//         </div>
//         <div className="flex flex-row pt-12">
//           <div className="w-1/6"></div>
//           <Demo/>
//         </div>
//         <Footer/>
//       </div>
//     </>
//   );
// };
  
// export default Body;
import { useState } from 'react';
import { UnstyledButton, Tooltip, Title, rem } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './settings.css';

const mainLinksMockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconGauge, label: 'Dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: IconCalendarStats, label: 'Releases' },
  { icon: IconUser, label: 'Account' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconSettings, label: 'Settings' },
];

const linksMockdata = [
  'Security',
  'Settings',
  'Dashboard',
  'Releases',
  'Account',
  'Orders',
  'Clients',
  'Databases',
  'Pull Requests',
  'Open Issues',
  'Wiki pages',
];

export default function Body() {
  const [active, setActive] = useState('Releases');
  const [activeLink, setActiveLink] = useState('Settings');

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link.label)}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  const links = linksMockdata.map((link) => (
    <a
      className={classes.link}
      data-active={activeLink === link || undefined}
      href="#"
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link);
      }}
      key={link}
    >
      {link}
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            <MantineLogo type="mark" size={30} />
          </div>
          {mainLinks}
        </div>
        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            {active}
          </Title>

          {links}
        </div>
      </div>
    </nav>
  );
}