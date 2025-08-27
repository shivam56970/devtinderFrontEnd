import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants';
const Login = () => {
    const [emailId, setEmailId] = useState("shivam@gmail.com");
    const [password, setPassword] = useState("shivam@123IsKing")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleLogin = async () => {
        const data = await axios.post("http://localhost:3000/login", { emailId, password }, { withCredentials: true });
        dispatch(addUser(data.data));
        navigate("/feed");
    }

    const handleSignup = async () => {
            
        const user = await axios.post(BASE_URL+"signup",{firstName,lastName,emailId,password},{withCredentials:true});
        console.log("Data that webt insdie the store is",user.data);
        dispatch(addUser(user.data));
        navigate("/profile")
    }
    return (
        <div className='flex justify-center'>
            <div className="card bg-base-300 w-96 shadow-sm mt-4">
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title font-extrabold text-2xl">{isSignup ? "SignUp" : "Login"}</h2>
                    {isSignup && <>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input type="text" className="input" value={firstName} onChange={(e) => {
                                setFirstName(e.target.value)
                            }} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input type="text" className="input" value={lastName} onChange={(e) => {
                                setLastName(e.target.value)
                            }} />
                        </fieldset>
                    </>}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email Id</legend>
                        <input type="text" className="input" value={emailId} onChange={(e) => {
                            setEmailId(e.target.value)
                        }} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input type="password" className="input" placeholder='Password' value={password} onChange={handlePassword} />
                    </fieldset>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={isSignup? handleSignup : handleLogin}>{isSignup ? "SignUp" : "Login"}</button>
                    </div>
                    <p className='cursor-pointer py-1' onClick={()=> setIsSignup((value) => !value)}>{isSignup?"Alread have an account click here to LogIn" : "New here Click to Sign Up"}</p>
                </div>
            </div>
        </div>
    )
}

export default Login