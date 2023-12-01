import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";
import MIDILogo from "../Harp MIDI Logo.svg";

function TailWindHome() {
    return (
        <div className="overflow-hidden py-24 sm:py-32">
            <div className="mx-16 max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="lg:pr-8 lg:pt-4">
                    <div className="lg:max-w-lg">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Generate Music</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">A simpler process</p>
                    <p className="mt-6 text-lg leading-8 text-gray-200">Utilize MIDI Sheet Music to significantly expedite the transition from MIDI to sheet music. Refer to the About section for guidance on navigating and utilizing the website effectively. For more extensive implements, create an account through gmail on the sign-up page.</p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-400 lg:max-w-none">
                        <div className="relative pl-9">
                        <dt className="inline font-semibold text-gray-300">
                            <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clipRule="evenodd" />
                            </svg>
                            Simple, yet powerful.
                        </dt>
                        <dd className="inline"> Upload a midi file and get sheet music in a matter of seconds.</dd>
                        </div>
                        <div className="relative pl-9">
                        <dt className="inline font-semibold text-gray-300">
                            <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                            </svg>
                            Secure Storage.
                        </dt>
                        <dd className="inline"> Save your files securely and download on command.</dd>
                        </div>
                        <div className="relative pl-9">
                        <dt className="inline font-semibold text-gray-300">
                            <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                            <path fillRule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clipRule="evenodd" />
                            </svg>
                            Personalization.
                        </dt>
                        <dd className="inline"> Customize the experience to your wants and needs.</dd>
                        </div>
                    </dl>
                    </div>
                </div>
                  <img src={MIDILogo} alt="Product screenshot" className="w-[48rem] h-[600px] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="2432" height="1442"/>
                </div>
            </div>
        </div>
    );
}

function TailWindFeature() {
    return (
        <div className="py-24 sm:py-32 bg-slate-500/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Analyze faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">Everything you need to analyze music</p>
            <p className="mt-6 text-lg leading-8 text-gray-300">Simple means, advanced outcomes. Analyze midi files at will.</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-300">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                  </div>
                  Intuitive Design
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-400">Explore the world of MIDI Sheet Music - your one-stop solution for transforming MIDI files into sheet music.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-300">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  Advanced Methods
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-400">Unlock advanced features to analyze and enhance your music experience</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-300">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </div>
                  Simple Process
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-400">Simplify your workflow with straightforward queues for efficient music analysis.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-300">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                    </svg>
                  </div>
                  Advanced Security
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-400">Secure files saved onto Google's proprietary database framework, firebase.</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    );
}

function Home() {
    return(
        <>
            <NavBar/>
            <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r">
                <TailWindHome/>
                <TailWindFeature/>
                <Footer/>
            </div>
        </>
    )
}

  export default Home;