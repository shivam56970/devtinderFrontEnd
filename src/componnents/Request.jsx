import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom'


const Request = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const connections = useSelector(store => store?.request);
    console.log("The connections are as follow", connections);
    const fetchRequet = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/requests/received", { withCredentials: true });
            console.log("request from the connection list is", res.data.data);
            dispatch(addRequest(res.data.data));
        } catch (error) {
            console.log("Error while fetching connections", error.message);
        }
    }

    const handleReview = async (status,_id,conn) => {
        try {
            const res = await axios.post(BASE_URL+ "request/review/" + status +"/"+_id,{},{withCredentials:true});
            console.log("The response is",res);
            dispatch(removeRequest(_id));
        } catch (error) {
            console.log("There is an error while"+status+"this request",error.message);
        }
    }

    useEffect(() => {
        fetchRequet();
    }, []);
    if (!connections) {
        return <p className='flex justify-center font-bold text-2xl pt-3'>Loading Requests...</p>;
    }
    if(connections.length === 0)
    {
        return <p className='flex justify-center font-bold text-2xl pt-3'> No More Pending request</p>
    }

    return (
        <>
            {connections.map((conn) => (
                <div key={conn.fromUserId.id} className="bg-base-300 shadow-sm w-1/2 mx-auto my-5 flex">
                    <div className='w-1/3 object-contain'>
                        <img
                            className='rounded-2xl'
                            src={conn.fromUserId.photoUrl}
                            alt={conn.fromUserId.firstName + " " + conn.fromUserId.lastName}
                        />
                    </div>
                    <div className="flex flex-col gap-3 m-4 px-4 w-full">
                        <h2 className="font-bold capitalize text-xl">{conn.fromUserId.firstName + " " + conn.fromUserId.lastName}</h2>
                        <p>{conn.fromUserId.age + "," + conn.fromUserId.gender}</p>
                        <p>{conn.fromUserId.talent}</p>
                        <div className="card-actions">
                            {<><button className="btn btn-primary" onClick={() => handleReview("rejected",conn._id,conn)}>Reject</button>
                                <button className="btn btn-secondary" onClick={()=> handleReview("accepted",conn._id,conn)}>Accept</button></>}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Request