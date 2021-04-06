import React, { useState, useEffect } from 'react';
import './styles.css';
import api from '../../services/api';
import { FiPlus } from 'react-icons/fi';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Menu from '../../components/Menu';
import Card from '../../components/Card';
import PlayerModal from '../../components/PlayerModal';


export default function Players(){
    const [players, setPlayers] = useState([]);
    const [positions, setPositions] = useState([]);

    const [modal, setModal] = useState(false);

    useEffect(() => {
        api.get('api/player').then(response => {
            setPlayers(response.data);
        });
        api.get('api/position').then(response => {
            setPositions(response.data);
        })
    }, []);

    return (
        <>
            {modal && <PlayerModal title="Criar Jogador" positions={positions} onClose={() => setModal(false)} method="post" />}
            <Header />
                <div className="players">

                    <div className="players-content">
                        <Button text="Novo Jogador" pos="bt right" click={() => setModal(true)}>
                            <FiPlus className="icon" size={20} color="#C69B08"/>
                        </Button>

                        <Menu op1="selected-item" to1="/players" to2="/positions" />
                    </div>

                    <div className="player-listing">
                        {players.map(player =>
                            <Card key={player.id}
                                to={`/players/${player.id}`}
                                position={player.position.name}
                                age={player.age}
                                weight={player.weight}
                                number={player.number}
                                >{player.name}</Card>
                        )}
                    </div>
                </div>
        </>
    );
}