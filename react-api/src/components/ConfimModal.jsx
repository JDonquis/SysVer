import { useState } from "react";
export default function ConfirmModal(props) {
    const [isOpen, setIsOpen] = useState(props.isOpen);
    return (
        <div id='container_modal'
            onClick={(e) => {

                   props.closeModal();
            }}
            className={`${
                props.isOpen ? "flex" : "hidden"
            } fixed w-full h-full top-0 left-0  justify-center items-center`}
        >
            <div onClick={ (e) => e.stopPropagation()} 
            className="w-[360px] min-h-[140px] flex flex-col justify-between bg-dark text-white shadow-md rounded-md p-5 text-center">
                <div>
                    <p>¿Está seguro de realizar esta acción?</p>
                    <p>{props.textInfo}</p>
                </div>
                <footer className="w-full flex justify-between mt-3">
                    <button
                        onClick={props.closeModal}
                        className="py-2 px-3 rounded-md"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            props.aceptFunction();
                            props.closeModal();
                        }}
                        className="bg-purple py-2 px-3 rounded-md text-white"
                    >
                        Confirmar
                    </button>
                </footer>
            </div>
        </div>
    );
}
// ${props.isOpen ? 'block' : 'hidden'}
