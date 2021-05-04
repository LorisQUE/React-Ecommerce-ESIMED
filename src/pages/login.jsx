import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import InputLabel from '../components/form/inputLabel';
import { BASE_URL } from '../services/data';
import { setLocalUser } from '../services/userService';

export default function Login(props) {
    const [connexions, setConnexions] = useState({email: "", mdp: ""});
    const [error, setError] = useState(false);
    const context = useContext(AuthContext);

    const handleChange = (e) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        setConnexions({...connexions, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = BASE_URL + "utilisateurs";
        const result = axios.get(url, { params: 
            { 
                email: connexions.email, 
                mdp: connexions.pwd 
            }
        });

        result.then(res => { 
            console.log("la", res.data)
            if(!res.data[0]) {
                setError(true);
                localStorage.removeItem("utilisateur");
                context.setConnected(false);
            } else {
                setError(false);
                setLocalUser(res.data[0]);
                context.setConnected(true);
                props.history.push("/");
            }
        })
    }
    return (
        <main className="container marg-hauteur">
            <h1>Connexion</h1>
            {error &&
                <div className="alert alert-dismissible alert-danger">
                    Attention, connexion impossible, la combinaison nom et mot de passe n'est pas correcte.
                </div>
            }
            <form onSubmit={handleSubmit} method="POST">
                <div>
                    <InputLabel required="required" value={connexions.email} change={handleChange} name="email" label="Email" type="email" placeholder="Saisir votre e-mail"/>
                    <InputLabel required="required" value={connexions.pwd} change={handleChange} name="pwd" label="Mot de Passe" type="password" placeholder="Saisir votre mot de passe"/>
                </div>
                <button type="submit" className="btn btn-primary">Se Connecter</button>
                <Link to="/register" className="btn btn-secondary">S'inscrire</Link>
            </form>
        </main>
    )
}
