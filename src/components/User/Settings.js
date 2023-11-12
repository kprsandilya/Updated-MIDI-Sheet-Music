import { React, Fragment } from "react";
import '../../App.css';
import "../../input.css";
import { Tab } from "@headlessui/react";
import NavBar from "../NavBar.js";
import Footer from "../Footer.js";

function MyTabs() {
  return (
    <Tab.Group vertical className="pt-24 px-24">
      <div className="flex flex-row w-full">
        <div className="w-1/6">
          <p className="text-gray-300 text-center text-2xl">Settings</p>
          <Tab.List className="flex flex-col justify-start space-y-2 p-4 rounded-lg">
            <Tab className="text-gray-200 bg-gray-600 tab-active focus:bg-gray-100 hover:bg-gray-700 rounded-md p-2 transition duration-300 ease-in-out">Tab 1</Tab>
            <Tab className="text-gray-200 bg-gray-600 tab-active focus:bg-gray-100 hover:bg-gray-700 rounded-md p-2 transition duration-300 ease-in-out">Tab 2</Tab>
            <Tab className="text-gray-200 bg-gray-600 tab-active focus:bg-gray-100 hover:bg-gray-700 rounded-md p-2 transition duration-300 ease-in-out">Tab 3</Tab>
          </Tab.List>
        </div>
        <Tab.Panels className="p-4 w-5/6">
          <Tab.Panel className="text-white">Content 1</Tab.Panel>
          <Tab.Panel className="text-white">Content 2</Tab.Panel>
          <Tab.Panel className="text-white">Content 3</Tab.Panel>
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
}
  
function Body(){
  return (
    <>
      <NavBar/>
      <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r pb-12 w-full h-full">
        <MyTabs/>
        <Footer/>
      </div>
    </>
  );
};
  
export default Body;