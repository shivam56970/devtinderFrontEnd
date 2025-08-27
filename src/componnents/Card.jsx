import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const Card = ({ user }) => {
    console.log(user);
    const dispatch = useDispatch();
    const { _id, firstName, lastName, photoUrl, age, gender, talent } = user;
    const handleReview = async (status, id) => {
        try {
            const res = await axios.post(BASE_URL + "request/send/" + status + "/" + id, {}, { withCredentials: true });
            console.log("The response is", res);
            dispatch(removeUserFromFeed(id));
        } catch (error) {
            console.log("There is an error while" + status + "this request", error.message);
        }
    }
    return (
        <div className="card bg-base-300 w-96 shadow-lg">
            <figure>
                <img
                    src={photoUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{age + " , " + gender}</p>
                <p>{talent}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => handleReview("ignored", _id)}>Ignored</button>
                    <button className="btn btn-secondary" onClick={() => handleReview("intrested", _id)}>Intrested</button>
                </div>
            </div>
        </div>
    )
}

export default Card