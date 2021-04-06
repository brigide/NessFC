import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';
import { FiPlus, FiArrowLeft } from 'react-icons/fi';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Menu from '../../components/Menu';
import Card from '../../components/Card';


export default function Position(props){
    const [position, setPosition] = useState({});
    const [players, setPlayers] = useState([]);

    const { match: { params } } = props;

    const history = useHistory();

    useEffect(() => {
        api.get(`api/position/${params.id}`).then(response => {
            setPlayers(response.data.players);
            setPosition(response.data);
        })
    }, [params.id]);

    async function handleDeletePosition(id){
        const accept = window.confirm("Você tem certeza que deseja apagar a posição? Apagar a posição deletará todos os jogadores pertencentes a ela");

        if(accept) {
            try{
                await api.delete(`api/position/${id}`);
                history.push('/positions');    
            }
            catch(err){
                alert('Erro ao deletar posição, tente novamente');
            }
        }
    }

    return (
        <>
            <Header />
                <div className="position">

                    <div className="nav-buttons">
                        <Link to="/positions"><FiArrowLeft className="icon" size={40} color="#C69B08" /></Link>
                        <Button className="bts"
                                text="Excluir Posição"
                                pos="bt right red"
                                textColor="black"
                                click={() => handleDeletePosition(position.id)} />

                    </div>

                    <div className="position-listing">
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
        </>
    );
}