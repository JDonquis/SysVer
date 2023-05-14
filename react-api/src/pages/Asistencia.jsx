import React, { useState, useEffect } from "react";
import { Autocomplete, IconButton, TextField, MenuItem } from "@mui/material";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import axios from "../api/axios";
import ConfirmModal from "../components/ConfimModal";
import Alert from "../components/Alert";

const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "white",
    },

    "& .MuiOutlinedInput-root": {
        // "& fieldset": {
        //     borderColor: "whitesmoke",
        // },
        "& fieldset": {
            borderColor: "rgba(255, 255, 255, 0.39)",
        },

        "&.Mui-focused fieldset": {
            borderColor: "whitesmoke",
        },
    },
});

export default function Asistencia() {
    const [asistencia, setAsistencia] = useState([]);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        status: "",
        message: "",
    });
    const [all_areas, setAll_areas] = useState([]);
    const [statusSubmit, setStatusSubmit] = useState('Guardar')



    const columns = [
        {
            name: "client",
            label: "Código",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    return value.code;
                },
            },
        },
        {
            name: "client",
            label: "Nombre",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    return value.name;
                },
            },
        },
        {
            name: "client",
            label: "Apellido",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    return value.last_name;
                },
            },
        },
        {
            name: "schedule",
            label: "Area",
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return value.area.name;
                },
            },
        },
        {
            name: "schedule",
            label: "Turno",
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        value.shift_start.start + " - " + value.shift_end.end
                    );
                },
            },
        },
        // {
        //     name: "hora",
        //     label: "Hora",
        //     options: {
        //         filter: false,
        //     },
        // },
    ];

    const getData = async () => {
        await axios.get("dashboard/assistance").then((response) => {
            const data = response.data;
            const asis = data.assistances;
            const areas = data.areas;
            setAsistencia(asis);
            setAll_areas(areas);
        });
    };
    // console.log(all_areas);

    useEffect(() => {
        getData();
        document.title = "SysVer | Asistencia";
    }, []);
    const [newAttendance, setNewAttendance] = useState({
        code: "",
        area_id: "",
        schedule_id: "",
    });

    const all_areas_db = [
        {
            id: 1,
            name: "Gimnasio",
            type_area_id: 2,
        },
        {
            id: 2,
            name: "Artes Marciales",
            type_area_id: 1,
        },
        {
            id: 3,
            name: "Yoga",
            type_area_id: 1,
        },
    ];
    const [dataForDeleteUser, setDataForDeleteUser] = useState({
        indx: "",
        setSelectedRows: () => {},
    });

    useEffect(() => {
        setTimeout(() => {
            setAlert({ open: false, message: "", status: "" });
        }, 3000);
    }, [alert.open === true]);

    const deleteUser = async () => {
        try {
            const id = asistencia[dataForDeleteUser.indx].client_id;
            // const code = usuarios[dataForDeleteUser.indx].code;
            await axios.delete(`dashboard/assistance/${id}`);

            setAlert({
                open: true,
                status: "Exito",
                message: `La asistencia ha sido Eliminada`,
            });
            setAsistencia((prev) =>
                prev.filter((eachU) => eachU.client_id != id)
            );

            dataForDeleteUser.setSelectedRows([]);
        } catch (error) {
            setAlert({
                open: true,
                status: "Error",
                message: `${error.response.data.Message}`,
            });
        }
    };

    let fecha = new Date(),
        añoA = fecha.getFullYear(),
        mesA = fecha.getMonth() + 1,
        diaA = fecha.getDate();

    // console.log({ newAttendance });

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
                        const asis = asistencia[indx];
                        const asis_id = asis.id
                        const code = asis.client.code;
                        const schedule_id = asis.schedule_id
                        const area_id = asis.schedule.area_id
                        setNewAttendance({code, area_id ,schedule_id, id: asis_id });
                        setStatusSubmit('Editar')
                    }}
                >
                    <EditIcon />
                </IconButton>

                <IconButton
                    title="Eliminar"
                    onClick={() => {
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if( statusSubmit == 'Guardar') {
                setStatusSubmit('Guardando...')

                await axios
                    .post(`dashboard/assistance`, newAttendance)
                    .then((response) => {
                        console.log({ response });
                        // setAsistencia((prev) => [...prev, client]);
                        setAsistencia((prev) => [
                            ...prev,
                            response.data.assistance,
                        ]);
                    });
                setAlert({
                    open: true,
                    status: "Exito",
                    // message: `El usuario ${newUserData.name} ha sido creado`,
                });
                setNewAttendance({ code: "", area_id: "", schedule_id: "" });
            }

            if (statusSubmit == 'Editar') {
                setStatusSubmit('Editando...')

                await axios
                .put(`dashboard/assistance/${newAttendance.id}`, newAttendance)
                .then((response) => {
                    console.log({ response });
                    // setAsistencia((prev) => [...prev, client]);
                    // setAsistencia((prev) => [
                    //     ...prev,
                    //     response.data.assistance,
                    // ]);
                });
                setAlert({
                    open: true,
                    status: "Exito",
                    // message: `El usuario ${newUserData.name} ha sido creado`,
                });
            }
        } catch (error) {
            console.log({error});
            setAlert({
                open: true,
                status: "Error",
                message: `${error.response.data.Message}`,
            });
        }
        setStatusSubmit('Guardar')
    };

    const turnos = [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "4" },
    ];

    const [tabla, setTabla] = useState();
    useEffect(() => {
        setTabla(
            <MUIDataTable
                isRowSelectable={true}
                title={`Asistencia de hoy ${diaA}/${mesA}/${añoA}`}
                data={asistencia}
                columns={columns}
                options={options}
            />
        );
    }, [asistencia]);

    return (
        <>
            <form
                className="flex glass p-3 gap-3 w-min rounded-md mb-5"
                onSubmit={handleSubmit}
            >
                <CssTextField
                    // shrink={true}
                    // type={"Código"}
                    label={"Código"}
                    value={newAttendance?.code}
                    name={"birth_date"}
                    width={150}
                    onChange={(e) =>
                        setNewAttendance((prev) => ({
                            ...prev,
                            code: e.target.value,
                        }))
                    }
                />

                <CssTextField
                    sx={{ width: 290 }}
                    id="outlined-select-currency"
                    select
                    label="Areas"
                    value={newAttendance?.area_id}
                    defaultValue=""
                    name="turno"
                    onChange={(e) => {
                        setNewAttendance((prev) => ({
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
                </CssTextField>
                <CssTextField
                    sx={{ width: 290 }}
                    id="outlined-select-currency"
                    select
                    label="Turno"
                    value={newAttendance?.schedule_id}
                    defaultValue=""
                    name="turno"
                    onChange={(e) => {
                        setNewAttendance((prev) => ({
                            ...prev,
                            schedule_id: e.target.value,
                        }));
                    }}
                >
                    {all_areas
                        .find((obj) => obj.id === newAttendance.area_id)
                        ?.schedule.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.shift_start.start +
                                    " - " +
                                    option.shift_start.end}
                            </MenuItem>
                        ))}
                </CssTextField>

                <button
                    type="submit"
                    className="bg-purple/30  px-5 rounded-md text-dark hover:bg-purple"
                >
                    {statusSubmit}
                </button>
            </form>

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
