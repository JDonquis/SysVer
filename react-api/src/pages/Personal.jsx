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
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import "../css/pages/personal.css";

import Input from "../components/Input";

import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#069dbf",
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "#069dbf",
        },
    },
});

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

export default function Personal() {
    const [personal, setPersonal] = useState([]);
    const [all_areas_db, setAll_areas_db] = useState([]);
    const [all_blood_types, setAll_blood_types] = useState([]);
    const [permissions, setPermissions] = useState([]);
    console.log(all_areas_db);
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
            name: "email",
            label: "Correo",
            options: {
                filter: false,
            },
        },
        {
            name: "sex",
            label: "Sexo",
        },
        // {
        //     name: "permissions",
        //     label: "Permisos",
        //     options: {
        //         filter: false,
        //     },
        //     customBodyRender: (value) => {
        //         return (
        //             <button
        //                 className="relative pr-20 cursor-pointer underline text-blue"
        //                 onMouseOver={() =>
        //                     setShowSchedule({ show: true, data: value })
        //                 }
        //                 onMouseOut={() => setShowSchedule({ show: false })}
        //             >
        //                 Ver
        //             </button>
        //         );
        //     },
        // },
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
    console.log(personal[dataForDeleteUser.indx])

    const deleteUser = async () => {
        try {
            const id_user = personal[dataForDeleteUser.indx].id;
            await axios.delete(`dashboard/personal/${id_user}`);

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
            setPersonal((prev) => prev.filter((eachU) => eachU.id != id_user));

            dataForDeleteUser.setSelectedRows([]);
        } catch (error) {}
    };

    function editIconClick(selectedRows, displayData, setSelectedRows) {
        // console.log({displayData});
        const indx = selectedRows.data[0].dataIndex;
        // console.log(usuarios[indx]);
        setNewPersonal(personal[indx]);
        setOpen(true);
        setSubmitStatus("Editar");
        // setNewPersonal()
    }

    const getData = async () => {
        await axios.get("dashboard/personal").then((response) => {
            const data = response.data;
            // console.log(data);
            const personal = response.data.personal;
            console.log({data});
            // personal.forEach((user) => {
            //     user.array_areas = user.areas.map((a) => a.name);
            //     user.blood_name = user.blood_types.name;
            // });

            setPersonal(personal);
            setPermissions(response.data.permissions);
            // console.log(data)
            // setAll_areas_db(data.all_areas_db);
            // setAll_blood_types(data.blood_types);
        });
    };

    useEffect(() => {
        getData();
        document.title = "SysVer | Personal";
    }, []);
    // console.log({usuarios});
    const [open, setOpen] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [newPersonal, setNewPersonal] = useState({
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
        email: "",
        address: "",
        phone_number: "",
        permissions: new Array(permissions.length).fill({id: false})
    });

    function calculateAge(date_bith) {
        let n = 0;
        let añoN, mesN, diaN;
        [añoN, mesN, diaN] = date_bith.split("-");

        n = +añoA - +añoN;
        if (mesA < mesN || (mesA == mesN && diaA < diaN)) n--;

        return n;
    }

    const [submitStatus, setSubmitStatus] = useState("Crear");

    console.log({ newPersonal });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newPersonal);

        try {
            if (submitStatus === "Crear") {
                setSubmitStatus("cargando...");

                await axios
                    .post(`/dashboard/personal/`, newPersonal)
                    .then((response) => {
                        console.log({ response });
                        const personal = response.data.personal;
                        setPersonal((prev) => [...prev, personal]);
                    });
                setAlert({
                    open: true,
                    status: "Exito",
                    message: `El usuario ${newPersonal.name} ha sido creado`,
                });
                setSubmitStatus("Crear");
            }
            if (submitStatus === "Editar") {
                setSubmitStatus("cargando...");
                await axios
                    .put(`/dashboard/personal/${newPersonal.id}`, newPersonal)
                    .then((response) => {
                        setAlert({
                            open: true,
                            status: "Exito",
                            message: `${newPersonal.name} ha sido editado`,
                        });
                    });
                setPersonal((prev) =>
                    prev.map((user) =>
                        user.id === newPersonal.id ? newPersonal : user
                    )
                );
            }
            setNewPersonal({});
            setOpen(false);
        } catch (error) {
            // console.log(error);
            setAlert({
                open: true,
                status: "Error",
                message: `Algo salió mal`,
            });
            setSubmitStatus(() => (newPersonal.id > 0 ? "Editar" : "Crear"));
        }
    };

    const [tabla, setTabla] = useState();
    useEffect(() => {
        setTabla(
            <MUIDataTable
                isRowSelectable={true}
                title={"Personal"}
                data={personal}
                columns={columns}
                options={options}
            />
        );
    }, [personal]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        if (name === "birth_date") {
            setNewPersonal((prev) => ({
                ...prev,
                [name]: value,
                age: calculateAge(value),
            }));
        }
        setNewPersonal((prev) => ({ ...prev, [name]: value }));
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

    console.log(all_areas_db);

    function handleChangePermissions(id) {
        const updatedPermissions = [...newPersonal.permissions];
        const indexFind = updatedPermissions.findIndex((item, index) => item.id === id);
        indexFind >= 0 ? updatedPermissions.splice(indexFind, 1) : updatedPermissions.push({id: id})
        setNewPersonal(prev => ({...prev, permissions: updatedPermissions}))
        console.log(id)
    }
console.log({newPersonal})
    console.log({ permissions });
    return (
        <>
            <button
                className="mb-7 border py-2 px-3 rounded-md glass duration-100 text-white hover:bg-purple"
                onClick={() => {
                    if (submitStatus === "Editar") {
                        setNewPersonal({});
                    }
                    setOpen(true);
                    setSubmitStatus("Crear");
                }}
            >
                {" "}
                <Add className="mr-2" />
                Nuevo personal
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
                                required
                                key={0}
                                onChange={handleChange}
                                value={newPersonal.name}
                                name={"name"}
                            />

                            <Input
                                label={"Apellidos/s"}
                                required
                                key={1}
                                onChange={handleChange}
                                value={newPersonal.last_name}
                                name={"last_name"}
                            />
                        </div>
                        <div style={divFlex}>
                            <Input
                                label={"Cédula"}
                                required
                                key={2}
                                minLength={6}
                                maxLength={10}
                                value={newPersonal.ci}
                                name={"ci"}
                                onChange={handleChange}
                            />
                            <Input
                                label={"Nro de teléfono"}
                                required
                                type={"tel"}
                                key={3}
                                minLength={10}
                                maxLength={11}
                                // InputProps={{ maxLength: 14, minLength: 10 }}
                                value={newPersonal.phone_number}
                                name={"phone_number"}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={divFlex}>
                            <Input
                                shrink={true}
                                type={"date"}
                                label={"Fecha de nacimiento"}
                                value={newPersonal.birth_date}
                                name={"birth_date"}
                                required
                                onChange={handleChange}
                            />
                            <Input
                                required
                                type={"email"}
                                label={"Correo"}
                                value={newPersonal.email}
                                name={"email"}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={divFlex}>
                            <Input
                                key={5}
                                id={"outlined-textarea"}
                                label={"Dirección"}
                                multiline
                                value={newPersonal.address}
                                name={"address"}
                                onChange={handleChange}
                            />
                            <Input
                                key={5}
                                id={"outlined-textarea"}
                                label={"Contraseña"}
                                multiline
                                readOnly
                                value={newPersonal.ci}
                                name={"pasword"}
                                onChange={handleChange}
                            />
                        </div>
                        <CssTextField
                                id="outlined-select-currency"
                                label="Sexo"
                                defaultValue=""
                                select
                                value={newPersonal.sex}
                                name="sex"
                                onChange={handleChange}
                                sx={{ width: 110 }}
                            >
                                <MenuItem value={"F"}>F</MenuItem>
                                <MenuItem value={"M"}>M</MenuItem>
                            </CssTextField>
                        <div className="permisos">
                            <b>Permisos:</b>
                            {permissions.map((perm, i) => (
                                <Tooltip
                                    className="d_block"
                                    title={perm.description}
                                >
                                    <label>
                                        <input
                                            type="checkbox"
                                            name=""
                                            checked={newPersonal?.permissions?.some(v => v.id == perm.id)}
                                            className="mr_3"
                                            onChange={() => {
                                                handleChangePermissions(perm.id);
                                            }}
                                        />
                                        {perm.name}
                                    </label>
                                </Tooltip>
                            ))}
                        </div>

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