import React from "react";
import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";
import webHome from "../websiteHome.png";
import processed from "../processedPage.png";
import settings from "../settings.png";

function About() {
  return(
    <div className="relative isolate overflow-hidden px-6 py-72 sm:py-32 lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:px-24 lg:grid-cols-2 lg:gap-x-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">Website Instructions</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">Process</h1>
              <p className="mt-6 text-xl leading-8 text-gray-300">Displayed to the side is the Application page of the website. Here is where the processing is done on a given midi file. Simply upload your .midi file through
              the cloud icon. While the file will not show, your file is ready to be processed. Simply press the Submit button and watch as your midi file is processed. </p>
            </div>
          </div>
        </div>
        <div className="-ml-48 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]" src={webHome} alt="" width="2432" height="1442"/>
        </div> 
        <div className="-ml-48 -mt-12 p-12 pt-[575px] lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]" src={processed} alt="" width="2432" height="1442"/>
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:px-24 lg:grid-cols-2 lg:gap-x-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-300 text-xl">
              <p>After the file has been processed, the sceen should now populate with the individual tracks contained within your uploaded file. You can play and save the overall midi file to your account if created. Now refer to the list to see how you can process that information now.</p>
              <ul className="mt-8 space-y-8 text-gray-400">
                <li className="flex gap-x-3">
                  <svg className="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clipRule="evenodd" />
                  </svg>
                  <span><strong className="font-semibold text-gray-300">Play, Pause, Stop.</strong> While only one track can be played at a time, you can play back each track individuals in the midi. When you want to play a new track, play and then stop that track. Then, play the other track.</span>
                </li>
                <li className="flex gap-x-3">
                  <svg className="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                  <span><strong className="font-semibold text-gray-300">Download the files.</strong> After processing the file, options for saving the sheet music as a svg file and pdf file will populate. Although the pdf download is still in development, the download option will be developed in the future.</span>
                </li>
                <li className="flex gap-x-3">
                  <svg className="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                    <path fillRule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clipRule="evenodd" />
                  </svg>
                  <span><strong className="font-semibold text-gray-300">Save the files</strong> Next to each of the download options, there is an option to save the files to the your account. Since the pdf format is still in development, it is not possible to save the pdfs for now.</span>
                </li>
              </ul>
              <p className="mt-8">In the future, options for downloading the pdf and saving them will be finished. Furthermore, better UI implements will be developed and launched. Thank You for using this application!</p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-300">Settings</h2>
              <p className="mt-6">Manage your settings through the picture on the nav bar. Here you will find that you can modify your username and theme. While placeholders for now, theme changes and other user-specific characteristics will later be added.
              In the settings, you can also manage the files saved to your account. As only .midi files and .svg files can be uploaded as of now, only those can be modified. You can download those files through the download button and delete files off of your account.
              To refresh after deleting the file, close and reopen the tab containing the files you want to examine.</p>
            </div>
          </div>
        </div>
        <div className="-ml-48 -mt-12 p-12 pt-[1190px] lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]" src={settings} alt="" width="2432" height="1442"/>
        </div>
      </div>
    </div>
  );
}
  
function Body(){
  return (
    <>
      <NavBar/>
      <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r pb-12">
        <About/>
        <Footer/>
      </div>
    </>
  );
};
  
export default Body;