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

let fecha = new Date(),
añoA = fecha.getFullYear(),
mesA = fecha.getMonth() + 1,
diaA = fecha.getDate();



export default function Pagos() {
    const [alert, setAlert] = useState({
        open: false,
        status: "",
        message: "",
    });

    const [modalConfirm, setModalConfirm] = useState(false);
    const [all_areas, setAll_areas] = useState([]);
    const [payments, setPayments] = useState()
    const [open, setOpen] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("Registrar");
    const [newPayment, setNewPayment] = useState({
        code: "",
        amount: "",
        area_id: "",
        payment_method_id: "",
    });
    const columns = [
        {
            name: "client_area",
            label: "Código",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    return value.client.code;
                },
            },
        },
        {
            name: "client_area",
            label: "Nombre",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    return value.client.name;
                },
            },
        },
        {
            name: "client_area",
            label: "Apellido",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    return value.client.last_name;
                },
            },
        },
        {
            name: "client_area",
            label: "Area",
            options: {
                customBodyRender: (value, tableMeta) => {
                    return value.area.name;
                },
            },
        },
        {
            name: "amount",
            label: "Monto ($)",
            options: {
                filter: false,
            },
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setAlert({ open: false, message: "", status: "" });
        }, 3000);
    }, [alert.open === true]);
    const getData = async () => {
        await axios.get("dashboard/payments").then((response) => {
            const data = response.data;
            console.log(data)
            setPayments(data.payments)
        });
    };
    console.log(payments)
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

    const deleteData = async () => {
        try {
            const id = payments[dataForDelete.indx].id;
            // const code = usuarios[dataForDelete.indx].code;
            await axios.delete(`dashboard/payments/${id}`);

            setAlert({
                open: true,
                status: "Exito",
                message: `El pago fué eliminado`,
            });
            setPayments((prev) =>
                prev.filter((eachU) => eachU.id != id)
            );

            dataForDelete.setSelectedRows([]);
        } catch (error) {
            setAlert({
                open: true,
                status: "Error",
                message: `${error.response.data.Message}`,
            });
        }
    };

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
            setNewPayment({});
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

    const options = {
        filterType: "checkbox",
        responsive: "vertical",
        selectableRowsOnClick: true,
        // selectableRowsOnClick: true,
        selectableRowsHideCheckboxes: true,
        selectableRows: "single",
        // rowsSelected:rowSelected,
        fixedHeader: true,
        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
            <div>
                <IconButton
                    title="Editar"
                    onClick={() => {
                        const indx = selectedRows.data[0].dataIndex;
                        const asis = payments[indx];
                        const asis_id = asis.id;
                        const code = asis.client.code;
                        const schedule_id = asis.schedule_id;
                        const area_id = asis.schedule.area_id;
                        setNewPayment({
                            code,
                            area_id,
                            schedule_id,
                            id: asis_id,
                        });
                        setStatusSubmit("Editar");
                    }}
                >
                    <EditIcon />
                </IconButton>

                <IconButton
                    title="Eliminar"
                    onClick={() => {
                        setModalConfirm(true);
                        setDataForDelete({
                            indx: selectedRows.data[0].dataIndex,
                            setSelectedRows: setSelectedRows,
                        });
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        ),
    };


    const [tabla, setTabla] = useState();
    useEffect(() => {
        setTabla(
            <MUIDataTable
                isRowSelectable={true}
                title={`Pagos de hoy ${diaA}/${mesA}/${añoA}`}
                data={payments}
                columns={columns}
                options={options}
            />
        );
    }, [payments]);




    return (
        <>
            <TransparentButton
                text="Registrar pago"
                clickButtonF={() => setOpen(true)}
            />
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
                        
                        <div className="d-flex2">
                        <Input
                            // shrink={true}
                            // type={"Código"}
                            label={"Código del usuario"}
                            value={newPayment?.code}
                            name={"birth_date"}
                            width={150}
                            // onBlur={getLastAttended}
                            onChange={(e) =>
                                setNewPayment((prev) => ({
                                    ...prev,
                                    code: e.target.value,
                                }))
                            }
                        />
                         <Input
                            id="outlined-select-currency"
                            select
                            label="Areas"
                            value={newPayment?.area_id}
                            defaultValue=""
                            name="turno"
                            onChange={(e) => {
                                setNewPayment((prev) => ({
                                    ...prev,
                                    area_id: e.target.value,
                                }));
                            }}
                        >
                            {all_areas.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Input>
                        </div>
                       
                         <Input
                            
                            label={"Monto en Dolares"}
                            value={newPayment?.code}
                            name={"birth_date"}
                            width={150}
                            // onBlur={getLastAttended}
                            onChange={(e) =>
                                setNewPayment((prev) => ({
                                    ...prev,
                                    code: e.target.value,
                                }))
                            }
                        />
                        <Input
                            // shrink={true}
                            // type={"Código"}
                            label={"Monto en Bolívares"}
                            value={newPayment?.code}
                            name={"birth_date"}
                            width={150}
                            // onBlur={getLastAttended}
                            onChange={(e) =>
                                setNewPayment((prev) => ({
                                    ...prev,
                                    code: e.target.value,
                                }))
                            }
                        />

                        
                        <div
                            onChange={(e) =>
                                setNewPayment((prev) => ({
                                    ...prev,
                                    payment_method_id: e.target.value,
                                }))
                            }
                        >
                            <p>Método de pago: </p>
                            <label htmlFor="Pago_móvil" 
                            style={{
                                display: "block",
                                marginBottom: "10px",
                            }}>
                                <input
                                    type="radio"
                                    name="payment_method_id"
                                    id="Pago_móvil"
                                    value={1}
                                    checked={newPayment.payment_method_id == 1}
                                />
                                <span style={{ marginLeft: "10px" }}>
                                    Pago móvil
                                </span>
                            </label>
                            <label
                                htmlFor="transferencia"
                                style={{
                                    display: "block",
                                    marginBottom: "10px",
                                }}
                            >
                                <input
                                    type="radio"
                                    name="payment_method_id"
                                    id="transferencia"
                                    checked={newPayment.payment_method_id == 2}
                                    value={2}
                                />
                                <span
                                    className="text-purple"
                                    style={{ marginLeft: "10px" }}
                                >
                                    Transferencia
                                </span>
                                
                            </label>
                            <label
                                htmlFor="efecDolar"
                                style={{
                                    display: "block",
                                    marginBottom: "10px",
                                }}
                            >
                                <input
                                    type="radio"
                                    name="payment_method_id"
                                    id="efecDolar"
                                    checked={newPayment.payment_method_id == 3}
                                    value={3}
                                />
                                <span
                                    className="text-purple"
                                    style={{ marginLeft: "10px" }}
                                >
                                    efectivo en Dolar $
                                </span>
                                
                            </label>
                            <label
                                htmlFor="efecBoli"
                                style={{
                                    display: "block",
                                    marginBottom: "10px",
                                }}
                            >
                                <input
                                    type="radio"
                                    name="payment_method_id"
                                    id="efecBoli"
                                    checked={newPayment.payment_method_id == 4}
                                    value={4}
                                />
                                <span
                                    className="text-purple"
                                    style={{ marginLeft: "10px" }}
                                >
                                    efectivo en Bolivares (Bs)
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
                aceptFunction={() => deleteData()}
            />
        </>
    );
}
