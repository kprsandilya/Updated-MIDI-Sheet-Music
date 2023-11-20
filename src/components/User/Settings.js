import { React, Fragment } from "react";
import '../../App.css';
import "../../input.css";
import classes from './Tabs.css';
import { Tabs } from '@mantine/core';
import { Text } from '@mantine/core';
import NavBar from "../NavBar.js";
import Footer from "../Footer.js";

function Demo() {
  return (
    <Tabs defaultValue="gallery" orientation="vertical" styles={classes}>
      <Tabs.List>
        <Tabs.Tab value="gallery" className="hover:bg-slate-700"><Text size="xl" c="white">Profile</Text></Tabs.Tab>
        <Tabs.Tab value="messages" className="hover:bg-slate-700"><Text size="xl" c="white">Display Settings</Text></Tabs.Tab>
        <Tabs.Tab value="settings" className="hover:bg-slate-700"><Text size="xl" c="white">Sign Out</Text></Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>
      <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
      <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
    </Tabs>
  );
}
  
function Body(){
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
        <Footer/>
      </div>
    </>
  );
};
  
export default Body;