import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import InputLabel from '../components/form/inputLabel'
import { getLocalPanier, PRIX_COLISSIMO } from '../services/storeService'
import { getLocalUser } from '../services/userService'

export default function Address() {
    const history = useHistory();
    const [adresse, setAdresse] = useState({voie: "", ville: "", CP: "", nom: "", prenom: "" })
    const [livraison, setLivraison] = useState(false);
    const [prixTotal, setPrixTotal] = useState(0);
    let newPrix = 0;

    useEffect(() => {
        const user = getLocalUser();
        calculePrix()
        .then(() => {
            if(livraison) newPrix += PRIX_COLISSIMO;
            setPrixTotal(Number(newPrix.toFixed(2)));
        });
        setAdresse({...user.adresse, nom: user.nom, prenom: user.prenom});
    }, [])

    const handleChange = (e) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        if(name == "livraison"){
            const isColissimo = (value == "true");
            setLivraison(isColissimo)
            calculePrix()
            .then(() => {
                if(isColissimo) newPrix += PRIX_COLISSIMO;
                setPrixTotal(Number(newPrix.toFixed(2)));
            });
        } else {
            setAdresse({...adresse, [name]: value});
        }
    }

    const calculePrix = async () => {
        newPrix = 0;
        return Promise.all(
            getLocalPanier().map((x) => {
                newPrix += x.prix * x.quantite;
                return newPrix;
            })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const produits = getLocalPanier();
        const commande = {
            "userId": getLocalUser().id,
            "date": Date.now(),
            "adresse": adresse,
            "produits": produits,
            "isColissimo": livraison
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
                
                A quel nom ?
                <InputLabel required="required" value={adresse.nom} change={handleChange} name="nom" label="Nom*" type="text" placeholder="Saisir le nom du destinataire" />
                <InputLabel required="required" value={adresse.prenom} change={handleChange} name="prenom" label="Prenom*" type="text" placeholder="Saisir le prenom du destinataire" />
                <label>Mode de livraison*</label>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="radio" onChange={handleChange} className="form-check-input" name="livraison" value={true} required />
                        Colissimo ({PRIX_COLISSIMO}€)
                    </label>
                </div>
                <div className="form-check disabled">
                    <label className="form-check-label">
                        <input type="radio" onChange={handleChange} className="form-check-input" name="livraison" value={false} required />
                        Point relais (gratuit)
                    </label>
                </div>
                <br/>
                <label>Prix total : {prixTotal}€</label>
                <br/>
                <button type="submit" className="btn btn-primary">Valider</button>
            </form>
        </main>
    )
}