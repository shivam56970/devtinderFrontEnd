import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=> store.user);
  const handleLogout = async () => {
    try {
      const res = await axios.post(BASE_URL+"logout",{},{withCredentials:true});
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  {user &&
    <div className="flex gap-2">
    <div className='flex items-center'>Welcome to the page {user.firstName}</div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>

         <li>
          <Link to="/connections" className="justify-between">
            Connetions
          </Link>
        </li>

        <li>
          <Link to="/request" className="justify-between">
            Requests
          </Link>
        </li>
        
        <li>
          <Link to="/feed" className="justify-between">
            Feed
          </Link>
        </li>

        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
  }
</div>
  )
}

export default Navbar