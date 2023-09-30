import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";
import MIDILogo from "../Harp MIDI Logo.svg";

function First() {
    return(
        <div className="w-full h-48 flex flex-initial justify-center">
            <img src={MIDILogo} alt="MIDI Logo" class="fill-current h-12 w-12 mr-2" width="54" height="54"/>
        </div>
    );
}

function Home() {
    return(
        <>
            <NavBar/>
            <div className="bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900">
                
                <First/>
            </div>
        </>
        
    );
}

  export default Home;