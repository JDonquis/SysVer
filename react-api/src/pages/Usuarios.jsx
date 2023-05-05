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
import Alert from "../components/Alert";

const divFlex = {
    display: "flex",
    gap: "5px",
    marginBottom: "15px",
    justifyContent: "space-between",
};
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
        {
            name: "blood_types",
            label: "T. de sangre",
            options: {
                customBodyRender: (value) => <div>{value.name}</div>,
            },
        },
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
            name: "array_areas",
            label: "Areas",
            options: {
                customBodyRender: (value, tableMeta) => {
                    // console.log({value, tableMeta})
                    return <div>{value.map((area) => `${area} `)}</div>;
                },
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
        selectableRowsHideCheckboxes: true,
        selectableRows: "single",
        // rowsSelected:rowSelected,
        fixedHeader: true,
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
                        // console.log({ selectedRows, displayData });
                        setModalConfirm(true);
                        setDataForDeleteUser({
                            indx: selectedRows.data[0].dataIndex,
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

    const deleteUser = async () => {
        try {
            const id_user = usuarios[dataForDeleteUser.indx].id;
            const code = usuarios[dataForDeleteUser.indx].code;

            await axios.delete(`dashboard/clients/${id_user}`);

            // const arrIndxToDelete = Object.keys(selectedRows.lookup);
            // arrIndxToDelete.forEach((v, i) => {
            //     console.log(data[v]);
            //     setData((prev) =>
            //         prev.filter((eachUser, indx) => eachUser.ci != data[v].ci)
            //     );
            // });
            setAlert({
                open: true,
                status: "Exito",
                message: `El usuario ha sido Eliminado`,
            });
            setUsuarios((prev) => prev.filter((eachU) => eachU.id != id_user));

            dataForDeleteUser.setSelectedRows([]);
        } catch (error) {}
    };

    function editIconClick(selectedRows, displayData, setSelectedRows) {
        // console.log({displayData});
        const indx = selectedRows.data[0].dataIndex;
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

    const getData = async () => {
        await axios.get(apiUrl).then((response) => {
            const data = response.data;
            // console.log(data);
            const clients = response.data.clients
            clients.forEach(user => {
                user.array_areas = user.areas.map(a => a.name)
            })
            
            setUsuarios(clients);
            // console.log(data)
            setAll_areas_db(data.all_areas_db);
            setAll_blood_types(data.blood_types);
        });
    };

    useEffect(() => {
        getData();
        document.title = "SysVer | Usuarios";
    }, []);
    console.log({usuarios});
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
        blood_types: {},
        weight: "",
        address: "",
        phone_number: "",
        collaboration: "",
        areas: {},
    });

    function calculateAge(date_bith) {
        let n = 0;
        let añoN, mesN, diaN;
        [añoN, mesN, diaN] = date_bith.split("-");

        n = +añoA - +añoN;
        if (mesA < mesN || (mesA == mesN && diaA < diaN)) n--;

        return n;
    }

    const [submitStatus, setSubmitStatus] = useState("Inscribir");
    console.log(newUserData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (submitStatus === "Inscribir") {
                await axios
                    .post(`/dashboard/clients/`, newUserData)
                    .then((response) => {
                        const client = response.data.client;
                        client.array_areas = client.areas.map(a => a.name)
                                    setUsuarios((prev) => [...prev, client]);
                    });
                setAlert({
                    open: true,
                    status: "Exito",
                    message: `El usuario ${newUserData.name} ha sido creado`,
                });
                setOpen(false);
            }
            if (submitStatus === "Editar") {
                setSubmitStatus("cargando...");
                await axios
                    .put(`/dashboard/clients/${newUserData.id}`, newUserData)
                    .then((response) => {
                        setAlert({
                            open: true,
                            status: "Exito",
                            message: `${newUserData.name} ha sido editado`,
                        });
                    });
                setUsuarios((prev) =>
                    prev.map((user) =>
                        user.id === newUserData.id ? newUserData : user
                    )
                );
                setOpen(false);
            }
        } catch (error) {
            console.log(error.response.data);
            setAlert({
                open: true,
                status: "Error",
                message: `Algo salió mal`,
            });
            setSubmitStatus(() =>
                newUserData.id > 0 ? "Editar" : "Inscribir"
            );
        }
    };

    const [alert, setAlert] = useState({
        open: false,
        status: "",
        message: "",
    });
    useEffect(() => {
        setTimeout(() => {
            setAlert({ open: false, message: "", status: "" });
        }, 3000);
    }, [alert.open === true]);
    return (
        <>
            <button
                className="mb-7 border py-2 px-3 border-opacity-40 rounded-md border-dark"
                onClick={() => {
                    setOpen(true);
                    setNewUserData({});
                    setSubmitStatus("Inscribir");
                }}
            >
                {" "}
                <Add className="mr-2" />
                Nuevo usuario
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
                                sx={{ width: 223 }}
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
                                sx={{ width: 223 }}
                            />
                        </div>
                        <div style={divFlex}>
                            <TextField
                                label="Cédula"
                                inputProps={{ minLength: 6, maxLength: 10 }}
                                variant="outlined"
                                value={newUserData.ci}
                                onChange={(e) =>
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        ci: e.target.value,
                                    }))
                                }
                                sx={{ width: 223 }}
                            />
                            <TextField
                                label="Código"
                                variant="outlined"
                                value={newUserData.code}
                                disabled
                                sx={{ width: 223 }}
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
                                        age: calculateAge(e.target.value),
                                    }))
                                }
                                sx={{ width: 223 }}
                            />
                            <TextField
                                label="Nro de teléfono"
                                variant="outlined"
                                type="tel"
                                inputProps={{ maxLength: 14, minLength: 10 }}
                                value={newUserData.phone_number}
                                onChange={(e) =>
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        phone_number: e.target.value,
                                    }))
                                }
                                sx={{ width: 223 }}
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
                                sx={{ width: 223 }}
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
                                sx={{ width: 223 }}
                            />
                        </div>
                        <div style={divFlex}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="T. de sangre"
                                value={newUserData.blood_types?.id}
                                onChange={(e) => {
                                    let obj_blood = all_blood_types.find(
                                        (obj) => obj.id === e.target.value
                                    );
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        blood_types: obj_blood,
                                    }));
                                }}
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
                            onChange={(event, value) => {
                                const arr_areas = value.map(a => a.name);
                                setNewUserData((prev) => ({
                                    ...prev,
                                    areas: value,
                                    array_areas: arr_areas
                                }));
                            }}
                            id="tags-outlined"
                            value={newUserData.areas}
                            options={all_areas_db}
                            getOptionLabel={(all_areas_db) => all_areas_db.name}
                            defaultValue={newUserData.areas}
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

            <Alert
                open={alert.open}
                status={alert.status}
                message={alert.message}
            />

            <ConfirmModal
                closeModal={() => {
                    setModalConfirm(false);
                    // setRowSelected([])
                }}
                isOpen={modalConfirm}
                aceptFunction={() => deleteUser()}
            />
        </>
    );
}
