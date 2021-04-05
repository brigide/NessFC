import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';


export default function Menu({ op1 = "item", op2 = "item", to1 = "/", to2 = "/" }){

    return (
        <div className="menu">
            <Link to={to1} className={op1}>Jogadores</Link>
            <Link to={to2} className={op2}>Posições</Link>
        </div>
    );
}