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

const lettersDay = [
    { id: 1, letter: "L" },
    { id: 2, letter: "M" },
    { id: 3, letter: "X" },
    { id: 4, letter: "J" },
    { id: 5, letter: "V" },
    { id: 6, letter: "S" },
];

export default function Areas() {
    const [open, setOpen] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("Crear area");
    // type_area 2 es pago y 1 es gratis
    const [newArea, setNewArea] = useState({
        name: "",
        type_area_id: 1,
        schedule: [
            {
                shift_start: { id: 1, start: "07:00 AM.", end: "09:00 AM." },
                shift_end: { id: 2, start: "08:00 AM.", end: "09:00 AM." },
                days: [
                    { id: 1, name: "Lunes" },
                    { id: 2, name: "Martes" },
                    { id: 5, name: "Viernes" },
                ],
            },
        ],
        cost: "",
    });
    const handleSubmit = async (e) => {
        e.preventDafault();
        try {
            
        } catch (error) {
            
        }
        e.nativeEvent.stopImmediatePropagation();
    };
    console.log(newArea);
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
                        // const schedule_id = asis.schedule_id;
                        // const area_id = asis.schedule.area_id;
                        // setNewAttendance({
                        //     code,
                        //     area_id,
                        //     schedule_id,
                        //     id: asis_id,
                        // });
                        // setStatusSubmit("Editar");
                    }}
                >
                    <EditIcon />
                </IconButton>

                <IconButton
                    title="Eliminar"
                    // onClick={() => {
                    //     setModalConfirm(true);
                    //     setDataForDeleteUser({
                    //         indx: selectedRows.data[0].dataIndex,
                    //         setSelectedRows: setSelectedRows,
                    //     });
                    // }}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        ),
    };
    const getData = async () => {
        await axios.get("dashboard/areas").then((response) => {
            // setAll_areas(areas);
            console.log(response);
            setAreas(response.data.areas);
        });
    };
    // console.log(all_areas);

    useEffect(() => {
        getData();
        document.title = "Areas";
    }, []);

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

    console.log(areas);
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
                        with: "800px",
                        minWidth: "600px",
                    }}
                >
                    <form onSubmit={handleSubmit} className="w-full h-full">
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                height: "100%",
                                gap: "22px",
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
                                                cost: e.target.value,
                                            }))
                                        }
                                        width={"100%"}
                                        value={newArea.cost}
                                        name={"cost"}
                                    />
                                )}
                            </div>
                            <div>
                                <h1>horarios</h1>
                                <ul>
                                    {newArea.schedule.map((sche, i) => {
                                        return (
                                            <li>
                                                1
                                                <TextField
                                                    sx={{ width: "40%" }}
                                                    id="outlined-select-currency"
                                                    select
                                                    // value={newAttendance?.schedule_id}
                                                    defaultValue=""
                                                    name="turno"
                                                    onChange={(e) => {
                                                        setNewArea((prev) => ({
                                                            ...prev,
                                                            schedule_id:
                                                                e.target.value,
                                                        }));
                                                    }}
                                                >
                                                    <MenuItem key={1} value={1}>
                                                        1
                                                    </MenuItem>
                                                </TextField>
                                                <TextField
                                                    sx={{ width: "40%" }}
                                                    id="outlined-select-currency"
                                                    select
                                                    // value={newAttendance?.schedule_id}
                                                    defaultValue=""
                                                    name="turno"
                                                    onChange={(e) => {
                                                        setNewAttendance(
                                                            (prev) => ({
                                                                ...prev,
                                                                schedule_id:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        );
                                                    }}
                                                >
                                                    <MenuItem key={1} value={1}>
                                                        1
                                                    </MenuItem>
                                                </TextField>
                                                {/* {newArea} */}
                                                {/* <button
                                                    onnClick={(e) => {
                                                        e.preventDafault();
                                                        console.log("ayy");
                                                    }}
                                                >
                                                    x
                                                </button> */}
                                            </li>
                                        );
                                    })}
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
                                <b className="block text-blue">
                                    {obj.shift_start.start}{" "}
                                    <span className="text-purple">-</span>{" "}
                                    {obj.shift_end.end}
                                </b>
                                {/* {getDays(obj.days)} */}
                                <div className="flex gap-3 mb-2 justify-center border-b border-white/20">
                                    {lettersDay.map((v, i) =>
                                        obj.days[i] &&
                                        obj.days[i].id == v.id ? (
                                            <span>{v.letter}</span>
                                        ) : (
                                            <span className="opacity-50">
                                                {v.letter}
                                            </span>
                                        )
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
