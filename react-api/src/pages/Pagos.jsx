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
import "../css/pages/pagos.css";

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
    const [creditInfo, setCreditInfo] = useState({})
    const [clientSelected, setClientSelected] = useState('')
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
            setPayments(data.payments);
            setMethods(data.methods);
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

        try {
            if (submitStatus === "Registrar") {
                setSubmitStatus("cargando...");

                await axios
                    .post(`/dashboard/payments/`, newPayment)
                    .then((response) => {
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

                        
                        const paymentUpdate = response.data.payment;
                        console.log({paymentUpdate});
                        setPayments((prev) =>
                            prev.map((oldPayment) =>
                                oldPayment.id === newPayment.id
                                    ? paymentUpdate
                                    : oldPayment
                            )
                        );
                        
                setAlert({
                    open: true,
                    status: "Exito",
                    message: response.data.Message
                });

            });

               
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
                            payment_method_id,
                        });
                        setSubmitStatus("Editar");
                        setOpen(true);

                        getUserData(code);
                        getCreditsInfo(code, area_id)
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



    const getUserData = async (code) => {
        try {
            await axios
                .get(`dashboard/clients/${code}/areas`)
                .then((response) => {
                    console.log(response)
                    const client_area = response.data.client_areas;
                    setAll_areas(client_area.areas);
                    setClientSelected(client_area.name + ' '+ client_area.last_name)
                    //    const area_id = response.data.latest.schedule.area.id
                    //    const schedule_id = response.data.latest.schedule_id
                    //    setNewAttendance(prev => ({...prev, area_id, schedule_id}))
                });
        } catch (error) {
            console.log(error);
        }
    };

    const getCreditsInfo = async (code, area_id) => {
        try {
            await axios
                .get(`dashboard/clients/${code}/${area_id}/delayed/credit`)
                .then((response) => {
                    console.log(response);
                    setCreditInfo(response.data)
                });
        } catch (error) {
            console.log(error);
        }
    };
    let delayedWeeks = Math.ceil(creditInfo?.delayed?.days_late/7)
    let totalDebt = creditInfo?.delayed?.amount
    let weekspay = Math.ceil(creditInfo?.credit?.days_credit/7)
    console.log({newPayment})


    return (
        <>
            <TransparentButton
                text="Registrar pago"
                clickButtonF={() => {
                    setOpen(true);
                    setSubmitStatus("Registrar");
                    setNewPayment({});
                }}
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
                                width={300}

                                name={"código"}
                                required
                                onBlur={() => getUserData(newPayment?.code)}
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
                                disabled={!newPayment.code}
                                name="turno"
                                onChange={(e) => {
                                    
                                    setNewPayment((prev) => ({
                                        ...prev,
                                        area_id: e.target.value,
                                    }));
                                    getCreditsInfo(
                                        newPayment.code,
                                        e.target.value
                                    )
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
                        <div className="d-flex2">
                            <div>
                                <Input
                                    label={"Monto en Dolares ($)"}
                                    value={newPayment?.amount}
                                    name={"birth_date"}
                                    width={300}
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
                                {tasaDolar ? (
                                    <Input
                                        // shrink={true}
                                        // type={"Código"}
                                        label={"Monto en Bolívares (Bs)"}
                                        value={newPayment?.amountBs}
                                        name={"birth_date"}
                                        width={300}
                                        // onBlur={getLastAttended}
                                        shrink={newPayment?.amount?.length > 0 || newPayment?.amountBs?.length > 0 || submitStatus == "Editar"}
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
                                ) : (
                                    <p
                                        style={{
                                            opacity: ".7",
                                        }}
                                    >
                                        Conectese a internet para ver el
                                        equivalente en bolivares{" "}
                                    </p>
                                )}
                            </div>

                            {newPayment.code && newPayment.area_id && (
                                <ul className="infoCredit_container">
                                    <li>Precio semanal del area: <b >{all_areas?.find(obj => obj.id == newPayment.area_id).price}</b>$</li>
                                    <li>Cliente: <b> {clientSelected}</b> </li>
                                    {delayedWeeks &&  (
                                        <li>Semanas de deuda: <b style={{color: '#8f0000'}}>{delayedWeeks} </b>  </li>
                                    ) }
                                    {weekspay  &&  (
                                        <li>Semanas pagadas: <b style={{color: '#027353'}}>{weekspay} </b>  </li>
                                    ) }
                                    {creditInfo?.credit?.credit  && (
                                        <li>Abonado: {creditInfo?.credit?.credit}$</li>

                                    )}
                                    
                                    <li>Deuda:   {totalDebt  ? <b style={{color:  '#8f0000' }}>{totalDebt}$</b> : <b style={{color: '#027353'}}>0$</b> }  </li>
                                    
                                </ul>
                            )}
                        </div>

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
                                        className={`btn_radio ${
                                            newPayment.payment_method_id ==
                                            objMethods.id
                                                ? "active"
                                                : ""
                                        }`}
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
