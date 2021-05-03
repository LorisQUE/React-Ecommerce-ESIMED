import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import InputLabel from '../components/form/inputLabel';
import { BASE_URL } from '../services/data';

export default function Contact() {
    
    const [contacts, setContacts] = useState({ email: "", nom: "", prenom: "", tel: "", message: "" });

    const handleChange = (e) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        setContacts({ ...contacts, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = BASE_URL + "contacts";
        const result = axios.post(url, contacts);

        result.then(res => {
            setContacts({ email: "", nom: "", prenom: "", tel: "", message: "" });
            toast.success("Votre message a bien été transmis !");
        })
    }
    return (
        <main className="container marg-hauteur">
            <h1>Contact</h1>
            <form onSubmit={handleSubmit} method="POST">
                <div>
                    <div className="flexouille">
                        <InputLabel required="required" value={contacts.nom} change={handleChange} name="nom" label="Nom*" type="text" placeholder="Saisir votre nom" />
                        <InputLabel required="required" value={contacts.prenom} change={handleChange} name="prenom" label="Prenom*" type="text" placeholder="Saisir votre prenom" />
                    </div>
                    <div className="flexouille">
                        <InputLabel required="required" value={contacts.email} change={handleChange} name="email" label="Email*" type="email" placeholder="Saisir votre e-mail" />
                        <InputLabel required="required" value={contacts.tel} change={handleChange} name="tel" label="Téléphone*" type="n" placeholder="Saisir votre numéro de téléphone" />
                    </div>
                    <label>Message*</label>
                    <textarea required value={contacts.message} onChange={handleChange} name="message" placeholder="Saisir votre message" className="form-control" rows="3"></textarea>
                    <span className="soustitre">Champs obligatoires *</span>
                </div>
                <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
        </main>
    )
}
