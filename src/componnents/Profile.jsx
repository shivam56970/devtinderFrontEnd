import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Profile = () => {
    const user = useSelector(store => store.user);
    console.log("In the Profile", user);
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [age, setAge] = useState(user?.age);
    const [gender, setGender] = useState(user?.gender);
    const [talent, setTalent] = useState(user?.talent);
    const [toast, setToast] = useState(false);
    const profile = false;

    const handleSaveProfile = async () => {
        try {

            const res = await axios.patch(BASE_URL + "profile/edit", { firstName, lastName, photoUrl, age, gender, talent }, { withCredentials: true });
            console.log("The res from the profile updation is", res);
            setToast(true);
            setTimeout(() => {
                setToast(false);
            }, 2000);

        } catch (error) {
            console.log("There is an error while updating the profile", error.message)
        }
    }
    return (
        <>
            {toast && <><div className="toast toast-top toast-start w-full items-center mt-10 z-1">
                <div className="alert alert-success w-fit">
                    <span>Saved Sucessfully</span>
                </div>
            </div></>}
            <div className='flex justify-center gap-20 mt-4'>
                <div className="card bg-base-300 w-96 shadow-sm">
                    <div className="card-body flex flex-col items-center">
                        <h2 className="card-title font-extrabold text-2xl">Edit Profile</h2>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input type="text" className="input" value={firstName} onChange={(e) => {
                                setFirstName(e.target.value)
                            }} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input type="text" className="input" placeholder='Password' value={lastName} onChange={(e) => {
                                setLastName(e.target.value)
                            }} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Photo URL</legend>
                            <input type="text" className="input" placeholder='Password' value={photoUrl} onChange={(e) => {
                                setPhotoUrl(e.target.value)
                            }} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Age</legend>
                            <input type="text" className="input" placeholder='Password' value={age} onChange={(e) => {
                                setAge(e.target.value)
                            }} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Gender</legend>
                            <input type="text" className="input" placeholder='Password' value={gender} onChange={(e) => {
                                setGender(e.target.value)
                            }} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Talent</legend>
                            <input type="text" className="input" placeholder='Password' value={talent} onChange={(e) => {
                                setTalent(e.target.value)
                            }} />
                        </fieldset>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={handleSaveProfile}>Save</button>
                        </div>
                    </div>
                </div>
                {user && <><Card user={{ firstName, lastName, photoUrl, age, gender, talent, profile }} /> </>}
            </div>
        </>
    )
}

export default Profile