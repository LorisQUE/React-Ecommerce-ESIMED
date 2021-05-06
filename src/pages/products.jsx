import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CardProduct from '../components/store/cardProduct';
import { BASE_URL } from '../services/data';

export default function Products(props) {
    const params = useParams();
    const url = BASE_URL + "produits";
    const [produits, setProduits] = useState([])
    useEffect(() => {
        let paramGet;

        if(params.recherche)
            paramGet = { libelle_like: params.recherche }
        else if(params.categorie && !params.type)
            paramGet = { categorieId: params.categorie }
        else if(params.categorie && params.type)
            paramGet = { categorieId: params.categorie, typeId: params.type  }
            
        axios.get(url, { params: paramGet })
        .then(res => setProduits([...res.data]))
        .catch(err => toast.error("Erreur lors de la récupération des produits : " + err));
    }, [params]);

    return (
        <div className="container marg-hauteur">
            <h1>Les produits</h1>
            <div className="card-container"> {produits.map((x) => <Link key={x.id} to={'/product/' + x.id} className="card-link"><CardProduct produit={x}/></Link>)} </div>
            {produits.length == 0  && <h3>Désolé ! Aucun produit n'est disponible.</h3>}
        </div>
    )
}
