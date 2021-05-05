import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import InputLabel from '../components/form/inputLabel'
import { BASE_URL } from '../services/data'
import { clearLocalPanier, getLocalPanier } from '../services/storeService'
import { getLocalUser } from '../services/userService'

export default function Address() {
    const history = useHistory();
    const [adresse, setAdresse] = useState({voie: "", ville: "", CP: "" })

    useEffect(() => {
        const user = getLocalUser();
        setAdresse(user.adresse);
    }, [])

    const handleChange = (e) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setAdresse({...adresse, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const produits = getLocalPanier();
        const commande = {
            "userId": getLocalUser().id,
            "date": Date.now(),
            "adresse": adresse,
            "produits": produits
        }
        localStorage.setItem("commande", JSON.stringify(commande));
        history.push("/payment");
    }

    return (
        <main className="container marg-hauteur">
            <h1>VOS COORDONNÉES - ADRESSE DE LIVRAISON</h1>
            Où faut-il livrer votre commande ?
            <form onSubmit={handleSubmit}>
                <InputLabel required="required" value={adresse.voie} change={handleChange} name="voie" label="Voie*" type="text" placeholder="Saisir votre numéro et nom de voie" />
                <InputLabel required="required" value={adresse.ville} change={handleChange} name="ville" label="Ville*" type="text" placeholder="Saisir le nom de votre ville" />
                <InputLabel required="required" value={adresse.CP} change={handleChange} name="CP" label="Code Postal*" type="text" placeholder="Saisir le code postal de votre ville" />       
                <button type="submit" className="btn btn-primary">Valider</button>
            </form>
        </main>
    )
}