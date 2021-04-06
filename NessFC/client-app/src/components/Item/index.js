import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';


export default function Item({ to, children }){

    return (
        <Link to={to} className="list-item">
            <span className="item-name">{children}</span>
            <span>Ver mais...</span>
        </Link>
    );
}