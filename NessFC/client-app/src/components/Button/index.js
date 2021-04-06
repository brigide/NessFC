import React from 'react';
import './styles.css';


export default function Button({ text, children, pos = "bt", textColor = "default", click }){
    return (
        <button type="button" className={pos} onClick={click}>
            <span className={`bt-text ${textColor}`}>{text}</span>
            {children}
        </button>
    );
}