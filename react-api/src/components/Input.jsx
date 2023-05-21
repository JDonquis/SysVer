import { TextField } from "@mui/material";
import { memo } from "react";
import {styled} from "@mui/material/styles";

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
    color: '#069dbf',
  },
    '& .MuiOutlinedInput-root': {
    
    '&.Mui-focused fieldset': {
      borderColor: '#069dbf',
    },
  },
})

const Input = memo((props) => {
    return (
        <CssTextField
            variant={"outlined"}
            label={props.label}
            onChange={(e) => props.onChange(e)}
            value={props.value}
            name={props.name}
            sx={{ width: props.width || 223 , borderColor: '#069DBF',}}
            type={props.type}
            color="primary"
            inputProps={{ reandOnly: props.readOnly, minLength: props.minLength, maxLength: props.maxLength }}
            InputLabelProps={{ shrink: props.shrink }}
            required={props.required || false}
        />
    );
});

export default Input;
