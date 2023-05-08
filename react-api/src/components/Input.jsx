import { TextField } from "@mui/material";
import { memo } from "react";

const Input = memo((props) => {
    return (
        <TextField
            variant={"outlined"}
            label={props.label}
            onChange={(e) => props.onChange(e)}
            value={props.value}
            name={props.name}
            sx={{ width: props.width || 223 }}
            type={props.type}
            inputProps={{ reandOnly: props.readOnly, minLength: props.minLength, maxLength: props.maxLength }}
            InputLabelProps={{ shrink: props.shrink }}
            
        />
    );
});

export default Input;
