import React, { useState, useEffect } from "react";
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
import TransparentButton from "../components/TransparentButton";

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
        name: "email",
        label: "Correo",
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
                return value.trim().length > 0 ? (
                    value
                ) : (
                    <div style={{ color: "#afafaf" }}>Nada</div>
                );
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

export default function Pagos() {
    const [alert, setAlert] = useState({
        open: false,
        status: "",
        message: "",
    });

    const [modalConfirm, setModalConfirm] = useState(false);

    const [open, setOpen] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("Registrar");
    const [newPayment, setNewPayment] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setAlert({ open: false, message: "", status: "" });
        }, 3000);
    }, [alert.open === true]);
    const getData = async () => {
        await axios.get("dashboard/payments").then((response) => {
            const data = response.data;
        });
    };
    const [dataForDelete, setDataForDelete] = useState({
        indx: "",
        setSelectedRows: () => {},
    });
    useEffect(() => {
        getData();
        document.title = "Pagos";
    }, []);

    function handleChange(e, i, shift) {
        // const copySchedule = [...newPayment.schedule];
        // copySchedule[i] = { ...copySchedule[i], [shift]: e.target.value };
        // setnewPayment((prev) => ({ ...prev, schedule: copySchedule }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newPayment);

        try {
            if (submitStatus === "Registrar") {
                setSubmitStatus("cargando...");

                await axios
                    .post(`/dashboard/clients/`, newPayment)
                    .then((response) => {
                        console.log({ response });
                        const client = response.data.client;
                        client.array_areas = client.areas.map((a) => a.name);
                        client.blood_name = client.blood_types.name;
                        setUsuarios((prev) => [...prev, client]);
                    });
                setAlert({
                    open: true,
                    status: "Exito",
                    message: `El usuario ${newPayment.name} ha sido creado`,
                });
                setSubmitStatus("Registrar");
            }
            if (submitStatus === "Editar") {
                setSubmitStatus("cargando...");
                await axios
                    .put(`/dashboard/clients/${newPayment.id}`, newPayment)
                    .then((response) => {
                        setAlert({
                            open: true,
                            status: "Exito",
                            message: `${newPayment.name} ha sido editado`,
                        });
                    });
                setUsuarios((prev) =>
                    prev.map((user) =>
                        user.id === newPayment.id ? newPayment : user
                    )
                );
            }
            setnewPayment({});
            setOpen(false);
        } catch (error) {
            // console.log(error);
            setAlert({
                open: true,
                status: "Error",
                message: `Algo salió mal`,
            });
            setSubmitStatus(() => (newPayment.id > 0 ? "Editar" : "Registrar"));
        }
    };
    return (
        <>
            <TransparentButton text="Registrar pago" />
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
                            shrink={true}
                            type={"date"}
                            label={"Fecha de nacimiento"}
                            value={newPayment.birth_date}
                            name={"birth_date"}
                            onChange={handleChange}
                        />
                        <div
                            onChange={(e) =>
                                setNewPayment((prev) => ({
                                    ...prev,
                                    type_payment_id: e.target.value,
                                }))
                            }
                        >
                            <label htmlFor="gratis">
                                <input
                                    type="radio"
                                    name="type_area_id"
                                    id="gratis"
                                    value={1}
                                    checked={newPayment.type_area_id == 1}
                                />
                                <span style={{ marginLeft: "10px" }}>
                                    Gratis
                                </span>
                            </label>
                            <label
                                htmlFor="pago"
                                style={{
                                    display: "block",
                                    marginBottom: "10px",
                                }}
                            >
                                <input
                                    type="radio"
                                    name="type_area_id"
                                    id="pago"
                                    checked={newPayment.type_area_id == 2}
                                    value={2}
                                />
                                <span
                                    className="text-purple"
                                    style={{ marginLeft: "10px" }}
                                >
                                    Pago
                                </span>
                            </label>
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
        </>
    );
}
