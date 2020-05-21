import React from "react";
import TextField from "@material-ui/core/TextField";
import { roundTextFieldStylesHook } from "@mui-treasury/styles/textField/round";

const RoundTextFieldStyle = ({ label, onChange }) => {
  const inputBaseStyles = roundTextFieldStylesHook.useInputBase();
  const inputLabelStyles = roundTextFieldStylesHook.useInputLabel();
  const helperTextStyles = roundTextFieldStylesHook.useHelperText();
  return (
    <TextField
      label={label}
      margin={"normal"}
      InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
      InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
      FormHelperTextProps={{ classes: helperTextStyles }}
      onChange={onChange}
    />
  );
};

export default RoundTextFieldStyle;
