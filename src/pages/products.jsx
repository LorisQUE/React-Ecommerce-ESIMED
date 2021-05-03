import React, { useEffect } from 'react'

export default function Products(props) {
    useEffect(() => {
        //Si on est en mode recherche
        //Ou si on est en mode type (H, F, E)
        //Ou si on vois l'entiéreté des produit (c'est possible ?)
    }, [])
    return (
        <div className="container marg-hauteur">
            <h1>Les produits</h1>
        </div>
    )
}
