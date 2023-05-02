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

export default function usuarios() {
    const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    const columns = [
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
            name: "data_birth",
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
                customBodyRender: (value) => <div>{value.join(", ")}</div>,
            },
        },
    ];

    const options = {
        filterType: "checkbox",
        responsive: "vertical",
        selectableRowsOnClick: true,
        // selectableRowsOnClick: true,
        selectableRows: "multiple",
        // onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => console.log({currentRowsSelected, allRowsSelected, rowsSelected}),

        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
            <div>
                <IconButton
                    onClick={() => console.log(displayData)}
                    title="Editar"
                >
                    <EditIcon />
                </IconButton>

                <IconButton
                    onClick={() =>
                        deleteRow(selectedRows, displayData, setSelectedRows)
                    }
                    title="Eliminar"
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        ),
        // expandableRowsOnClick: true,
        // onRowSelect: function(rowData, rowMeta) {console.log(rowData, rowMeta)},
    };

    function deleteRow(selectedRows, displayData, setSelectedRows) {
        const arrIndxToDelete = Object.keys(selectedRows.lookup);
        arrIndxToDelete.forEach((v, i) => {
            console.log(data[v]);
            setData((prev) =>
                prev.filter((eachUser, indx) => eachUser.ci != data[v].ci)
            );
        });
        setSelectedRows([]);
    }

    const apiUrl = "dashboard/clients";

    const [usuarios, setUsuarios] = useState([]);
    const getData = async () => {
        await axios.get(apiUrl).then((response) => {
            const data = response.data;
            // console.log(data);
            setUsuarios(data.clients);
        });
    };

    useEffect(() => {
        getData();
    }, []);
    const [open, setOpen] = useState(false);

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

    console.log(newUserData);
    const [all_areas_bd, setAll_areas_bd] = useState([
        "gym",
        "boxeo",
        "baile",
        "merequetengue",
    ]);

    const all_blood_types = [
        {
          value: 'USD',
          label: '$',
        },
        {
          value: 'EUR',
          label: '€',
        },
        {
          value: 'BTC',
          label: '฿',
        },
        {
          value: 'JPY',
          label: '¥',
        },
      ];
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
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            setOpen(false);
                        }}
                        className="w-full"
                    >
                        <div className="flex gap-2 mb-5 justify-between">
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
                                onChange={(e) =>
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        last_name: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="flex gap-2 mb-5 justify-between">
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
                                value={"jdfjia"}
                                disabled
                            />
                        </div>
                        <div className="flex gap-2 mb-5 justify-between">
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
                                    }))
                                }
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

                        <div className="flex gap-2 mb-5 justify-between">
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
                            />
                        </div>
                        <div className="flex gap-2 mb-5 justify-between">
                            {/* <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={bloodTypes}
                                value={newUserData.blood_type_id}
                                onChange={(e, newValue) =>
                                    setNewUserData(prev => ({...prev, blood_type_id: e.target.value}))
                                }
                                sx={{ width: 110 }}
                                className="pr-0"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="T. de sangre"
                                    />
                                )}
                            /> */}
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Select"
                                defaultValue="EUR"
                                helperText="Please select your currency"
                            >
                                {currencies.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                id="outlined-select-currency"
                                label="Sexo"
                                // defaultValue="EUR"
                                value={10}
                                onChange={(e) =>
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        sex: e.target.value,
                                    }))
                                }
                                sx={{ width: 110 }}
                            >
                                <MenuItem value={10}>F</MenuItem>
                                <MenuItem value={20}>M</MenuItem>
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
                            id="tags-outlined"
                            options={all_areas_bd}
                            // getOptionLabel={(option) => option.title}
                            defaultValue={[all_areas_bd[0]]}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Areas inscritas"
                                />
                            )}
                        />
                        <Button type="submit" className="w-full bg_purple mt-5">
                            Guardar
                        </Button>
                    </form>
                </ModalDialog>
            </Modal>
            <MUIDataTable
                isRowSelectable={true}
                title={"Tabla de Usuarios"}
                data={usuarios}
                columns={columns}
                options={options}
            />
        </>
    );
}
