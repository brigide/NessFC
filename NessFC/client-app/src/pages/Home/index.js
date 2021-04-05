import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { FiArrowRight } from 'react-icons/fi';

import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';


export default function Home(){

    return (
        <div className="home">
            <h1 className="title">Bem-vindo ao Ness Football Club</h1>

            <img src={logoImg} alt="NessFC" className="escudo" />

            <h2 className="slogan">Gerencie posições e jogadores do<br />
             tradicional clube de São Paulo</h2>

            <Link to="/players" className="link">
                <Button text="Iniciar">
                    <FiArrowRight className="icon" size={20} color="#C69B08"/>
                </Button>
            </Link>
        </div>
    );
}