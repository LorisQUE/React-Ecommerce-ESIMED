const KEY_PANIER = "panier";
export const PRIX_COLISSIMO = 5.90;

export const getLocalPanier = () => {
    const panier = JSON.parse(localStorage.getItem(KEY_PANIER));
    return !!panier ? panier : [];
};

export const setLocalPanier = (panier) => {
    localStorage.setItem(KEY_PANIER, JSON.stringify(panier));
};

export const checkLocalPanier = (article) => {
    const panier = getLocalPanier();
    const commande = panier.filter( (x) => (x.produitId == article.produitId && (x.couleur == article.couleur && x.taille == article.taille)));

    if(commande.length == 0) {
        panier.push(article);
        setLocalPanier(panier);
    }
    else {
        const articleSelected = commande[0];
        articleSelected.quantite += parseInt(article.quantite);
        setLocalPanier(panier);
    }
};

export const clearLocalPanier = () => {
    localStorage.removeItem(KEY_PANIER);
};