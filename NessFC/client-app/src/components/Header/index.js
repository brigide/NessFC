import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

export default function Header(){

    return (
        <div className="header">
            <div className="header-content">
                <h1 className="header-title">Ness Football Club</h1>
                <Link to="/" className="header-leave">
                    <span className="header-back">Sair</span>
                    <FiLogOut className="header-icon" size={24} color="#C69B08"/>
                </Link>
            </div>
        </div>
    );
}