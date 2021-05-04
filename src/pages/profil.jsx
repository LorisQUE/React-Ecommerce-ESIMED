import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../services/data';

export default function Profil() {

    useEffect(() => {
        const url = BASE_URL + "commandes";
        const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
        console.log("UTILISATEUR : ", utilisateur);
        axios.get(url, { params: { userId: utilisateur.id}})
        .then(console.log);
    }, [])

    return (
        <main className="container marg-hauteur">
            <h1>Profil</h1>

            

        </main>
    )
}
