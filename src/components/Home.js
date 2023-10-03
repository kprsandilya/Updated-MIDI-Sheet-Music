import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";
import MIDILogo from "../Harp MIDI Logo.svg";
import HeroPattern from "./HeroPattern.js";

function First() {
    return(
        <div className="flex flex-row flex-grow pt-12">
            <div className="w-1/12"></div>
            <div className="h-64 w-5/6">
                <HeroPattern pttrn={'clouds-pattern'} >
                    <div className="w-full flex flex-initial place-content-center pt-12">
                        <div className="">
                            <img src={MIDILogo} alt="MIDI Logo" class="fill-current h-24 w-24 mr-2" width="36" height="36"/>
                        </div>
                        
                    </div>
                    <div className="text-center mx-4 space-y-2 pb-12">
                        <h2 className="text-black text-4xl font-bold">
                            MIDI Sheet Music
                        </h2>
                        <b>Create Sheet Music Instantly</b>
                    </div>
                </HeroPattern>
            </div>
            <div className="w-1/12"></div>
        </div>
    );
}

function Second() {
    return(
        <div className="flex flex-row pt-8">
            <div className="w-1/6"></div>
            <div className="h-48 bg-slate-400 w-2/3">
                <div className="w-full flex flex-initial place-content-center pt-4">
                    <div className="">
                        <img src={MIDILogo} alt="MIDI Logo" class="fill-current h-24 w-24 mr-2" width="24" height="24"/>
                    </div>
                    
                </div>
                <div className="text-center mx-4 space-y-2">
                    <h2 className="text-black text-4xl font-bold">
                        MIDI Sheet Music
                    </h2> 
                    <b>Create Sheet Music Instantly</b>
                </div>
            </div>
            <div className="w-1/6"></div>
        </div>
        
    );
}

function Home() {
    return(
        <>
            <NavBar/>
            <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r pb-12">
                <First/>
                <First/>
                <First/>
                <First/>
                <First/>
                <First/>
                <Footer/>
            </div>
        </>
        
    );
}

  export default Home;