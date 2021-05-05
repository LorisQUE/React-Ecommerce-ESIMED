import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import TableCart from '../components/store/tableCart';
import { BASE_URL } from '../services/data';
import { getLocalUser } from '../services/userService';

export default function Thanks() {
  const params = useParams();

    const [commande, setCommande] = useState({})

    useEffect(() => {
        const url = BASE_URL + "commandes";
        const currentUser = getLocalUser();
        console.log(currentUser)
        axios.get(url + "?_limit=1&_sort=id&_order=desc&userId=" + currentUser.id)
        .then(res => {
            setCommande(res.data[0]);
            console.log("commande", commande, res.data);
        })
    }, [])

    return (
        <main className="container marg-hauteur">
            <h1>Merci pour votre achat !</h1>

            Un e-mail de confirmation d'achat vous a été envoyée sur votre messagerie.
            À bientôt dans notre boutique !

            <TableCart articles={commande.produits} />
        </main>
    )
}
