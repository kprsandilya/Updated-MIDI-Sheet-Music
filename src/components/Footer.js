import '../App.css';
import "../input.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
      <>
        <div className="w-full h-72 pb-12 px-[160px] pt-24 text-slate-400">
            <div className="flex flex-row h-4 content-end">
                    <div className="w-1/6"></div>
                    <div className="w-2/3 border-t-[1px] border-slate-600"></div>
                    <div className="w-1/6"></div>
            </div>
                <div className="grid grid-cols-5">
                    <div className="flex flex-col col-span-2">
                        <h1 className="text-2xl">Purdue Launchpad 2023-24</h1>
                        <p>______________________________</p>
                        <Link to="https://boilerlink.purdue.edu/organization/launchpad/"> BoilerLink </Link>
                        <Link to="https://www.instagram.com/launchpadpurdue/?hl=en"> Instagram </Link>
                        <Link to="https://www.facebook.com/launchpadcs/"> Facebook </Link>
                    </div>
                
                    <div className="flex flex-col col-start-3">
                    <h1 className="text-2xl text-left">This is a col</h1>
                    <p>______________________________</p>
                        <p>This is a col</p>
                        <p>This is a col</p>
                    </div>
                    <div className="flex flex-col col-start-4">
                    <h1 className="text-2xl text-left">This is a col</h1>
                        <p>______________________________</p>
                        <p>This is a col</p>
                        <p>This is a col</p>
                    </div>
                    <div className="flex flex-col col-start-5">
                    <h1 className="text-2xl text-left">This is a col</h1>
                    <p>______________________________</p>
                        <p>This is a col</p>
                        <p>This is a col</p>
                    </div>
                </div>
        </div>
      </>
    );
  }

  export default Footer;