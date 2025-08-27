import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { BASE_URL } from '../utils/constants'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "profile/view", { withCredentials: true });
      dispatch(addUser(res.data));
    }
    catch (error) {
    if (error.status == 401) {
      navigate("/login");
    }
  }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Body