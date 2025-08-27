import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./componnents/Navbar"
import Body from "./componnents/Body"
import Login from "./componnents/Login"
import {Provider} from 'react-redux';
import appStore from "./utils/appStore";
import Feed from "./componnents/Feed";
import Profile from "./componnents/Profile";
import Connections from "./componnents/Connections";
import Request from "./componnents/Request";

function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Body/>}>
        <Route path="/login"element={<Login/>}/>
        <Route path="/profile"element={<Profile/>}/>
        <Route path="/feed"element={<Feed/>}/>
        <Route path="/connections"element={<Connections/>}/>
        <Route path="/request"element={<Request/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
