import React from "react";
import Add from "@mui/icons-material/Add";


export default function TransparentButton(props) {
  return (
    
    <button
        className="mb-7 border py-2 px-3 rounded-md glass duration-100 text-white hover:bg-purple"
        onClick={() =>{
            props.clickButtonF();
        }}
    >
        {" "}
        <Add className="mr-2" />
        {props.text}
    </button>
  )
}

