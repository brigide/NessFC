import React from 'react';
import './styles.css';


export default function Button({ text, children, pos = "bt", textColor = "default" }){
    return (
        <button type="button" className={pos}>
            <span className={`bt-text ${textColor}`}>{text}</span>
            {children}
        </button>
    );
}