import React, { useEffect, useLayoutEffect, useState } from "react";
import "../css/basics.css";

import MUIDataTable from "mui-datatables";
import axios from "../api/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Add from "@mui/icons-material/Add";
// import Chip from '@material-ui/core/Chip';
import { IconButton, TextField, Autocomplete, MenuItem } from "@mui/material";
import { Modal, ModalDialog, Button } from "@mui/joy/";
import ConfirmModal from "../components/ConfimModal";
import { data } from "jquery";

const divFlex = {
  display:'flex', gap:'5px', marginBottom: '12px', justifyContent: 'space-between'
}
let fecha = new Date(),
añoA = fecha.getFullYear(),
mesA = fecha.getMonth() + 1,
diaA = fecha.getDate();

export default function usuarios() {
    const columns = [
        {
            name: "code",
            label: "Código",
            options: {
                filter: false,
            },
        },

        {
            name: "name",
            label: "Nombres",
            options: {
                filter: false,
            },
        },
        {
            name: "last_name",
            label: "Apellidos",
            options: {
                filter: false,
            },
        },
        {
            name: "ci",
            label: "Ci",
            options: {
                filter: false,
            },
        },
        {
            name: "birth_date",
            label: "F. de nacimiento",
            options: {
                filter: false,
            },
        },
        {
            name: "age",
            label: "Edad",
        },
        {
            name: "sex",
            label: "Sexo",
        },
        {
            name: "weight",
            label: "Peso",
            options: {
                filter: false,
            },
        },
        {
            name: "height",
            label: "altura",
            options: {
                filter: false,
            },
        },
        // {
        //     name: "blood_types",
        //     label: "Tipo de sangre",
        //     options: {
        //         customBodyRender: (value) => <div>{value.name}</div>,
        //     },
        // },
        {
            name: "address",
            label: "Dirección",
        },
        {
            name: "phone_number",
            label: "Nro de. teléfono",
            options: {
                filter: false,
            },
        },
        {
            name: "collaboration",
            label: "Colaboración",
        },
        {
            name: "areas",
            label: "Areas",
            options: {
                customBodyRender: (value) => (
                    <div>{value.map((obj) => `${obj.name}, `)}</div>
                ),
            },
        },
    ];

    const [dataForDeleteUser, setDataForDeleteUser] = useState({
        indx: "",
        setSelectedRows: () => {},
    });
    // const [rowSelected, setRowSelected] = useState([])
    const options = {
        filterType: "checkbox",
        responsive: "vertical",
        selectableRowsOnClick: true,
        // selectableRowsOnClick: true,
        selectableRows: "single",
        // rowsSelected:rowSelected,

        // onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => console.log({currentRowsSelected, allRowsSelected, rowsSelected}),

        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
            <div>
                <IconButton
                    title="Editar"
                    onClick={() =>
                        editIconClick(
                            selectedRows,
                            displayData,
                            setSelectedRows
                        )
                    }
                >
                    <EditIcon />
                </IconButton>

                <IconButton
                    title="Eliminar"
                    onClick={() => {
                        console.log({ selectedRows, displayData });
                        setModalConfirm(true);
                        setDataForDeleteUser({
                            indx: displayData[0].dataIndex,
                            setSelectedRows: setSelectedRows,
                        });
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        ),
        // expandableRowsOnClick: true,
        // onRowSelect: function(rowData, rowMeta) {console.log(rowData, rowMeta)},
    };

    function deleteUser() {
        const id_user = usuarios[dataForDeleteUser.indx].id;
        setUsuarios((prev) => prev.filter((eachU) => eachU.id != id_user));
        // const arrIndxToDelete = Object.keys(selectedRows.lookup);
        // arrIndxToDelete.forEach((v, i) => {
        //     console.log(data[v]);
        //     setData((prev) =>
        //         prev.filter((eachUser, indx) => eachUser.ci != data[v].ci)
        //     );
        // });
        dataForDeleteUser.setSelectedRows([]);
    }

    function editIconClick(selectedRows, displayData, setSelectedRows) {
        // console.log(displayData);
        const indx = displayData[0].dataIndex;
        // console.log(usuarios[indx]);
        setNewUserData(usuarios[indx]);
        setOpen(true);
        setSubmitStatus("Editar");
        // setNewUserData()
    }

    const apiUrl = "dashboard/clients";

    const [usuarios, setUsuarios] = useState([]);
    const [all_areas_db, setAll_areas_db] = useState([]);
    const [all_blood_types, setAll_blood_types] = useState([]);
    console.log(usuarios);

    const getData = async () => {
        await axios.get(apiUrl).then((response) => {
            const data = response.data;
            // console.log(data);
            setUsuarios(data.clients);
            // console.log(data)
            setAll_areas_db(data.all_areas_db);
            setAll_blood_types(data.blood_types);
        });
    };

    useEffect(() => {
        getData();
    }, []);
    const [open, setOpen] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [newUserData, setNewUserData] = useState({
        name: "",
        last_name: "",
        ci: "",
        birth_date: "",
        height: "",
        age: "",
        sex: "",
        blood_type_id: "",
        weight: "",
        address: "",
        phone_number: "",
        collaboration: "",
        areas: [],
    });

    function calculateAge(date_bith){
        let n = 0;
        let añoN, mesN, diaN;
        [añoN, mesN, diaN] = date_bith.split('-')

        n = +añoA - +añoN
        if ((mesA < mesN) || ((mesA == mesN) && (diaA < diaN))) n--
        
        return n
    }

    const [submitStatus, setSubmitStatus] = useState("Inscribir");
    console.log(newUserData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (submitStatus === "Inscribir") {
                console.log(newUserData);
                await axios.post(`/dashboard/clients/`, newUserData).then((response) => {
                    const data = response.data;
                    console.log(response)
                    // setUsuarios(prev=> [...prev, data])
                });;
            }
            if (submitStatus === "Editar") {
                await axios.update(
                    `/dashboard/clients/${newUserData.id}`,
                    setUsuarios(prev=> [...prev, newUserData])
                );
            }
        } catch (error) {
            alert(error.response.data.message);
            console.log(error.response.data);
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                color="neutral"
                className="mb-7"
                startDecorator={<Add />}
                onClick={() => setOpen(true)}
            >
                Nuevo usuario
            </Button>

            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    aria-labelledby="basic-modal-dialog-title"
                    aria-describedby="basic-modal-dialog-description"
                    className="min-w-[465px] max-w-[465px] min-h-min"
                    
                >
                    <form onSubmit={handleSubmit} className="w-full">
                        <div style={divFlex}>
                            <TextField
                                label="Nombres/s"
                                variant="outlined"
                                value={newUserData.name}
                                onChange={(e) =>
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                            />
                            <TextField
                                label="Apellidos/s"
                                variant="outlined"
                                value={newUserData.last_name}
                                onChange={(e) =>
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        last_name: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div style={divFlex}>
                            <TextField
                                label="Cédula"
                                variant="outlined"
                                value={newUserData.ci}
                                onChange={(e) =>
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        ci: e.target.value,
                                    }))
                                }
                            />
                            <TextField
                                label="Código"
                                variant="outlined"
                                value={newUserData.code}
                                disabled
                            />
                        </div>
                        <div style={divFlex}>
                            <TextField
                                type="date"
                                className="w-[223px]"
                                InputLabelProps={{ shrink: true }}
                                label="Fecha de nacimiento"
                                variant="outlined"
                                value={newUserData.birth_date}
                                onChange={(e) =>
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        birth_date: e.target.value,
                                        age: calculateAge(e.target.value)
                                    }))
                                }
                                sx={{width: 223}}
                            />
                            <TextField
                                label="Nro de teléfono"
                                variant="outlined"
                                type="tel"
                                value={newUserData.phone_number}
                                onChange={(e) =>
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        phone_number: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        <div style={divFlex}>
                            <TextField
                                id="outlined-textarea"
                                label="Dirección"
                                multiline
                                value={newUserData.address}
                                onChange={(e) =>
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        address: e.target.value,
                                    }))
                                }
                                sx={{width: 223}}

                            />
                            <TextField
                                id="outlined-textarea"
                                label="Colaboración"
                                multiline
                                value={newUserData.collaboration}
                                onChange={(e) =>
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        collaboration: e.target.value,
                                    }))
                                }
                                sx={{width: 223}}

                            />
                        </div>
                        <div style={divFlex}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="T. de sangre"
                                value={newUserData.blood_type_id}
                                onChange={(e) =>
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        blood_type_id: e.target.value,
                                    }))
                                }
                                sx={{ width: 110 }}
                            >
                                {all_blood_types.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                id="outlined-select-currency"
                                label="Sexo"
                                // defaultValue="EUR"
                                select
                                value={newUserData.sex}
                                onChange={(e) =>
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        sex: e.target.value,
                                    }))
                                }
                                sx={{ width: 110 }}
                            >
                                <MenuItem value={"F"}>F</MenuItem>
                                <MenuItem value={"M"}>M</MenuItem>
                            </TextField>

                            <TextField
                                label="Peso (kg)"
                                variant="outlined"
                                sx={{ width: 110 }}
                                value={newUserData.weight}
                                onChange={(e) =>
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        weight: e.target.value,
                                    }))
                                }
                            />
                            <TextField
                                label="Altura"
                                variant="outlined"
                                sx={{ width: 110 }}
                                value={newUserData.height}
                                onChange={(e) =>
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        height: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <Autocomplete
                            multiple 
                            onChange={(event, value) =>
                                setNewUserData((prev) => ({
                                    ...prev,
                                    areas: value,
                                }))
                            }
                            id="tags-outlined"
                            value={newUserData.areas}
                            options={all_areas_db}
                            getOptionLabel={(all_areas_db) => all_areas_db.name}
                            // defaultValue={all_areas_db[0]}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Areas inscritas"
                                />
                            )}
                        />
                        <button
                            type="submit"
                            value={submitStatus}
                            style={{width: '100%', background: '#A64684', padding: '10px', marginTop: '15px', borderRadius: '5px', color: 'white',}}
                        >
                            {submitStatus}
                        </button>
                    </form>
                </ModalDialog>   
            </Modal>

            {/* modal de confimar eliminar */}  
 
            <MUIDataTable
                isRowSelectable={true}
                title={"Tabla de Usuarios"}
                data={usuarios}
                columns={columns}
                options={options}

            />

            <ConfirmModal closeModal={()=> {
                setModalConfirm(false)
                // setRowSelected([])
            } } isOpen={modalConfirm} aceptFunction={() => deleteUser()}  />
        </>
    );
}
