import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';


export default function PositionModal({ title, onClose = () => {} }){
    const [name, setName] = useState("");

    const history = useHistory();

    async function handleSubmit(){
        const data = {
            name
        };


        try{
            const res = await api.post('api/position', data);
            history.push(`/positions/${res.data.id}`);
        }
        catch(err){
            alert('Erro ao cadastrar posição, tente novamente');
        }
    }

    return (
        <>
            <div className="modal">
                <h1>{title}</h1>
                <form className="modal-form">
                    <input type="text" name="name" placeholder="Nome" value={name} onChange={(value) => setName(value.target.value)}/>
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