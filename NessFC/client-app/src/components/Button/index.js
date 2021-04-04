import React from 'react';
import './styles.css';
import { FiArrowRight, FiPlus } from 'react-icons/fi';

export default function Button({ text, icon }){

    if(icon === "FiArrowRight")
        icon = <FiArrowRight className="icon" size={20} color="#C69B08"/>
    if(icon === "FiPlus")
        icon = <FiPlus className="icon" size={20} color="#C69B08"/>

    return (
        <div className="bt">
            <span className="bt-text">{text}</span>
            <FiArrowRight className="icon" size={20} color="#C69B08"/>
        </div>
    );
}