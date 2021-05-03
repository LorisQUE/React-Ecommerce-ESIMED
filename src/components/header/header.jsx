import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { BASE_URL } from '../../services/data';
import InputLabel from '../form/inputLabel';
import MenuLi from './menuLi';

export default function Header() {
    const history = useHistory();
    const [menu, setMenu] = useState([
        {
          nom: "Accueil",
          lien: "/"
        },
        {
          nom: "A propos",
          lien: "/about"
        },
        {
          nom: "Contact",
          lien: "/contact"
        },
      ]);
    useEffect(() => {
        axios.get(BASE_URL + "categories")
        .then(res => {
            console.log(res);
            const newMenu = [];
            res.data.map( x => newMenu.push({nom: x.libelle, lien: "/" + x.libelle}));
            setMenu([...menu, ...newMenu]);
        })
        .catch(console.log)
    }, [])

    const [recherche, setRecherche] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = BASE_URL + "produits";
        const result = axios.get(url, { params: 
            {
                libelle_like: recherche,
            }
        });

        result.then(res => { 
            console.log(res);
            history.push("/products");
        })
    }
    const handleChange = (e) => {
        setRecherche(e.currentTarget.value)
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand"><Link className="nav-link" to="/">Marque</Link></span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav mr-auto">
                    {menu.map((x,y) => <MenuLi key={y} lien={x.lien} nom={x.nom} />)}
                </ul>
                <div>
                    <a className="btn">
                        <Link to="/profil" className="fas fa-user" ></Link>
                    </a>
                    <a className="btn">
                        <Link to="/" className="fas fa-shopping-basket"></Link>
                    </a>
                </div>
                <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
                    <InputLabel required="required" value={recherche} change={handleChange} name="recherche" type="text"/>
                    <button id="btn-recherche" className="btn btn-secondary my-2 my-sm-0" type="submit">Recherche</button>
                </form>
            </div>
        </nav>
    )
}
