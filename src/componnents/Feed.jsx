import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import Card from './Card';
const Feed = () => {
    const feed = useSelector(store => store.feed);
    console.log("data from the feed",feed);
    const dispatch = useDispatch();
    const addUserToFeed = async () => {
    try {
        const res = await axios.get(BASE_URL+"user/feed",{withCredentials:true});
        dispatch(addFeed(res.data.data));
    }
    catch (error) {
      console.error("While sending the user to feed got this error",error.message);
    }
  }
    useEffect(()=> {
        addUserToFeed();
    },[]);
    if(!feed) return;
    if(feed.length == 0) return <h1 className='flex justify-center my-4 text-2xl font-bold'>NO More Profile on your feed</h1>;
  return (
    <div>
        <div className='flex justify-center my-6'>
            <Card user={feed[0]}/>
        </div>
    </div>
  )
}

export default Feed