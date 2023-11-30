import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from './firebase';
import { doc, setDoc } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"
import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";
 
const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/")

            const userDocRef = doc(firestore, 'users', user.uid);

            const data = {
                email: email,
                username: email,
                password: password,
                theme: "",
            }
            
            setDoc(userDocRef, data);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }
 
  return (
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
                                        type="email"
                                        label="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}  
                                        required                                    
                                        placeholder="Email address"                                
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="font-bold">
                                        Password
                                    </label>
                                    <br/>
                                    <input
                                        type="password"
                                        label="Create password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required                                 
                                        placeholder="Password"              
                                    />
                                </div>                                             
                                
                                <button
                                    type="submit" 
                                    onClick={onSubmit}                        
                                >  
                                    Sign up                                
                                </button>
                                                                            
                            </form>              
                        </div>
                        <p className="text-sm text-black text-center justify-center content-center pb-8">
                                Already have an account?{' '}
                                <NavLink to="/login" >
                                    Sign in
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
 
export default Signup;