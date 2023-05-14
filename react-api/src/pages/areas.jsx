import React, { useState, useEffect } from "react";
import { Autocomplete, IconButton, TextField, MenuItem } from "@mui/material";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import axios from "../api/axios";
import ConfirmModal from "../components/ConfimModal";
import Alert from "../components/Alert";
import Add from "@mui/icons-material/Add";
import { Modal, ModalDialog, Button } from "@mui/joy/";
import Input from "../components/Input";


export default function Areas() {
    const [open, setOpen] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("Crear area");
    // type_area 2 es pago y 1 es gratis
    const [newArea, setNewArea] = useState({name: '', type_area_id: 1, schedule: []})
    const handleSubmit = async (e) => {
        console.log()
    }
    const [areas, setAreas]  = useState([])
    const [tabla, setTabla] = useState();
    const columns = [
        {
            name: "name",
            label: "Nombre",
            options: {
                filter: false,
            },
        },
        {
            name: "type_area_id",
            label: "Tipo de area",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value === 1 ? "Gratis" : "Paga";
                },
            },
        },
        {
            name: "schedule",
            label: "Horario",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    // return button
                },
            },
        },
    ]
    useEffect(() => {
        setTabla(
            // <MUIDataTable
            //     isRowSelectable={true}
            //     title={'Areas'}
            //     data={asistencia}
            //     columns={columns}
            //     options={options}
            // />
        );
    }, [areas]);

    const getData = async () => {
        await axios.get("dashboard/areas").then((response) => {
            console.log(areas)
            // setAsistencia(asis);
            // setAll_areas(areas);
        });
    };
    // console.log(all_areas);

    useEffect(() => {
        getData();
        document.title = "Areas";
    }, []);

    return (
        <>
            <button
                className="mb-7 border py-2 px-3 rounded-md glass duration-100 text-white hover:bg-purple"
                onClick={() => {
                    // if (submitStatus === "Editar") {
                    //     setNewUserData({});
                    // }
                    setOpen(true);
                    // setSubmitStatus("Inscribir");
                }}
            >
                <Add className="mr-2" />
                Nueva area
            </button>


            <Modal
                open={open}
                onClose={() => setOpen(false)}
                sx={{ zIndex: "1" }}
            >
                <ModalDialog
                    aria-labelledby="basic-modal-dialog-title"
                    aria-describedby="basic-modal-dialog-description"
                    className="min-w-[465px] max-w-[465px] min-h-min"
                    style={{ overflowY: "scroll", scrollbarWidth: "none" }}
                >
                    <form onSubmit={handleSubmit} className="w-full">
                            <Input
                                label={"Nombre"}
                                key={0}
                                // onChange={handleChange}
                                value={newArea.name}
                                name={"name"}
                            />

                            <p>Tipo de area:</p>
                            <label htmlFor="gratis">
                                <input type="radio" name="type_area_id" id="gratis" value={1} />
                                <span>Gratis</span>
                            </label>
                            <label htmlFor="pago" >
                                <input type="radio" name="type_area_id" id="pago" value={2} />
                                <span>Pago</span>
                            </label>
                            {/* <Input
                                label={"Apellidos/s"}
                                key={1}
                                onChange={handleChange}
                                value={newArea.last_name}
                                name={"last_name"}
                            /> */}
                        
                        <button
                            type="submit"
                            value={submitStatus}
                            style={{
                                width: "100%",
                                background: "#A64684",
                                padding: "10px",
                                marginTop: "15px",
                                borderRadius: "5px",
                                color: "white",
                            }}
                        >
                            {submitStatus}
                        </button>
                    </form>


                    {/* {tabla} */}
                </ModalDialog>
            </Modal>
        </>
    );
}
