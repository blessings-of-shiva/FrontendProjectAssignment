import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";
import Sidebar  from './sidebar';
import {  FaListAlt, FaPlusCircle, FaUserAlt } from 'react-icons/fa';
const Navbar = () => {
  const navigate=useNavigate();
   const home=()=>{
    navigate("/create");
   }

   //toggle sidebar
   const [sidebar,setSidebar]=useState(false);
   const openSidebar=()=>{
    setSidebar(true);
   }
   const closeSidebar=()=>{
    setSidebar(false);
   }
  return <>
  {sidebar && <Sidebar onclose={closeSidebar} />}
<div id='adnav'>
  
  <h1>BlogHub</h1>
      <ul>
        <li onClick={home}><i><FaPlusCircle/></i>Create</li>
        <li>Admin</li>
        <li><FaUserAlt/></li>
      </ul>
      <i id='menuicon' onClick={openSidebar}><FaListAlt/></i>
  </div>

  </>
}

export default Navbar