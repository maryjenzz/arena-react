import React from 'react';
import '../styles/style.css';

function CardModalidades(props) {
    return (
        <div className="modalidade-card">
            <i className={props.iconClass}></i>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    );
}

export default CardModalidades;