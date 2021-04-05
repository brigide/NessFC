import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';


export default function Card(props){

    return (
        <Link to={props.to} className="card">
            <div className="info">
                <h2>{props.position}</h2>
                <span>{props.age} anos / {props.weight} Kgs</span>
            </div>
            <div className="player-card">
                <span className="player-number">{props.number}</span>
                <span className="player-name">{props.children}</span>
            </div>
        </Link>
    );
}