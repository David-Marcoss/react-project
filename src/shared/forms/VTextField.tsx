import React, { useEffect, useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";

// TextFieldProps => propriedades do TextField


type TVTextField = TextFieldProps & {
    name: string
}

// recebe um nome para integração com o unform e adciona as propriedades padroes do textField
export const VtextField: React.FC<TVTextField> = ({name, ...textFieldProps}) => {
    const {
        fieldName,      // nome do campo
        defaultValue,   // valor defaut do campo no form
        registerField,  // registra o campo no form
        error,          // indica erro no campo
        clearError,     // serve para limper erros no campo
    } = useField(name)

    const [value, setValue] = useState(defaultValue || "")

    useEffect(()=> {
        registerField({
            name: fieldName,
            setValue: (_,newValue) => setValue(newValue), //metodo para seta o valor do campo
            getValue: () => value   // metodo para obter o valor do campo
        })
    },[fieldName, registerField, value])

    return (
        <TextField 
            {...textFieldProps}
            value={value}
            defaultValue={defaultValue}
            error = { error !== undefined}
            helperText = {error}
            onChange={ e => {setValue(e.target.value); textFieldProps.onChange?.(e);}}
            onKeyDown={(e) => {error && clearError(); textFieldProps.onKeyDown?.(e);}}
        />
    )
}