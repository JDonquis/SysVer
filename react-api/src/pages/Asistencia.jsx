import React from "react";
import Input from "../components/Input";
export default function Asistencia() {
    return (
        <div>
            <Input
                shrink={true}
                type={"date"}
                label={"Fecha de nacimiento"}
                value={'s'}
                name={"birth_date"}
                // onChange={handleChange}
            />
        </div>
    );
}
