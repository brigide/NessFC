import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';


export default function PlayerModal({ title, positions, onClose = () => {}, method, id = "", nome = "", numero = "", posicao = "", idade = "", peso = "" }){
    const [name, setName] = useState(nome);
    const [number, setNumber] = useState(numero);
    const [positionId, setPositionId] = useState(posicao);
    const [age, setAge] = useState(idade);
    const [weight, setWeight] = useState(peso);

    const history = useHistory();

    async function handleSubmit(){
        const data = {
            name,
            number,
            positionId,
            age,
            weight
        };

        if(method === "post"){
            try{
                const res = await api.post('api/player', data);
                history.push(`/players/${res.data.id}`);
            }
            catch(err){
                alert('Erro ao cadastrar jogador, tente novamente');
            }
        }
        if(method === "put"){
            try{
                const res = await api.put(`api/player/${id}`, data);
                history.push(`/players/${res.data.id}`);
                onClose();
            }
            catch(err){
                alert('Erro ao editar jogador, tente novamente');
            }
        }

        
    }

    return (
        <>
            <div className="modal">
                <h1>{title}</h1>
                <form className="modal-form">
                    <input type="text" name="name" placeholder="Nome" value={name} onChange={(value) => setName(value.target.value)}/>
                    <input type="text" name="number" placeholder="Número" value={number} onChange={(value) => setNumber(value.target.value)} />
                    <select name="positions" id="positions" value={positionId} onChange={(value) => setPositionId(value.target.value)}>
                        <option>Selecione a posição</option>
                        {positions.map(pos =>
                        <option key={pos.id} value={pos.id}>{pos.name}</option>)}
                    </select>
                    <input type="text" name="age" placeholder="Idade" value={age} onChange={(value) => setAge(value.target.value)} />
                    <input type="text" name="weight" placeholder="Peso" value={weight} onChange={(value) => setWeight(value.target.value)} />
                    <div className="modal-bt">
                        <button className="cancel-bt" type="button" onClick={() => onClose()}>Cancelar</button>
                        <button className="confirm-bt" type="button" onClick={() => handleSubmit()}>Confirmar</button>
                    </div>
                </form>
            </div>
            <div className="overlay" onClick={() => onClose()}></div>
        </>
    );
}