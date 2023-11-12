import React, {useEffect, useState} from "react";
import CustomDynamicField, {IDynamicFieldConfig, IDynamicFieldParam} from "./CustomDynamicField";
import CustomFontAwesomeIcon from "./CustomFontAwesomeIcon";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {Box, Button, Grid} from "@mui/material";
import {useTranslation} from "react-i18next";


export interface IDynamicFormParam{
    onSubmit :Function,
    fields :Array<IDynamicFieldConfig>
}

const CustomDynamicForm = (props:IDynamicFormParam) => {
    const {t} = useTranslation('global');
    const [state, setState] = useState<{
        fields: Array<IDynamicFieldConfig>,
        formValid: boolean
    }>({
        fields: [],
        formValid: false
    });

    useEffect(() => {
        setState({...state, fields: props.fields});
    }, [props.fields])


    const formOnSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(state.fields);
    }

    const fieldChange = (event, field, index) => {
        const updatedField = {...field};
        updatedField.value = event.target.value;
        updatedField.valid = checkValidity(updatedField);
        const updatedFields = [...state.fields];
        updatedFields.splice(index, 1, updatedField);
        let formValid = true;
        for (let field of updatedFields) {
            if (!field.valid) {
                formValid = false;
            }
        }
        setState({
            fields: updatedFields,
            formValid: formValid
        })
    }

    const checkValidity = (field) => {
        const rules = field.validation;
        const value = field.value;
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.pattern) {
            isValid = rules.pattern.test(value) && isValid
        }
        return isValid;
    }
    const fieldBlur = (event, field, index) => {
        if (field.touched) {
            return;
        }
        const updatedField = {...field};
        updatedField.touched = true;
        updatedField.valid = checkValidity(updatedField);
        const updatedFields = [...state.fields];
        updatedFields.splice(index, 1, updatedField);
        setState({
            ...state,
            fields: updatedFields,
        })
    }
    return (

        <form onSubmit={formOnSubmit}>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                    {state.fields.map((field, index) => {
                        return(
                            <Grid item xs={12} sm={12} md={12} key={index}>
                                <CustomDynamicField
                                    key={field.id}
                                    fieldConfig={field}
                                    blured={(event) => fieldBlur(event, field, index)}
                                    changed={(event) => fieldChange(event, field, index)}/>
                            </Grid>
                        )
                    })}
                    <Grid item xs={12} sm={12} md={12} className="text-left">
                        <Button disabled={!state.formValid} type='submit' variant='contained' color='info'
                                startIcon={<CustomFontAwesomeIcon icon={faSave}/>}>
                            {`${t('save')}`}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </form>

    )
}

export default CustomDynamicForm;