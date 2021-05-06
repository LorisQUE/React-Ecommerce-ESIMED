import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputLabel from '../components/form/inputLabel';
import { BASE_URL } from '../services/data';
import { getLocalPanier, setLocalPanier } from '../services/storeService'

 export  default  function Cart() {
    const history = useHistory();
    const [articles, setArticles] = useState(getLocalPanier());
    const [prixTotal, setPrixTotal] = useState(0);
    let newPrix = 0;

    useEffect(() => {
        getProducts().then(() => {
            console.log(articles);
            setArticles(articles);
            setLocalPanier(articles);
            setPrixTotal(Number(newPrix.toFixed(2)));
        });
        console.log(articles);
    }, [])

    const getProducts = async () => {
        const url = BASE_URL + "produits/";
        return Promise.all(
            articles.map((x, y) => {
                return axios.get(url + x.produitId)
                .then(res => {
                    articles[y].libelle = res.data.libelle;
                    articles[y].prix = res.data.prix;
                    articles[y].image = res.data.image;
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

  const handleRemove = (e) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    const modif = articles[name];
    const prix = modif.prix * modif.quantite;
    setPrixTotal((oldPrixTotal) => Number((oldPrixTotal - prix).toFixed(2)));

    articles.splice(name, 1);
    setArticles([...articles]);
    setLocalPanier(articles);
    window.setNbArt(getLocalPanier().length);
  }

  const handleValidation = () => {
      if(articles.length > 0) history.push("/address");
      else toast.info("Vous devez avoir au moins un article");
  }

    return (
        <main className="container marg-hauteur">
            <h1>Mon panier</h1>
            <table id="table-cart" className="table table-hover">

                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Libelle</th>
                        <th scope="col">Couleur</th>
                        <th scope="col">Taille</th>
                        <th scope="col">Quantité</th>
                        <th scope="col" className="price-cart">Prix</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {articles.map((x, y) =>{
                            {console.log("ARTICLES MAPPED", articles)}
                        return (
                            <tr key={y}>
                                <td><img src={x.image} className="img-commande" /></td>
                                <th>{x.libelle}</th>
                                <td>{x.couleur}</td>
                                <td>{x.taille}</td>
                                <td>
                                    <InputLabel  change={handleChange} value={x.quantite} name={y} type="number" placeholder="Choisissez une quantité" min="1" />
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
                <div>
                    <a className="btn btn-primary" onClick={handleValidation}> Valider le panier </a>
                    <Link className="btn btn-secondary" to="/"> Continuer mes achats </Link>
                </div>
            </div>
        </main>
    )
}
