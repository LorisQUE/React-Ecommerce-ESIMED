import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import InputLabel from "../components/form/inputLabel";
import { BASE_URL } from "../services/data";
import { checkLocalPanier, getLocalPanier, setLocalPanier } from "../services/storeService";

export default function ProductDetail(props) {
  const params = useParams();
  const url = BASE_URL + "produits/" + params.id;
  const [produit, setProduit] = useState({});
  const [article, setArticle] = useState({
    couleur: "",
    taille: "",
    quantite: "1",
  });

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setProduit(res.data);
        return res.data;
      })
      .then((produit) => {
        axios
          .get(BASE_URL + "categories/" + produit.categorieId)
          .then((res) =>
            setProduit({ ...produit, categorie: res.data.libelle })
          );
      });
  }, [params]);

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    setArticle({ ...article, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    article.produitId = produit.id;
    article.quantite = parseInt(article.quantite);
    checkLocalPanier(article);
  };

  return (
    <main className="container marg-hauteur">
      <h1>Détail du produit {produit.libelle}</h1>
      <div className="flex">
        <img src={produit.image} />
        <div className="detail">
          <label>Libelle</label>
          <p>{produit.libelle}</p>
          <label>Description</label>
          <p>{produit.description}</p>
          <label>Catégorie</label>
          <p>{produit.categorie}</p>
          <label>Prix</label>
          <p>{produit.prix}€</p>
          <form onSubmit={handleSubmit} className="form-group">
            <div>
              <label>Couleur</label>
              <select
                className="form-control"
                onChange={handleChange}
                name="couleur"
                required
              >
                <option value="">Sélectionnez une couleur</option>
                {produit.couleur &&
                  produit.couleur.map((x, y) => (
                    <option key={y} value={x}>
                      {x}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label>Taille</label>
              <select
                className="form-control"
                onChange={handleChange}
                name="taille"
                required
              >
                <option value="">Sélectionner une taille</option>
                {produit.taille &&
                  produit.taille.map((x, y) => (
                    <option key={y} value={x}>
                      {x}
                    </option>
                  ))}
              </select>
            </div>
            <InputLabel
              required="required"
              change={handleChange}
              value={article.quantite}
              name="quantite"
              label="Quantité"
              type="number"
              placeholder="Choisissez une quantité"
              min="1"
            />
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-shopping-basket" /> Ajouter au panier
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
