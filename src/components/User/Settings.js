import React from "react";
import '../../App.css';
import "../../input.css";
import {useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import NavBar from "../NavBar.js";
import Footer from "../Footer.js";

function SettingButton({words}){
  return(
    <>
      <div className="h-8"></div>
      <div className="flex flex-row">
        <div className="w-1/12 bg-transparent"></div>
        <div className="w-5/6 h-20 pt-4 place-content-center text-16 text-white bg-transparent">
        <Tabs className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 text-white">
      <TabList>
        <Tab className="hover:bg-slate-700">Tab 1</Tab>
        <Tab className="hover:bg-slate-700">Tab 2</Tab>
        <Tab className="hover:bg-slate-700">Tab 3</Tab>
      </TabList>
      <TabPanel>
        <p>Tab 1 works!</p>
      </TabPanel>
      <TabPanel>
        <p>Tab 2 works!</p>
      </TabPanel>
      <TabPanel>
        <p>Tab 3 works!</p>
      </TabPanel>
  </Tabs>
        </div>
        <div className="w-1/12 bg-transparent"></div>
      </div>
    </>
  );
}

function UserSettings() {
  return(
      <div className="w-1/3 h-screen flex flex-initial flex-col bg-black">
        <div className="bg-slate-600 flex flex-row">
          <div className="w-full h-20 pt-4 place-content-center text-2xl">Profile Settings</div>
        </div>
        <SettingButton words="What"/>
      </div>
  );
}

function TabSettings() {
  return(
    <Tabs className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 text-white">
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanel>
        <p>Tab 1 works!</p>
      </TabPanel>
      <TabPanel>
        <p>Tab 2 works!</p>
      </TabPanel>
      <TabPanel>
        <p>Tab 3 works!</p>
      </TabPanel>
  </Tabs>
  );
}
  
function Body(){
  return (
    <>
      <NavBar/>
      <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r pb-12">
        <UserSettings/>
        <Footer/>
      </div>
    </>
  );
};
  
export default Body;