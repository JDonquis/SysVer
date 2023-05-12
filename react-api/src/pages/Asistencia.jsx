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
   
]);
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
                    // console.log({value, tableMeta})
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
                    // console.log({value, tableMeta})
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
                    // console.log({value, tableMeta})
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
                    // console.log({value, tableMeta})
                    return value.shift_start.start + ' - ' + value.shift_end.end
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
        await axios.get('dashboard/assistance').then((response) => {
            const data = response.data;
            // console.log(data);
            // clients.forEach((user) => {
            //     user.array_areas = user.areas.map((a) => a.name);
            //     user.blood_name = user.blood_types.name;
            // });
            const asis = data.assistances
            
            console.log(asis)
            
            setAsistencia(asis);
            // console.log(data)
        });
    };
    console.log(asistencia)

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
   console.log(asistencia)

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
                        console.log(indx)
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
                    value={newAttendance.client?.code}
                    name={"birth_date"}
                    width={150}
                    // onChange={(e) =>
                    //     setNewAttendance((prev) => ({
                    //         ...prev,
                    //         client: {...prev.client, }code: e.target.value,
                    //     }))
                    // }
                />
                {/* <Autocomplete
                    name="area"
                    onChange={(event, value) => {
                        // const arr_areas = value.map((a) => a.name);
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
                /> */}

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
