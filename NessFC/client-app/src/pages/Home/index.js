import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';


export default function Home(){

    return (
        <>
            <h1>Bem-vindo ao Ness Football Club</h1>

            <img src={logoImg} alt="NessFC" />

            <h2>Gerencie posições e jogadores do<br />
             tradicional clube de São Paulo</h2>

             <Link to="/"><Button /></Link>
        </>
    );
}