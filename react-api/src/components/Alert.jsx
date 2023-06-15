import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useState } from "react";

export default function Alert(props) {
    let button;
    let bgColor;
    const newOpen =props.open
    const [isOpen, setIsOpen] = useState(true)
    if (props.status == "Exito") {
        button = <CheckCircleIcon />;
        bgColor = '#027353'
        
    } else if( props.status == 'Error') {
        button = <ErrorIcon />
        bgColor= '#8f0000'
    }
    
    

    const classes =  props.open ?  'opacity-1 right-3' : 'opacity-0 -right-[300px]'

    return (
        <div className={`px-5 py-3 w-72 z-50 duration-500 text-white  rounded-md fixed  top-3  ${classes}`} style={{background: bgColor, zIndex: '1000'}}  >
            <div className="flex gap-4">
                
                {button}
                <div>
                    <b className='relative top-0.5'>{props.status} en la operación!</b>
                    <p className='text-sm'>{props.message}</p>
                </div>
            </div>
        </div>
    )
}
