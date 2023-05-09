import React from "react";
import Input from "../components/Input";
import { Autocomplete, TextField, MenuItem } from "@mui/material";
import MUIDataTable from "mui-datatables";

export default function Asistencia() {
    const all_areas_db = [
        {
            id: 1,
            name: "Gymnasio",
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

const asistencia = [
    {code: 1124, name:'emilia', last_name:'sanchez', area: 'boxeo', turno:'1', hora: '3pm' }
]
const columns = [
    {
        name: 'code',
        label:'Código',
        options: {
            filter: false,
        }
            
    },
    {
        name: 'name',
        label:'Nombre',
        options: {
            filter: false,
        }
            
    },
    {
        name: 'last_name',
        label:'Apellido',
        options: {
            filter: false,
        }
            
    },
    {
        name: 'area',
        label:'Area',
        options: {
            filter: true,
        }
    },
    {
        name: 'turno',
        label:'Turno',
    },
    {
        name: 'hora',
        label:'Hora',
        options: {
            filter: false,
        }
            
    },
]

const options = {
    filterType: "checkbox",
        responsive: "vertical",
        selectableRowsOnClick: true,
        // selectableRowsOnClick: true,
        selectableRowsHideCheckboxes: true,
        selectableRows: "single",
        // rowsSelected:rowSelected,
        fixedHeader: true,
}



    const turnos = [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "4" }, 
    ];
    return (
        <>
            <form className="flex glass p-3 gap-3 w-min rounded-md mb-5">
                <Input
                    // shrink={true}
                    // type={"Código"}
                    label={"Código"}
                    // value={""}
                    name={"birth_date"}
                    width={150}
                    // onChange={handleChange}
                />
                <Autocomplete
                    multiple
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
                    // value={newUserData.areas}
                    options={all_areas_db}
                    getOptionLabel={(all_areas_db) => all_areas_db.name}
                    // defaultValue={newUserData.array_areas}
                    isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                    }
                    sx={{ minWidth: 223 }}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Area"
                        />
                    )}
                />

                <TextField
                    sx={{ width: 150 }}
                    id="outlined-select-currency"
                    select
                    label="Turno"
                    // value={newUserData.blood_types?.id}
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
                </TextField>

                <button type="submit" className="border-white border px-3 rounded-md text-white">
                        Guardar
                </button>
            </form>




            <MUIDataTable
                isRowSelectable={true}
                title={`Asistencia de hoy ${diaA}/${mesA}/${añoA}`}
                data={asistencia}
                columns={columns}
                options={options}
            />
        </>
    );
}
