import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { AuthContext } from '../App';
import TableCart from '../components/store/tableCart';
import { BASE_URL } from '../services/data';
import { removeLocalUser } from '../services/userService';

export default function Profil() {
    const history = useHistory();
    const context = useContext(AuthContext);
    const [commandes, setCommandes] = useState([]);
    const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
    
    useEffect(() => {
        const url = BASE_URL + "commandes";
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
            <h1>Bonjour {utilisateur.prenom + " " + utilisateur.nom} - Mes commandes</h1>

            {commandes.map(x => {
                return(
                    <div className="div-commande">
                        {console.log("x", x)}
                        <h3>Commande du {new Date(x.date).toLocaleString()}</h3>
                        <TableCart articles={x.produits}/>
                    </div>
                )
            })}

            <button onClick={handleDeconnexion} className="btn btn-secondary">Déconnexion</button>
        </main>
    )
}
