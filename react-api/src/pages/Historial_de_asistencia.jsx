import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "../api/axios";

export default function Historial_de_asistencia() {
    const [asistencias, setAsistencias] = useState([]);
    const [tabla, setTabla ] = useState()

    const getData = async () => {
        try {

            await axios.get("dashboard/historial/assistance").then((response) => {
                console.log(response)
                const asis = response.data.assistances;
                setAsistencias(asis);
    
            });
        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getData();
        document.title = "Historial de asistencia";
    }, []);
    const options = {
        filterType: "checkbox",
        selectableRows: "none",

    };

    const columns = [
        {
            name: "schedule",
            label: "Dia",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return (
                        value.shift_start.start + " - " + value.shift_end.end
                    );
                },
            },
        },

        {
            name: "client",
            label: "Código",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value.code;
                },
            },
        },
        {
            name: "client",
            label: "Nombre",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value.name;
                },
            },
        },
        {
            name: "client",
            label: "Apellido",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value.last_name;
                },
            },
        },
        {
            name: "schedule",
            label: "Area",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value.area.name;
                },
            },
        },
        {
            name: "schedule",
            label: "Turno",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return (
                        value.shift_start.start + " - " + value.shift_end.end
                    );
                },
            },
        },
        
    ]

    useEffect(() => {
        setTabla(<MUIDataTable
            isRowSelectable={false}
            title={`Historial de asistencias`}
            data={asistencias}
            columns={columns}
            options={options}
        />)
    }, [asistencias]);

    return (
        <>
            <p>nota: aquí se muestran las asistencias </p>
            {tabla}
        </>
    );
}
