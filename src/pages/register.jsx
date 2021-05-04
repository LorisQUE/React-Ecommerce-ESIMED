import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../App';
import InputLabel from '../components/form/inputLabel';
import { BASE_URL } from '../services/data';

export default function Register(props) {
    const context = useContext(AuthContext);
    const [identifiant, setIdentifiant] = useState({
        "nom": "",
        "prenom": "",
        "email": "",
        "civilite": "",
        "adresse": {
            "voie": "",
            "ville": "",
            "CP": ""
        },
        "tel": "",
        "mdp": ""
    });
    const handleChange = (e) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        if (name in identifiant.adresse) {
            setIdentifiant({
                ...identifiant, adresse: {
                    ...identifiant.adresse,
                    [name]: value
                }
            })
 
        } else {
            setIdentifiant({ ...identifiant, [name]: value })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = BASE_URL + "utilisateurs";
        const result = axios.post(url, identifiant);

        result.then(res => {
            localStorage.setItem("utilisateur", JSON.stringify(res.data));
            context.setConnected(true);
            props.history.push("/profil");
            toast.success("Votre compte a bien été créé ! Vous êtes désormais connecter en tant que " + res.data.nom + " " + res.data.prenom)

        })
    }
    return (
        <main className="container marg-hauteur">
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit} method="POST">
                <InputLabel required="required" value={identifiant.nom} change={handleChange} name="nom" label="Nom*" type="text" placeholder="Saisir votre nom" />
                <InputLabel required="required" value={identifiant.prenom} change={handleChange} name="prenom" label="Prenom*" type="text" placeholder="Saisir votre prenom" />
                <label>Civilité*</label>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" onChange={handleChange} class="form-check-input" name="civilite" value="M" required />
                        Homme
                    </label>
                </div>
                <div class="form-check disabled">
                    <label class="form-check-label">
                        <input type="radio" onChange={handleChange} class="form-check-input" name="civilite" value="Mme" required />
                        Femme
                    </label>
                </div>
                <br/>
                <InputLabel required="required" value={identifiant.email} change={handleChange} name="email" label="Email*" type="email" placeholder="Saisir votre mail" />
                <InputLabel required="required" value={identifiant.telephone} change={handleChange} name="tel" label="Téléphone*" type="text" placeholder="Saisir votre numéro de téléphone" />
                <InputLabel required="required" value={identifiant.adresse.voie} change={handleChange} name="voie" label="Voie*" type="text" placeholder="Saisir votre numéro et nom de voie" />
                <InputLabel required="required" value={identifiant.adresse.ville} change={handleChange} name="ville" label="Ville*" type="text" placeholder="Saisir le nom de votre ville" />
                <InputLabel required="required" value={identifiant.adresse.CP} change={handleChange} name="CP" label="Code Postal*" type="text" placeholder="Saisir le code postal de votre ville" />
                <InputLabel required="required" value={identifiant.mdp} change={handleChange} name="mdp" label="Mot de Passe*" type="password" placeholder="Saisir votre mot de passe" />
                <button type="submit" className="btn btn-primary">S'inscrire</button>
                <Link to="/login" className="btn btn-secondary">Se connecter</Link>
            </form>
        </main>
    )
}
