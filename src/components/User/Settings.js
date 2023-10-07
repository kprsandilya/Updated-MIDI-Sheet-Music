import React from "react";
import '../../App.css';
import "../../input.css";
import {useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import NavBar from "../NavBar.js";
import Footer from "../Footer.js";

function TabReturn() {
  return(
  <Tabs className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 text-white">
      <TabList className="">
        <Tab className="hover:bg-slate-700 h-20 pt-6 rounded-2xl pl-4 text-xl">Tab 1</Tab>
        <Tab className="hover:bg-slate-700 h-20 pt-6 rounded-2xl pl-4 text-xl">Tab 2</Tab>
        <Tab className="hover:bg-slate-700 h-20 pt-6 rounded-2xl pl-4 text-xl" >Tab 3</Tab>
      </TabList>
      <TabPanel>
          1
      </TabPanel>
      <TabPanel>
          2
      </TabPanel>
      <TabPanel>
          3
      </TabPanel>
    </Tabs>
  );
}

function SettingButton({words}){
  return(
    <>
      <div className="h-8"></div>
      <div className="flex flex-row">
        <div className="w-1/12 bg-transparent"></div>
        <div className="w-5/6 h-20 pt-4 place-content-center text-16 text-white bg-transparent">
          <TabReturn/>
        </div>
        <div className="w-1/12 bg-transparent"></div>
      </div>
    </>
  );
}

function UserSettings() {
  return(
    <div className="flex flex-row">
      <div className="w-1/3 h-screen flex flex-initial flex-col bg-gradient-to-t from-gray-600 via-gray-900 to-black">
        <div className="bg-slate-600 flex flex-row">
          <div className="w-full h-20 pt-4 place-content-center text-2xl pl-4">Profile Settings</div>
        </div>
        <SettingButton words="What"/>
      </div>
      <div className="w-2/3 h-screen flex flex-initial flex-col bg-gradient-to-t from-gray-600 via-gray-900 to-black">
        
      </div>
    </div>
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