import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
        <>
            <NavBar/>
            <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r">
                <main className="flex flex-row pt-[222px] pb-28">  
                    <div className="w-4/12"/>        
                    <section className="w-4/12">
                        <div className="border-2 bg-slate-400 -mt-12">
                            <div className="pl-16 pt-8 text-lg font-sans">                                          
                                <h1 className="pb-6 font-bold"> MIDI Sheet Music </h1>                          
                                <form>                                              
                                    <div className="pb-2">
                                        <label htmlFor="email-address" className="font-bold">
                                            Email address
                                        </label>
                                        <br/>
                                        <input
                                            id="email-address"
                                            name="email"
                                            type="email"                                    
                                            required                                                                                
                                            placeholder="Email address"
                                            onChange={(e)=>setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="font-bold">
                                            Password
                                        </label>
                                        <br/>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"                                    
                                            required                                                                                
                                            placeholder="Password"
                                            onChange={(e)=>setPassword(e.target.value)}
                                        />
                                    </div>
                                                        
                                    <div>
                                        <button                                    
                                            onClick={onLogin}                                        
                                        >      
                                            Login                                                                  
                                        </button>
                                    </div>                               
                                </form>
                            </div> 
                            <p className="text-sm text-black text-center justify-center content-center pb-8 pl-0">
                                    No account yet? {' '}
                                    <NavLink to="/signup">
                                        Sign up
                                    </NavLink>
                            </p>                   
                        </div>
                    </section>
                </main>
                <Footer/>
            </div>
        </>
    )
}
 
export default Login