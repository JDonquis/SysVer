import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "../api/axios";
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
export default function Historial_de_pagos() {
    const [pagos, setpagos] = useState([]);
    const [tabla, setTabla ] = useState()

    const getData = async () => {
        try {

            await axios.get("dashboard/historial/payments").then((response) => {
                console.log({response})
                const payments = response.data.payments;
                setpagos(payments);
                
    
            });
        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getData();
        document.title = "Estados de cuenta";
    }, []);
    const options = {
        filterType: "checkbox",
        selectableRows: "none",

    };

    const columns = [
      
        {
            name: "client_area",
            label: "Código",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value.client.code;
                },
            },
        },
        {
            name: "client_area",
            label: "Nombre",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value.client.name;
                },
            },
        },
        {
            name: "client_area",
            label: "Apellido",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value.client.last_name;
                },
            },
        },
        {
            name: "amount",
            label: "Estado",
            options: {
                filter: true,
                
            },
        },
        {
            name: "client_area",
            label: "Area",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value.area.name ;
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
    ]

    useEffect(() => {
        setTabla(<MUIDataTable
            isRowSelectable={false}
            title={"Estados de cuenta"}
            data={pagos}
            columns={columns}
            options={options}
        />)
    }, [pagos]);

    console.log(pagos)

    return (
        <>
            
            {tabla}
        </>
    );
}
