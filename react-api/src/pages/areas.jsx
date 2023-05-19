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
import "../css/pages/areas.css";

const lettersDay = [
    { id: 1, letter: "L" },
    { id: 2, letter: "M" },
    { id: 3, letter: "X" },
    { id: 4, letter: "J" },
    { id: 5, letter: "V" },
    { id: 6, letter: "S" },
];

const eachLetterStyled = {};

export default function Areas() {
    const [alert, setAlert] = useState({
        open: false,
        status: "",
        message: "",
    });
    
    const [modalConfirm, setModalConfirm] = useState(false);
    
    const [open, setOpen] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("Crear area");
    const [shifts, setShifts] = useState([]);
    // type_area 2 es pago y 1 es gratis
    const [newArea, setNewArea] = useState({
        name: "",
        type_area_id: 1,
        schedules: [],
        price: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (submitStatus === "Crear area") {
                await axios
                    .post(`/dashboard/areas/`, newArea)
                    .then((response) => {
                        console.log({ response });
                        // const client = response.data.client;
                        // client.array_areas = client.areas.map((a) => a.name);
                        // client.blood_name = client.blood_types.name
                        // setUsuarios((prev) => [...prev, client]);
                    });
                setAlert({
                    open: true,
                    status: "Exito",
                    message: `El usuario ha sido creado`,
                });
            }
        } catch (error) {
            setAlert({
                open: true,
                status: "Error",
                message: `${error.response.data.Message}`,
            });
        }
    };
    const [areas, setAreas] = useState([]);
    const [tabla, setTabla] = useState();
    const [showSchedule, setShowSchedule] = useState({ show: false, data: [] });
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
                    return (
                        <button
                            className="relative pr-20"
                            onMouseOver={() =>
                                setShowSchedule({ show: true, data: value })
                            }
                            onMouseOut={() => setShowSchedule({ show: false })}
                        >
                            Ver
                        </button>
                    );
                },
            },
        },
    ];

    useEffect(() => {
        setTabla(
            <MUIDataTable
                isRowSelectable={true}
                title={"Areas"}
                data={areas}
                columns={columns}
                options={options}
            />
        );
    }, [areas]);

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
                        // const indx = selectedRows.data[0].dataIndex;
                        // const asis = asistencia[indx];
                        // const asis_id = asis.id;
                        // const code = asis.client.code;
                        // const schedule = asis.schedule;
                        // const area_id = asis.schedule.area_id;
                        // setNewAttendance({
                        //     code,
                        //     area_id,
                        //     schedule,
                        //     id: asis_id,
                        // });
                        // setStatusSubmit("Editar");
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
    useEffect(() => {
        setTimeout(() => {
            setAlert({ open: false, message: "", status: "" });
        }, 3000);
    }, [alert.open === true]);
    const getData = async () => {
        await axios.get("dashboard/areas").then((response) => {
            // setAll_areas(areas);
            const data = response.data;
            console.log(response);
            setAreas(data.areas);
            setShifts(data.shifts);
        });
    };
    // console.log(all_areas);
    const [dataForDelete, setDataForDelete] = useState({
        indx: "",
        setSelectedRows: () => {},
    });
    useEffect(() => {
        getData();
        document.title = "Areas";
    }, []);


    const deleteUser = async () => {
        try {
            const id = areas[dataForDelete.indx].id;
            // const code = usuarios[dataForDeleteUser.indx].code;
            await axios.delete(`dashboard/areas/${id}`);

            setAlert({
                open: true,
                status: "Exito",
                message: `La area ha sido Eliminada`,
            });
            setAreas((prev) =>
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
        
    const [listOfdays, setListOfDats] = useState();

    function getDays(days) {
        // console.log(days)

        lettersDay.forEach((v, i) => {
            if (days[i]) {
                console.log("ready");
                // console.log(days[i].id);
                // return <b>{v.letter}</b>
                return "1";
            } else {
                console.log("undifined");
                // return '<'span className="opacity-40">{v.letter}</span>;
                return "2";
            }
            // v.id == days[i].id ? (
            <b>{v.letter}</b>;
            // ) : (
            // )
        });
    }

    function handleChangeShift(e, i, shift) {
        const copySchedules = [...newArea.schedules];
        copySchedules[i] = { ...copySchedules[i], [shift]: e.target.value };
        setNewArea((prev) => ({ ...prev, schedules: copySchedules }));
    }
    const newAreaSize = newArea.schedules.length;
    console.log(newAreaSize);
    const handleCheck = (event, scheIndx) => {
        const copySchedules = [...newArea.schedules];
        // let updatedList = [...newArea.schedules[scheIndx].days];
        // console.log(updatedList)
        if (event.target.checked) {
            if (!copySchedules[scheIndx].days) {
                copySchedules[scheIndx].days = [{ id: event.target.value }];
            } else {
                copySchedules[scheIndx].days.push({ id: event.target.value });
            }
        } else {
            copySchedules[scheIndx].days = copySchedules[scheIndx].days.filter(
                (objDay) => objDay.id != event.target.value
            );
        }
        setNewArea((prev) => ({ ...prev, schedules: copySchedules }));
        // console.log(newArea)
    };

    console.log(newArea);
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
                    style={{
                        overflowY: "scroll",
                        scrollbarWidth: "none",
                        width: "830px",
                        minWidth: "600px",
                    }}
                >
                    <form onSubmit={handleSubmit} className="w-full h-full">
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                height: "100%",
                                gap: "42px",
                            }}
                        >
                            <div>
                                <Input
                                    label={"Nombre"}
                                    onChange={(e) =>
                                        setNewArea((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                    value={newArea.name}
                                    width={"100%"}
                                    name={"name"}
                                    key={0}
                                />

                                <p style={{ marginTop: "20px", opacity: ".7" }}>
                                    Tipo de area:
                                </p>

                                <div
                                    onChange={(e) =>
                                        setNewArea((prev) => ({
                                            ...prev,
                                            type_area_id: e.target.value,
                                        }))
                                    }
                                >
                                    <label htmlFor="gratis">
                                        <input
                                            type="radio"
                                            name="type_area_id"
                                            id="gratis"
                                            value={1}
                                            checked={newArea.type_area_id == 1}
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
                                            checked={newArea.type_area_id == 2}
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
                                {newArea.type_area_id == 2 && (
                                    <Input
                                        label={"Precio"}
                                        key={1}
                                        onChange={(e) =>
                                            setNewArea((prev) => ({
                                                ...prev,
                                                price: e.target.value,
                                            }))
                                        }
                                        width={"100%"}
                                        value={newArea.price}
                                        name={"price"}
                                    />
                                )}
                            </div>
                            <div>
                                <p className="title">horarios</p>
                                <ul className="horarios">
                                    {newArea.schedules.map((sche, scheIndx) => {
                                        return (
                                            <li className="active">
                                                <div className="number_list">
                                                    {scheIndx + 1}
                                                </div>
                                                <div className="container_selectAndLetters">
                                                    <div className="select_container">
                                                        <TextField
                                                            id="outlined-select-currency"
                                                            select
                                                            value={
                                                                newArea
                                                                    .schedules[
                                                                    scheIndx
                                                                ].shift_start
                                                            }
                                                            defaultValue=""
                                                            onChange={(e) =>
                                                                handleChangeShift(
                                                                    e,
                                                                    scheIndx,
                                                                    "shift_start"
                                                                )
                                                            }
                                                        >
                                                            {shifts.map(
                                                                (obj) => (
                                                                    <MenuItem
                                                                        key={
                                                                            obj.id
                                                                        }
                                                                        value={
                                                                            obj.id
                                                                        }
                                                                    >
                                                                        {
                                                                            obj.start
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </TextField>

                                                        <TextField
                                                            id="outlined-select-currency"
                                                            select
                                                            value={
                                                                newArea
                                                                    .schedules[
                                                                    scheIndx
                                                                ].shift_end
                                                            }
                                                            defaultValue=""
                                                            name="turno"
                                                            onChange={(e) =>
                                                                handleChangeShift(
                                                                    e,
                                                                    scheIndx,
                                                                    "shift_end"
                                                                )
                                                            }
                                                        >
                                                            {shifts.map(
                                                                (obj) => (
                                                                    <MenuItem
                                                                        key={
                                                                            obj.id
                                                                        }
                                                                        value={
                                                                            obj.id
                                                                        }
                                                                    >
                                                                        {
                                                                            obj.end
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </TextField>
                                                    </div>
                                                    <div className="lettersContainer">
                                                        {lettersDay.map(
                                                            (v, i) => (
                                                                <label
                                                                    className={
                                                                        sche.days?.some(
                                                                            (
                                                                                objDay
                                                                            ) =>
                                                                                objDay.id ==
                                                                                v.id
                                                                        )
                                                                            ? "active"
                                                                            : ""
                                                                    }
                                                                >
                                                                    <input
                                                                        value={
                                                                            v.id
                                                                        }
                                                                        type="checkbox"
                                                                        hidden
                                                                        checked={newArea.schedules[
                                                                            scheIndx
                                                                        ].days?.some(
                                                                            (
                                                                                dayObj
                                                                            ) =>
                                                                                v.id ==
                                                                                dayObj.id
                                                                        )}
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleCheck(
                                                                                e,
                                                                                scheIndx
                                                                            )
                                                                        }
                                                                    />

                                                                    <span>
                                                                        {
                                                                            v.letter
                                                                        }
                                                                    </span>
                                                                </label>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                <div
                                                    className="close_schedule"
                                                    onClick={() =>
                                                        setNewArea((prev) => ({
                                                            ...prev,
                                                            schedules:
                                                                prev.schedules.filter(
                                                                    (sche, i) =>
                                                                        i !=
                                                                        scheIndx
                                                                ),
                                                        }))
                                                    }
                                                >
                                                    X
                                                </div>
                                            </li>
                                        );
                                    })}
                                    {(newAreaSize === 0 ||
                                        (newArea.schedules[newAreaSize - 1]
                                            .shift_end > 0 &&
                                            newArea.schedules[newAreaSize - 1]
                                                .days?.length > 0)) && (
                                        <li
                                            style={{
                                                opacity: ".5",
                                            }}
                                        >
                                            <div className="number_list">
                                                {newAreaSize + 1}
                                            </div>
                                            <div className="container_selectAndLetters">
                                                <div className="select_container">
                                                    <TextField
                                                        id="outlined-select-currency"
                                                        select
                                                        // value={newAttendance?.schedule}
                                                        defaultValue=""
                                                        onChange={(e) =>
                                                            handleChangeShift(
                                                                e,
                                                                newAreaSize,
                                                                "shift_start"
                                                            )
                                                        }
                                                    >
                                                        {shifts.map((obj) => (
                                                            <MenuItem
                                                                key={obj.id}
                                                                value={obj.id}
                                                            >
                                                                {obj.start}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                    <TextField
                                                        id="outlined-select-currency"
                                                        select
                                                        // value={newAttendance?.schedule}
                                                        defaultValue=""
                                                        onChange={(e) =>
                                                            handleChangeShift(
                                                                e,
                                                                newAreaSize,
                                                                "shift_end"
                                                            )
                                                        }
                                                    >
                                                        {shifts.map((obj) => (
                                                            <MenuItem
                                                                key={obj.id}
                                                                value={obj.id}
                                                            >
                                                                {obj.end}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </div>
                                                <div className="lettersContainer">
                                                    {lettersDay.map((v, i) => (
                                                        <label
                                                            className={
                                                                newArea.schedules[
                                                                    newAreaSize
                                                                ]?.days?.some(
                                                                    (objDay) =>
                                                                        objDay.id ==
                                                                        v.id
                                                                )
                                                                    ? "active"
                                                                    : ""
                                                            }
                                                        >
                                                            <input
                                                                value={v.id}
                                                                type="checkbox"
                                                                hidden
                                                                checked={newArea.schedules[
                                                                    newAreaSize
                                                                ]?.days?.some(
                                                                    (dayObj) =>
                                                                        v.id ==
                                                                        dayObj.id
                                                                )}
                                                                onChange={(e) =>
                                                                    handleCheck(
                                                                        e,
                                                                        newAreaSize
                                                                    )
                                                                }
                                                            />

                                                            <span>
                                                                {v.letter}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="close_schedule">
                                                X
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        {/* <Input
                                label={"Apellidos/s"}
                                key={1}
                                onChange={handleChange}
                                value={newArea.last_name}
                                name={"last_name"}
                            /> */}

                        <button
                            type="submit"
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

            {showSchedule.show && (
                <div
                    className={`p-5 rounded-md fixed z-50  bg-dark text-white bottom-1 right-1`}
                >
                    <ul>
                        {showSchedule.data.map((obj) => (
                            <li>
                                <b className="">
                                    {obj.shift_start.start}{" "}
                                    <span className="text-purple">-</span>{" "}
                                    {obj.shift_end.end}
                                </b>
                                {/* {getDays(obj.days)} */}
                                <div className="flex gap-3 mb-2 justify-center border-b w-full border-white/20">
                                    {lettersDay.map((v, i) => (
                                        <span
                                            className={
                                                obj.days[i] &&
                                                obj.days[i].id == v.id
                                                    ? "text-blue "
                                                    : "opacity-40"
                                            }
                                        >
                                            {v.letter}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
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
