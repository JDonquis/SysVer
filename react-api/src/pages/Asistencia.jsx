import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { Autocomplete, IconButton, TextField, MenuItem } from "@mui/material";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import axios from "../api/axios";


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
     const [asistencia, setAsistencia] = useState([
    {
        id: 1,
        client_id: 1,
        schedule_id: 1,
        schedule: {
            id: 1,
            start_shift_id: 1,
            end_shift_id: 1,
            area_id: 1,
            area: {
                id: 1,
                name: "Gimnasio",
                type_area_id: 2
            },
            shift_start: {
                id: 1,
                start: "07:00 AM.",
                end: "08:00 AM."
            },
            shift_end: {
                id: 1,
                start: "07:00 AM.",
                end: "08:00 AM."
            }
        }
    },
    {
        id: 2,
        client_id: 1,
        schedule_id: 1,
        schedule: {
            id: 1,
            start_shift_id: 1,
            end_shift_id: 1,
            area_id: 1,
            area: {
                id: 1,
                name: "Gimnasio",
                type_area_id: 2
            },
            shift_start: {
                id: 1,
                start: "07:00 AM.",
                end: "08:00 AM."
            },
            shift_end: {
                id: 1,
                start: "07:00 AM.",
                end: "08:00 AM."
            }
        }
    }
]);
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
            label: "Nombre",
            options: {
                filter: false,
            },
        },
        {
            name: "last_name",
            label: "Apellido",
            options: {
                filter: false,
            },
        },
        {
            name: "area",
            label: "Area",
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    // console.log({value, tableMeta})

                    return <div>{value.name}</div>;
                },
            },
        },
        {
            name: "turno",
            label: "Turno",
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    // console.log({value, tableMeta})
                    return <div>{value.name}</div>;
                },
            },
        },
        {
            name: "hora",
            label: "Hora",
            options: {
                filter: false,
            },
        },
    ];
     const getData = async () => {
        await axios.get('dashboard/assistance').then((response) => {
            const data = response;
            // console.log(data);
            const clients = response.data
            // clients.forEach((user) => {
            //     user.array_areas = user.areas.map((a) => a.name);
            //     user.blood_name = user.blood_types.name;
            // });

            // setAsistencia(clients);
            console.log(data)
            // console.log(data)
        });
    };

    useEffect(() => {
        getData();
        document.title = "SysVer | Asistencia";
    }, []);
    const [newAttendance, setNewAttendance] = useState({
        code: "",
        area: {},
        turno: { },
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



    let fecha = new Date(),
        añoA = fecha.getFullYear(),
        mesA = fecha.getMonth() + 1,
        diaA = fecha.getDate();

   
    // console.log(newAttendance.turno?.id)
   

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
                        // console.log(usuarios[indx]);
                        setNewAttendance(asistencia[indx]);
                        // setNewAttendance({});
                    }}
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

    // console.log(newAttendance);

    return (
        <>
            <form className="flex glass p-3 gap-3 w-min rounded-md mb-5">
                <CssTextField
                    // shrink={true}
                    // type={"Código"}
                    label={"Código"}
                    value={newAttendance.code}
                    name={"birth_date"}
                    width={150}
                    onChange={(e) =>
                        setNewAttendance((prev) => ({
                            ...prev,
                            code: e.target.value,
                        }))
                    }
                />
                <Autocomplete
                    name="area"
                    onChange={(event, value) => {
                        const arr_areas = value.map((a) => a.name);
                        // setNewUserData((prev) => ({
                        //     ...prev,
                        //     areas: value,
                        //     array_areas: arr_areas,
                        // }));
                    }}
                    id="tags-outlined"
                    value={newAttendance.area}
                    options={all_areas_db}
                    getOptionLabel={(all_areas_db) => all_areas_db.name}
                    // defaultValue={newUserData.array_areas}
                    isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                    }
                    sx={{ minWidth: 223, color: "white" }}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <CssTextField
                            {...params}
                            variant="outlined"
                            label="Area"
                        />
                    )}
                />

                <CssTextField
                    sx={{ width: 190 }}
                    id="outlined-select-currency"
                    select
                    label="Turno"
                    value={newAttendance.turno?.id}
                    defaultValue=""
                    name="turno"
                    // onChange={(e) => {
                    //     let obj_blood = all_blood_types.find(
                    //         (obj) => obj.id === e.target.value
                    //     );
                    //     setNewUserData((prev) => ({
                    //         ...prev,
                    //         blood_types: obj_blood,
                    //         blood_name: obj_blood.name,
                    //     }));
                    // }}
                >
                    {turnos.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </CssTextField>

                <button
                    type="submit"
                    className="bg-purple/30  px-5 rounded-md text-dark hover:bg-purple"
                >
                    Guardar
                </button>
            </form>

            {tabla}
        </>
    );
}
