import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';
import { FiEdit, FiArrowLeft } from 'react-icons/fi';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Card from '../../components/Card';
import PlayerModal from '../../components/PlayerModal';

import logoImg from '../../assets/logo.svg';


export default function Player(props){
    const [player, setPlayer] = useState({});
    const [position, setPosition] = useState({});
    const [positions, setPositions] = useState({});
    const [players, setPlayers] = useState([]);

    const [modal, setModal] = useState(false);

    const { match: { params } } = props;

    const history = useHistory();

    useEffect(() => {
        api.get(`api/player/${params.id}`).then(response => {
            setPlayers(response.data.position.players);
            setPosition(response.data.position);
            setPlayer(response.data);
        });
        api.get('api/position').then(response => {
            setPositions(response.data);
        })
    }, [params.id]);

    async function handleDeletePlayer(id){
        const accept = window.confirm("Você tem certeza que deseja apagar o jogador?");

        if(accept) {
            try{
                await api.delete(`api/player/${id}`);
                history.push('/players');    
            }
            catch(err){
                alert('Erro ao deletar jogador, tente novamente');
            }
        }
    }

    return (
        <>
            {modal && <PlayerModal title="Editar Jogador" positions={positions} onClose={() => setModal(false)} method="put"
                id={player.id}
                nome={player.name}
                numero={player.number}
                posicao={position.id}
                idade={player.age}
                peso={player.weight} />}
            <Header />
            <div className="player-content">
            <div className="player">

                <div className="player-data">

                    <div className="data-buttons">
                        <Link to="/players"><FiArrowLeft className="icon" size={40} color="#C69B08" /></Link>
                        <div className="bts">
                            <Button
                                text="Excluir Jogador"
                                pos="bt right red"
                                textColor="black"
                                click={() => handleDeletePlayer(player.id)} />
                            <Button text="Editar Jogador" pos="bt right" click={() => setModal(true)}>
                                <FiEdit className="icon" size={20} color="#C69B08"/>
                            </Button>
                        </div>
                    </div>
                    <div className="player-info">

                        <img src={logoImg} alt="NessFC" className="player-escudo" />
                        <div className="data">
                            <div className="left-data">
                                <h2>{player.name}</h2>
                                <span>{player.age} anos</span>
                                <span>{player.weight} Kgs</span>
                            </div>
                            <div className="right-data">
                                <h2>{position.name}</h2>
                                <h2>Camisa</h2>
                                <h1>{player.number}</h1>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="other-players">

                    <h3>Outros jogadores da posição “{position.name}”:</h3>
                    <div className="player-listing">
                        {players.map(player =>
                            <Card key={player.id}
                                to={`/players/${player.id}`}
                                position={position.name}
                                age={player.age}
                                weight={player.weight}
                                number={player.number}
                                >{player.name}</Card>
                        )}
                    </div>

                </div>

            </div>
            </div>
        </>
    );
}