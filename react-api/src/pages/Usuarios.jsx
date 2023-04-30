import React, { useEffect, useLayoutEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios'

export default function usuarios() {
    const columns = [
        {
            name: "name",
            label: "Nombres",
            options: {
                filter: false,
            }
        },
        {
            name: "last_name",
            label: "Apellidos",
            options: {
                filter: false,
            }
        },
        {
            name: "ci",
            label: "Ci",
            options: {
                filter: false,
            }
        },
        {
            name: "data_birth",
            label: "F. de nacimiento",
            options: {
                filter: false,
            }
        },
        {
            name: "age",
            label: "Edad",
        },
        {
            name: "sex",
            label: "Sexo",
        },
        {
            name: "weight",
            label: "Peso",
            options: {
                filter: false,
            }
        },
        {
            name: "height",
            label: "altura",
            options: {
                filter: false,
            }
        },
        {
            name: "address",
            label: "Dirección",
        },
        {
            name: "phone_number",
            label: "Nro de. teléfono",
            options: {
                filter: false,
            }
        },
        {
            name: "collaboration",
            label: "Colaboración",
        },
        {
            name: "Actions",
            options: {
              filter: false,
              sort: false,
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return (
                    <button aria-label="edit" onClick={() => {
                      console.log(data[rowIndex])
                    }}>
                      Button
                    </button>
                    
                );
             }
          },
        }
       
    ];

    const data = [
        {
            name: "Joe James",
            last_name: "Test Corp",
            ci: "27253194",
            data_birth: "25/06/199",
            age: '20',
            sex: 'M',
            blood_type_id: 'o+',
            weight: "60kg",
            height: '70',
            address: "Juan Crisóstomo Falcón",
            phone_number: "04124393123",
            collaboration: 'un jabón, cloro, desinfectance ect'
        },
        {
            name: "John Walsh",
            last_name: "Test Corp",
            ci: "27253194",
            data_birth: "25/06/199",
            age: '20',
            sex: 'M',
            blood_type_id: 'o+',
            weight: "60kg",
            height: '70',
            address: "Juan Crisóstomo Falcón",
            phone_number: "04124393123",
            collaboration: 'un jabón, cloro, desinfectance ect'
        },
        {
            name: "Bob Herm",
            last_name: "Test Corp",
            ci: "27253194",
            data_birth: "25/06/199",
            age: '20',
            sex: 'M',
            blood_type_id: 'o+',
            weight: "60kg",
            height: '70',
            address: "Juan Crisóstomo Falcón",
            phone_number: "04124393123",
            collaboration: 'un jabón, cloro, desinfectance ect'
        },
        {
            name: "James Houston",
            last_name: "Test Corp",
            ci: "27253194",
            data_birth: "25/06/199",
            age: '20',
            sex: 'M',
            blood_type_id: 'o+',
            weight: "60kg",
            height: '70',
            address: "Juan Crisóstomo Falcón",
            phone_number: "04124393123",
            collaboration: 'un jabón, cloro, desinfectance ect'
        },
        
    ];

    const options = {
        filterType: "checkbox",
        // selectableRowsOnClick: true,
        selectableRows: 'single',
        // onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => console.log({currentRowsSelected, allRowsSelected, rowsSelected}),
        // onRowClick: function(rowData, rowMeta) {console.log(data[rowMeta.dataIndex])},
        // expandableRowsOnClick: true,
        onRowSelect: function(rowData, rowMeta) {console.log(rowData, rowMeta)},
    };
   
    function onRowClick() {
        console.log('0alamielda')
    }
    const apiUrl = 'page/usuarios'

    const [usuarios, setUsuarios] = useState([]);
    const getData = async () => {
        await axios.get(apiUrl).then((response) => {
            const data = response.data;
            setUsuarios(data)
            console.log(data)
        });
    };

    useEffect(() => {
      getData
    }, [])
    function peo(data){
        console.log(data)
    }
 
    return (
        <MUIDataTable
            isRowSelectable= {true}	
            title={"Employee List"}
            data={data}
            columns={columns}
            options={options}
            
        />
    );
}
