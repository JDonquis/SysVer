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
    const [accountStatements, setAccountStatements] = useState([]);
    const [tabla, setTabla] = useState();

    const getData = async () => {
        try {
            await axios.get("dashboard/accounts/").then((response) => {
                // const payments = response.data.payments;
                // setpagos(payments);
                console.log(response);
                setAccountStatements(response.data.clients);
                setAll_areas(response.data.areas);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getDataByAreas = async (area) => {
        try {
            await axios.get(`dashboard/accounts/${area}`).then((response) => {
                // const payments = response.data.payments;
                console.log({ response });
                setAccountStatements(response.data.clients);
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
        document.title = "Estados de cuenta";
    }, []);
    const byClientsOptions = {
        filterType: "checkbox",
        selectableRows: "none",
    };

    const byClientsColumns = [
        {
            name: "client_area",
            label: "Código",
            options: {
                filter: false,
                sort: false,
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
                sort: false,
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
                sort: false,
                customBodyRender: (value) => {
                    return value.client.last_name;
                },
            },
        },
        {
            name: "client_area",
            label: "Area",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return value.area.name;
                },
            },
        },
        {
            name: "status",
            label: "Estado",
            options: {
                filter: true,
                sort: false,
                filterOptions: {
                    names: ['Retrasado', 'Al día'],
                    logic(status, filters) {
                        if (filters.indexOf('Retrasado') >= 0 && status === 3) {
                            return false;
                        } else if (filters.indexOf('Al día') >= 0 && status !== 3) {
                            return false;
                        }
                        return true;
                    },
                    display: (filterList, onChange, index, column) => {
                        return (
                            <Select
                                value={filterList[index] || ''}
                                onChange={event => {
                                    filterList[index] = event.target.value;
                                    onChange(filterList[index], index, column);
                                }}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Retrasado">Retrasado</MenuItem>
                                <MenuItem value="Al día">Al día</MenuItem>
                            </Select>
                        );
                    },
                },
                customBodyRender: (value) => {
                
                    return value === 3 ? (
                        <span className="text-red">Retrasado</span>
                    ) : (
                        <span className="text-green">Al dia</span>
                    );
                },
            },
        },
        {
            name: "balance",
            label: "Saldo ($)",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value > 0 ? (
                        <span className="text-green">{value}$</span>
                    ) : (
                        <span className="text-red">{value}$</span>
                    );
                },
            },
        },
        {
            name: "days",
            label: "Semanas",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const weeks= Math.ceil(value/7)
                    return weeks > 0 ? (
                        <span className="text-green">{weeks}</span>
                    ) : (
                        <span className="text-red">{weeks}</span>
                    );
                }
            },
        },
    ];
   

    useEffect(() => {
        setTabla(
            <MUIDataTable
                isRowSelectable={false}
                title={"Estados de cuenta"}
                data={accountStatements}
                columns={byClientsColumns}
                options={byClientsOptions}
            />
        );
    }, [accountStatements]);

    // console.log(accountStatements);

    return <>{tabla}</>;
}
