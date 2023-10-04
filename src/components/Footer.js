import '../App.css';
import "../input.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
      <>
      <div className="w-full h-72 pb-12 pl-40 pt-24 text-slate-400 border-t-4 border-transparent">
            <div className="grid grid-cols-5">
                <div className="flex flex-col">
                    <h1 className="text-xl">Purdue Launchpad 2023-24</h1>
                    <Link to="https://boilerlink.purdue.edu/organization/launchpad/"> BoilerLink </Link>
                    <Link to="https://www.instagram.com/launchpadpurdue/?hl=en"> Instagram </Link>
                    <Link to="https://www.facebook.com/launchpadcs/"> Facebook </Link>
                </div>
                <div className="flex flex-col">
                <h1 className="text-2xl">This is a col</h1>
                    <p>This is a col</p>
                    <p>This is a col</p>
                </div>
                <div className="flex flex-col">
                <h1 className="text-2xl">This is a col</h1>
                    <p>This is a col</p>
                    <p>This is a col</p>
                </div>
                <div className="flex flex-col">
                <h1 className="text-2xl">This is a col</h1>
                    <p>This is a col</p>
                    <p>This is a col</p>
                </div>
                <div className="flex flex-col">
                <h1 className="text-2xl">This is a col</h1>
                    <p>This is a col</p>
                    <p>This is a col</p>
                </div>
            </div>
      </div>
      
      </>
    );
  }

  export default Footer;