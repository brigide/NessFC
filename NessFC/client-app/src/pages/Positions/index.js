import React, { useState, useEffect } from 'react';
import './styles.css';
import api from '../../services/api';
import { FiPlus } from 'react-icons/fi';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Menu from '../../components/Menu';
import Item from '../../components/Item';
import PositionModal from '../../components/PositionModal';


export default function Positions(){
    const [positions, setPositions] = useState([]);

    const [modal, setModal] = useState(false);

    useEffect(() => {
        api.get('api/position').then(response => {
            setPositions(response.data);
        })
    }, []);

    return (
        <>
            {modal && <PositionModal title="Criar Posição" onClose={() => setModal(false)} />}
            <Header />
                <div className="positions">

                    <div className="positions-content">
                        <Button text="Nova Posição" pos="bt right" click={() => setModal(true)}>
                            <FiPlus className="icon" size={20} color="#C69B08"/>
                        </Button>

                        <Menu op2="selected-item" to1="/players" to2="/positions" />
                    </div>

                    <div className="positions-listing">
                        {positions.map(position => 
                            <Item key={position.id}
                                to={`/positions/${position.id}`}>{position.name}</Item>
                        )}
                    </div>
                </div>
        </>
    );
}