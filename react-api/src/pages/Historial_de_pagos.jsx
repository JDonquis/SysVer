import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "../api/axios";
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
export default function Historial_de_asistencia() {
    const [asistencias, setAsistencias] = useState([]);
    const [tabla, setTabla ] = useState()

    const getData = async () => {
        try {

            await axios.get("dashboard/historial/assistance").then((response) => {
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
            name: "created_at",
            label: "Dia",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return (
                        value.split('-')[2]

                    );
                },
            },
        },
        {
            name: "created_at",
            label: "Mes",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return (
                        months[value.split('-')[1].charAt(1)-1]

                    );
                },
            },
        },
        {
            name: "created_at",
            label: "Año",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return (
                        value.split('-')[0]
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
            label: "Monto",
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
            title={"Historial de asistencias"}
            data={asistencias}
            columns={columns}
            options={options}
        />)
    }, [asistencias]);

    console.log(asistencias)

    return (
        <>
            
            {tabla}
        </>
    );
}
