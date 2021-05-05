import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import InputLabel from '../components/form/inputLabel'
import { BASE_URL } from '../services/data'
import { clearLocalPanier } from '../services/storeService'
import Cart from './cart'
import CreditCardInput from 'react-credit-card-input';
import Cards from 'react-credit-cards';
import TableCart from '../components/store/tableCart'

export default function Payment() {
    const history = useHistory();

    const [panier, setPanier] = useState()

    useEffect(() => {
        const panier = JSON.parse(localStorage.getItem("commande"));
        setPanier(panier.produits);
    }, [])

    const handleChange = () => {

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = BASE_URL + "commandes";
        const commande = JSON.parse(localStorage.getItem("commande"));
        axios.post(url, commande)
        .then((res) => {
                clearLocalPanier();
                toast.success("Votre commande viens d'être envoyée !")
                history.push("/thanks");
            }
        );
    }

    const handleAnnuler = () => {

    }

    return (
        <main className="payment container marg-hauteur">
            <h1>RÉCAPITULATIF DE VOTRE PANIER D'ACHAT</h1>
            <TableCart articles={panier} />
            <h1>Méthode de paiement</h1>
            <form onSubmit={handleSubmit}>
                
                Veuillez saisir les informations de votre paiement : 

                {/* <InputLabel required="required" change={handleChange} type="text" label="Numéro de carte : " placeholder="Saisir votre numéro de carte" min="1" />
                <InputLabel required="required" change={handleChange} type="text" label="Date d'expiration : " placeholder="Saisir la date d'expiration" min="1" />
                <InputLabel required="required" change={handleChange} type="text" label="Cryptogramme arrière : " placeholder="Saisir les cryptogramme arrière" min="1" /> */}
                
                <div className="creditCardInput">
                    <CreditCardInput
                    onError={({ inputName, err }) => console.log(`credit card input error: ${err}`)}
                    fieldClassName="input"
                    required
                    customTextLabels={{
                        invalidCardNumber: 'Le numéro de carte est invalide',
                        expiryError: {
                          invalidExpiryDate: "La date d'expiration est invalide",
                          monthOutOfRange: "Le mois de la date d'expiration doit être entre 01 et 12",
                          yearOutOfRange: "L'année de la date d'expiration ne peut pas être dans le passé",
                          dateOutOfRange: "La date d'expiration ne peut pas être dans le passé"
                        },
                        invalidCvc: 'Le code de sécurité est invalide',
                        cardNumberPlaceholder: 'Numéro de carte',
                        expiryPlaceholder: 'MM/AA',
                      }}
                    />
                </div>


                <div>
                    <button className="btn btn-secondary" onClick={handleAnnuler}>Annuler</button>
                    <button type="submit" className="btn btn-primary">Valider et payer</button>
                </div>
            </form>
        </main>
    )
}
