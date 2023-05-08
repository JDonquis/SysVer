import React, {
    useEffect,
    useLayoutEffect,
    useState,
    useCallback,
} from "react";
// import "../css/basics.css"; 

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
import Input from "../components/Input";

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

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [all_areas_db, setAll_areas_db] = useState([]);
    const [all_blood_types, setAll_blood_types] = useState([]);

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
            options: {
                filter: false,
            },
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
            name: "blood_name",
            label: "T. de sangre",
        },
        {
            name: "address",
            label: "Dirección",
            options: {
                filter: false,
            },
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
            options: {
                filter: true,
                filterOptions: {
                    names: ["Nada"],
                },
                customBodyRender: (value) => {
                    return  value.trim().length >  0 ? value :  <div  style={{color: '#afafaf'}} >Nada</div>
                    // return <div className="text-dark"> {value.trim() !== 'a' ? value : 'Nada'}</div>;
                },
            },
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

    const getData = async () => {
        await axios.get(apiUrl).then((response) => {
            const data = response.data;
            // console.log(data);
            const clients = response.data.clients;
            clients.forEach((user) => {
                user.array_areas = user.areas.map((a) => a.name);
                user.blood_name = user.blood_types.name;
            });

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
    // console.log({usuarios});
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
        blood_name: "",
        weight: "",
        address: "",
        phone_number: "",
        collaboration: "",
        areas: [],
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

    console.log({ newUserData });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newUserData);
        
        try {
            if (newUserData.collaboration.trim().length === 0) {

            }
            if (submitStatus === "Inscribir") {
                await axios
                    .post(`/dashboard/clients/`, newUserData)
                    .then((response) => {
                        const client = response.data.client;
                        client.array_areas = client.areas.map((a) => a.name);
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

    const [tabla, setTabla] = useState();
    useEffect(() => {
        setTabla(
            <MUIDataTable
                isRowSelectable={true}
                title={"Usuarios"}
                data={usuarios}
                columns={columns}
                options={options}
            />
        );
    }, [usuarios]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        if (name === "birth_date") {
            setNewUserData((prev) => ({
                ...prev,
                [name]: value,
                age: calculateAge(value),
            }));
        }
        setNewUserData((prev) => ({ ...prev, [name]: value }));
    }, []);

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

    const MyTextInput = React.memo((props) => {
        console.log(props.value);
        return (
            <TextField
                variant={"outlined"}
                label={props.label}
                onChange={props.onChange}
                value={props.value}
            />
        );
    });
  
    return ( 
        <>
            <button
                className="mb-7 border py-2 px-3 border-opacity-30 rounded-md border-dark duration-100 text-white hover:bg-yellow"
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
                            <Input
                                label={"Nombres/s"}
                                key={0}
                                onChange={handleChange}
                                value={newUserData.name}
                                name={"name"}
                            />

                            <Input
                                label={"Apellidos/s"}
                                key={1}
                                onChange={handleChange}
                                value={newUserData.last_name}
                                name={"last_name"}
                            />
                        </div>
                        <div style={divFlex}>
                            <Input
                                label={"Cédula"}
                                key={2}
                                minLength={6}
                                maxLength={10}
                                value={newUserData.ci}
                                name={"ci"}
                                onChange={handleChange}
                            />
                            <Input
                                label={"Nro de teléfono"}
                                type={"tel"}
                                key={3}
                                minLength={10}
                                maxLength={11}
                                // InputProps={{ maxLength: 14, minLength: 10 }}
                                value={newUserData.phone_number}
                                name={"phone_number"}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={divFlex}>
                            <Input
                                shrink={true}
                                type={"date"}
                                label={"Fecha de nacimiento"}
                                value={newUserData.birth_date}
                                name={"birth_date"}
                                onChange={handleChange}
                            />
                            <Input
                                key={4}
                                label={"Edad"}
                                // InputProps={{
                                //     readOnly: true,
                                // }}
                                readOnly={true}
                                value={newUserData.age}
                                shrink={newUserData.age > 0 ? true : false}
                                //     shrink: newUserData.age > 0 ? true : false,
                                // }}
                                // variant="outlined"
                            />
                        </div>

                        <div style={divFlex}>
                            <Input
                                key={5}
                                id={"outlined-textarea"}
                                label={"Dirección"}
                                multiline
                                value={newUserData.address}
                                name={"address"}
                                onChange={handleChange}
                            />
                            <Input
                                key={6}
                                id={"outlined-textarea"}
                                label={"Colaboración"}
                                multiline
                                value={newUserData.collaboration}
                                name={"collaboration"}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={divFlex}>
                            <TextField
                                sx={{ width: 110 }}
                                id="outlined-select-currency"
                                select
                                label="T. de sangre"
                                value={newUserData.blood_types?.id}
                                defaultValue=""
                                name="blood_types"
                                onChange={(e) => {
                                    let obj_blood = all_blood_types.find(
                                        (obj) => obj.id === e.target.value
                                    );
                                    setNewUserData((prev) => ({
                                        ...prev,
                                        blood_types: obj_blood,
                                        blood_name: obj_blood.name,
                                    }));
                                }}
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
                                defaultValue=""
                                select
                                value={newUserData.sex}
                                name="sex"
                                onChange={handleChange}
                                sx={{ width: 110 }}
                            >
                                <MenuItem value={"F"}>F</MenuItem>
                                <MenuItem value={"M"}>M</MenuItem>
                            </TextField>

                            <Input
                                label={"Peso (kg)"}
                                variant={"outlined"}
                                key={7}
                                width={110}
                                value={newUserData.weight}
                                name={"weight"}
                                onChange={handleChange}
                            />
                            <Input
                                label={"Altura"}
                                key={8}
                                variant={"outlined"}
                                width={110}
                                value={newUserData.height}
                                name={"height"}
                                onChange={handleChange}
                            />
                        </div>
                        <Autocomplete
                            multiple
                            name="areas"
                            onChange={(event, value) => {
                                const arr_areas = value.map((a) => a.name);
                                setNewUserData((prev) => ({
                                    ...prev,
                                    areas: value,
                                    array_areas: arr_areas,
                                }));
                            }}
                            id="tags-outlined"
                            value={newUserData.areas}
                            options={all_areas_db}
                            getOptionLabel={(all_areas_db) => all_areas_db.name}
                            defaultValue={newUserData.array_areas}
                            isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                            }
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

            {tabla}

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
