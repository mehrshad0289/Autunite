import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import React from 'react';

const CustomFontAwesomeIcon = (props: FontAwesomeIconProps) => {
    return (
        <FontAwesomeIcon
            color={props.color ? props.color : "black"}
            fontSize={props.fontSize ? props.fontSize : 18}
            {...props}/>
    );
}

export default CustomFontAwesomeIcon;