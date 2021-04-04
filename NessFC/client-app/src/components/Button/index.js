import React from 'react';
import './styles.css';
import { FiArrowRight } from 'react-icons/fi';

export default function Button(){

    return (
        <div className="bt">
            <span className="bt-text">Iniciar</span>
            <FiArrowRight size={16} color="#C69B08"/>
        </div>
    );
}