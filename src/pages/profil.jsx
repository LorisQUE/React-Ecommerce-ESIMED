import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { AuthContext } from '../App';
import { BASE_URL } from '../services/data';
import { removeLocalUser } from '../services/userService';

export default function Profil() {
    const history = useHistory();
    const context = useContext(AuthContext);
    const [commandes, setCommandes] = useState([]);

    useEffect(() => {
        const url = BASE_URL + "commandes";
        const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
        console.log("UTILISATEUR : ", utilisateur);
        axios.get(url, { params: { userId: utilisateur.id}})
        .then(res => {
            console.log("data", res.data);
            setCommandes(res.data)
        });
    }, [])

    const handleDeconnexion = () => {
        removeLocalUser();
        context.setConnected(false);
        history.push("/");
    }

    return (
        <main className="container marg-hauteur">
            <h1>Profil</h1>

            
            <button onClick={handleDeconnexion} className="btn btn-secondary">Déconnexion</button>
        </main>
    )
}
