import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';

export default function Header(){

    return (
        <div className="header">
            <div className="header-content">
                <h1>Ness Football Club</h1>
                <Link to="/">Sair</Link>
            </div>
        </div>
    );
}