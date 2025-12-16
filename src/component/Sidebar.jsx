import React,{useState} from "react";
import "./Sidebar.css";
import { FaPlusCircle, FaTimesCircle, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar=({onclose})=>{
    const navigate=useNavigate();
    const go=(path)=>{
        navigate(path);
        onclose();
    };

    const dash=()=>{
        navigate("/create")
    }
    return<>
    <div onClick={onclose}></div>
       <div id="side">
            <ul >
                <li><i onClick={onclose}><FaTimesCircle/></i></li>
                <li><FaUserAlt/></li>
                <li>Admin</li>
                <li id="plus" onClick={dash}><FaPlusCircle/>Create</li>
            </ul>
        </div>
    </>
}
export default Sidebar