import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "../api/axios";
import { IconButton, TextField, Autocomplete, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";

import Input from "../components/Input";
const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

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

export default function Historial_de_pagos() {
    const [pagos, setpagos] = useState([]);
    const [tabla, setTabla] = useState();

    const getData = async () => {
        try {
            await axios.get("dashboard/accounts").then((response) => {
                console.log({ response });
                // const payments = response.data.payments;
                // setpagos(payments);
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
        document.title = "Estados de cuenta";
    }, []);
    const byAreasOptions = {
        filterType: "checkbox",
        selectableRows: "none",
    };

    const byAreasColumns = [
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
        // {
        //     name: "client_area",
        //     label: "Area",
        //     options: {
        //         filter: true,
        //         customBodyRender: (value) => {
        //             return value.area.name;
        //         },
        //     },
        // },
        {
            name: "amount",
            label: "Saldo ($)",
            options: {
                filter: false,
            },
        },
        {
            name: "amount",
            label: "Semanas",
            options: {
                filter: false,
            },
        },
    ];

    useEffect(() => {
        setTabla(
            <MUIDataTable
                isRowSelectable={false}
                title={
                    <span className="text_white flex items-center"> 
                        <h1 className="mr-6">

                        Estados de cuenta
                        </h1>
                        <CssTextField
                            sx={{ width: 290 }}
                            select
                            style={{color: 'white'}}
                            label="Area"
                            // value={newPayment?.area_id}
                            defaultValue=""
                            // disabled={!newPayment.code}
                            name="turno"
                            onChange={(e) => {
                                // setNewPayment((prev) => ({
                                //     ...prev,
                                //     area_id: e.target.value,
                                // }));
                                // getCreditsInfo(newPayment.code, e.target.value);
                            }}
                        >
                            {/* {all_areas.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))} */}
                        </CssTextField>
                    </span>
                }
                data={pagos}
                columns={byAreasColumns}
                options={byAreasOptions}
            />
        );
    }, [pagos]);

    console.log(pagos);

    return <>{tabla}</>;
}
