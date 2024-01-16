import React from "react";
import {TextField} from "@mui/material";

export interface  IDynamicFieldConfig {
    id: string,
    type: string,
    placeholder: string,
    config: {
        dataType: string,
        placeholder:string
    },
    value: string | undefined | null,
    validation: {
        required: boolean,
        minLength :number | undefined,
        maxLength :number |undefined
    },
    valid: boolean,
    errorMessage: string,
    touched: boolean,
    label :string,
    options :any
}
export interface  IDynamicFieldParam  {
    fieldConfig : IDynamicFieldConfig,
    blured :any,
    changed :any
}

const CustomDynamicField =(props :IDynamicFieldParam)=>{
    const fieldConfig = props.fieldConfig;
    let element = null;
    let classes = ['field w-full'];
    if (fieldConfig.touched && !fieldConfig.valid) {
        classes.push('invalid');
    }
    switch (fieldConfig.type) {
        case 'input':
            element =(
                <TextField
                    type={fieldConfig.config.dataType}
                    className={classes.join(' ')}
                           variant='outlined'
                           size='small'
                    value={fieldConfig.value}
                    name={fieldConfig.id}
                    placeholder={fieldConfig.placeholder}
                    onBlur={props.blured}
                    inputProps={{
                        maxLength: fieldConfig.validation.maxLength,
                        minLength: fieldConfig.validation.minLength,
                    }}
                    required={fieldConfig.validation.required}
                    label={fieldConfig.label}
                    onChange={props.changed}
                />
            )

            break;
        case 'textarea':
            element = <textarea
                value={fieldConfig.value}
                className={classes.join(' ')}
                placeholder={fieldConfig.placeholder}
                required={fieldConfig.validation.required}
                onBlur={props.blured}
                minLength={fieldConfig.validation.minLength}
                onChange={props.changed}
                maxLength={fieldConfig.validation.maxLength}
            />;
            break;
        case 'select':
            element = (
                <select
                    value={fieldConfig.value}
                    className={classes.join(' ')}
                    required={fieldConfig.validation.required}
                    onBlur={props.blured}
                    onChange={props.changed}>
                    <option>{fieldConfig.placeholder}</option>
                    {fieldConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
    }
    return (
        <div className="field-wrapper">
            {element}
        </div>
    )

}


export  default  CustomDynamicField;