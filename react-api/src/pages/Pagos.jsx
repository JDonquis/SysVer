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
import '../css/pages/pagos.css'

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
    const [payments, setPayments] = useState();
    const [open, setOpen] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("Registrar");
    const [newPayment, setNewPayment] = useState({
        code: "",
        amount: "",
        amountBs: "",
        area_id: "",
        payment_method_id: "",
    });
    const [methods, setMethods] = useState([]);
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

    function convert(from, to) {
        return;
    }

    useEffect(() => {
        setTimeout(() => {
            setAlert({ open: false, message: "", status: "" });
        }, 3000);
    }, [alert.open === true]);
    const getData = async () => {
        // axios.defaults.baseURL= 'http://localhost:8000/api  '

        await axios.get("dashboard/payments").then((response) => {
            const data = response.data;
            console.log(data);
            setPayments(data.payments);
            setMethods(data.methods);
            setAll_areas(data.areas)
        });
    };

    const [tasaDolar, setTasaDolar] = useState(false);

    const getEquivalent = async () => {
        try {
            await axios.get("dashboard/dollar").then((response) => {
                setTasaDolar(response.data.Data.entities[0].info.dollar);
            });
        } catch (error) {
            console.log(error);
            
        }
    };
    // console.log(payments)
    const [dataForDelete, setDataForDelete] = useState({
        indx: "",
        setSelectedRows: () => {},
    });
    useEffect(() => {
        getData();
        document.title = "Pagos";
        getEquivalent();
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
            setPayments((prev) => prev.filter((eachU) => eachU.id != id));

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
                    .post(`/dashboard/payments/`, newPayment)
                    .then((response) => {
                        console.log({ response });
                        const payment = response.data.payment;

                        setPayments((prev) => [...prev, payment]);
                    });
                setAlert({
                    open: true,
                    status: "Exito",
                    message: `El pago ha ha sido registrado`,
                });
                setSubmitStatus("Registrar");
            }
            if (submitStatus === "Editar") {
                setSubmitStatus("cargando...");
                await axios
                    .put(`/dashboard/payments/${newPayment.id}`, newPayment)
                    .then((response) => {
                        setAlert({
                            open: true,
                            status: "Exito",
                            message: `${newPayment.name} ha sido editado`,
                        });
                    });
                setPayments((prev) =>
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
                        console.log(asis)
                        const asis_id = asis.id;
                        const code = asis.client_area.client.code;
                        const area_id = asis.client_area.area.id;
                        const amount = asis.amount;
                        const payment_method_id = asis.payment_method_id;
                        setNewPayment({
                            code,
                            area_id,
                            id: asis_id,
                            amount,
                            amountBs: amount * tasaDolar,
                            payment_method_id
                        });
                        setSubmitStatus("Editar");
                        setOpen(true)
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

    console.log({ newPayment });

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
                                required
                                // onBlur={getLastAttended}
                                onChange={(e) =>
                                    setNewPayment((prev) => ({
                                        ...prev,
                                        code: e.target.value,
                                    }))
                                }
                            />
                            <TextField
                                id="outlined-select-currency"
                                select
                                required
                                label="Area"
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
                            </TextField>
                        </div>
                        <br />
                        <Input
                            label={"Monto en Dolares ($)"}
                            value={newPayment?.amount}
                            name={"birth_date"}
                            width={350}
                            required

                            // onBlur={getEquivalent}
                            onChange={(e) =>
                                setNewPayment((prev) => ({
                                    ...prev,
                                    amount: e.target.value,
                                    amountBs: (
                                        e.target.value * tasaDolar
                                    ).toFixed(2),
                                }))
                            }
                        />
                        <br />
                        <br />
                        {tasaDolar ?  (

                            <Input
                                // shrink={true}
                                // type={"Código"}
                                label={"Monto en Bolívares (Bs)"}
                                value={newPayment?.amountBs}
                                name={"birth_date"}
                                width={350}
                                // onBlur={getLastAttended}
                                // shrink={newPayment.amount.length > 0 || newPayment.amountBs.length > 0}
                                onChange={(e) =>
                                    setNewPayment((prev) => ({
                                        ...prev,
                                        amountBs: e.target.value,
                                        amount: (
                                            e.target.value / tasaDolar
                                        ).toFixed(2),
                                    }))
                                }
                            />
                        ) : <p  style={{
                            opacity: ".7",
                        }}>Conectese a internet para ver el equivalente en bolivares </p> }

                        <div
                            onChange={(e) =>
                                setNewPayment((prev) => ({
                                    ...prev,
                                    payment_method_id: e.target.value,
                                }))
                            }
                        >
                            <p
                                style={{
                                    margin: "24px 0 15px 0",
                                    opacity: ".9",
                                }}
                            >
                                Método de pago:
                            </p>
                            <div className="d-flex2 mb-5">
                                {methods.map((objMethods, i) => (
                                    <label
                                        htmlFor={`Pago${i}`}
                                        style={{
                                            display: "block",
                                            marginBottom: "8px",
                                        }}
                                        className={`btn_radio ${newPayment.payment_method_id ==
                                            objMethods.id? 'active': ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment_method_id"
                                            id={`Pago${i}`}
                                            value={objMethods.id}
                                            hidden
                                            checked={
                                                newPayment.payment_method_id ==
                                                objMethods.id
                                            }
                                        />
                                        <span style={{ marginLeft: "10px" }}>
                                            {objMethods.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
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
