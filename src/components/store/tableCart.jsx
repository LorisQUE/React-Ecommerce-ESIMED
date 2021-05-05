import React, { useEffect, useState } from 'react'

export default function TableCart({articles}) {
    console.log("articles in cart", articles)
    const [prixTotal, setPrixTotal] = useState(0);
    let newPrix = 0;

    useEffect(() => {
        if(!!articles){
            calculePrix()
            .then(setPrixTotal(newPrix));
    }
    }, [articles])

    const calculePrix = async () => {
        console.log("articles", articles)
        return Promise.all(
            articles.map( (x, y) => {
                return newPrix += x.prix * x.quantite;
            })
        )
    }

    return (
        <>
            <table id="table-cart" className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Libelle</th>
                            <th scope="col">Couleur</th>
                            <th scope="col">Taille</th>
                            <th scope="col">Quantité</th>
                            <th scope="col" className="price-cart">Prix</th>
                        </tr>
                    </thead>

                    <tbody>
                        {articles &&(articles.map((x, y) =>{
                            return (
                                <tr key={y}>
                                    <th>{x.libelle}</th>
                                    <td>{x.couleur}</td>
                                    <td>{x.taille}</td>
                                    <td>{x.quantite}</td>
                                    <td>{Number((x.prix * x.quantite).toFixed(2))}€</td>
                                </tr>
                                )
                        }))}
                    </tbody>
                </table>
                <label>Prix total : {prixTotal}€</label>
            </>
    )
}
