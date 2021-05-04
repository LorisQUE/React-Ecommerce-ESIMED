import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InputLabel from '../components/form/inputLabel';
import { BASE_URL } from '../services/data';
import { getLocalPanier, removeFromLocalPanier, setLocalPanier } from '../services/storeService'

 export  default  function Cart() {
    const [articles, setArticles] = useState(getLocalPanier());
    const [prixTotal, setPrixTotal] = useState(0);
    let newPrix = 0;

    useEffect(() => {
        getProducts().then(() => {
            setArticles([...articles]);
            setPrixTotal(Number(newPrix.toFixed(2)));
        });
    }, [])

    const getProducts = async () => {
        const url = BASE_URL + "produits/";
        return Promise.all(
            articles.map( (x, y) => {
                return axios.get(url + x.produitId)
                .then(res => {
                    articles[y].libelle = res.data.libelle;
                    articles[y].prix = res.data.prix;
                    newPrix += res.data.prix * articles[y].quantite;
                    return articles[y];
                });
        }))
    }

    
  const handleChange = (e) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    const modif = articles[name];
    const oldPrix = modif.prix * modif.quantite;
    const prix = modif.prix * value;
    newPrix = (newPrix - oldPrix) + prix;
    setPrixTotal((oldPrixTotal) => Number((oldPrixTotal + newPrix).toFixed(2)));
    modif.quantite = parseInt(value);
    setArticles([...articles]);
    setLocalPanier(articles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleRemove = (e) => {
    const name = e.currentTarget.name;
    e.preventDefault();
    console.log("handle Remove");
    removeFromLocalPanier(articles, name);
  }

    return (
        <main className="container marg-hauteur">
            <h1>Mon panier</h1>
            <table className="table table-hover">

                <thead>
                    <tr>
                        <th scope="col">Libelle</th>
                        <th scope="col">Couleur</th>
                        <th scope="col">Taille</th>
                        <th scope="col">Quantité</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {articles.map((x, y) =>{
                        return (
                            <tr key={y}>
                                <th>{x.libelle}</th>
                                <td>{x.couleur}</td>
                                <td>{x.taille}</td>
                                <td>
                                    <InputLabel change={handleChange} value={x.quantite} name={y} type="number" placeholder="Choisissez une quantité" min="1" />
                                </td>
                                <td>{Number((x.prix * x.quantite).toFixed(2))}€</td>
                                <td><a onClick={handleRemove} name={y} className="remove"><i className="far fa-trash-alt"></i></a></td>
                            </tr>
                            )
                    })}
                </tbody>
            </table>
            <div className="flex-prix">
                <h6>Prix total : {prixTotal}€</h6>
                <button className="btn btn-primary"> Acheter </button>
            </div>
        </main>
    )
}
