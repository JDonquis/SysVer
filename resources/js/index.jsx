import React from "react";
import {createRoot} from "react-dom/client";

export default function Codereact(){

	return(

		<>
		<h1>Ready</h1>
		</>
		)
}
if(document.getElementById("codereact")){

	createRoot(document.getElementById("codereact")).render(<Codereact/>);
}