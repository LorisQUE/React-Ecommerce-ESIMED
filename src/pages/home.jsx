import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import carousel1 from '../img/carousel1.jpg'
import carousel2 from '../img/carousel2.jpg'
import carousel3 from '../img/carousel3.jpg'
import { BASE_URL } from '../services/data'
import CardProduct from "../components/store/cardProduct"

export default function Home() {
    const [produits, setProduits] = useState([])
    useEffect(() => {
        //On get les trois derniers produits
        axios.get(BASE_URL + "produits?_limit=3&_sort=id&_order=desc")
            .then(res => {
                setProduits([...produits, ...res.data]);
            })
            .catch(err => toast.error("Erreur lors de la récupèration des produits : " + err));
    }, [])

    return (
        <>
            <div id="home-carousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="home-carousel" data-slide-to="0" className="active"></li>
                    <li data-target="#home-carousel" data-slide-to="1"></li>
                    <li data-target="#home-carousel" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={carousel1} alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={carousel2} alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={carousel3} alt="Third slide" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#home-carousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Précédent</span>
                </a>
                <a className="carousel-control-next" href="#home-carousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Suivant</span>
                </a>
            </div>

            <div className="container">
                <section className="section-marg">
                    <h3>Nos produits phares</h3>
                    <div className="card-container"> {produits.map((x) => <Link key={x.id} to={'/product/' + x.id} className="card-link"><CardProduct produit={x}/></Link>)} </div>
                </section>

                <section className="section-marg">
                    <h3>Présentation de l'entreprise</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi distinctio fugiat cumque aliquam fugit autem earum consequuntur harum! Fuga totam asperiores odio doloribus ipsam veniam unde voluptatem sapiente eaque assumenda.
                </p>
                <Link className="btn btn-primary" to="/about">Découvrir</Link>
                </section>
            </div>
        </>
    )
}
