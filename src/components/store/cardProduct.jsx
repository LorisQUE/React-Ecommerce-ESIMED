import React from 'react'

export default function CardProduct({ produit }) {
    console.log("PRODUIT", produit);
    return (
        <>
            <div className="card mb-3 card-product">
                <h3 className="card-header">{produit.libelle} - #{produit.id}</h3>
                <div className="card-img-container"><img className="card-image" src={produit.image}></img></div>
                <div className="card-body">
                    <p className="card-text description">{produit.description}</p>
                    <label>{produit.prix}€</label>
                </div>
            </div>
        </>
    )
}
