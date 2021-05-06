import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../services/data'

export default function MenuLi(props) {
    return (
        !props.isStore ?
        (<li className="nav-item">
        <Link className="nav-link" to={props.lien}>{props.nom}</Link>
        </li>)
        : (
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{props.nom}</a>
            <div className="dropdown-menu">
                <Link className="dropdown-item" to={props.lien}>Tous les produits</Link>
                {props.types.map((x, y) => <Link key={y} className="dropdown-item" to={props.lien + "/" + x.id}>{x.libelle}</Link>)}   
            </div>
        </li>
        )
    )
}
