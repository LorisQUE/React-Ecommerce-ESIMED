import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Pagination from 'react-js-pagination';
import { useHistory } from 'react-router';
import { AuthContext } from '../App';
import TableCart from '../components/store/tableCart';
import { BASE_URL } from '../services/data';
import { PRIX_COLISSIMO } from '../services/storeService';
import { removeLocalUser } from '../services/userService';

export default function Profil() {
    const history = useHistory();
    const context = useContext(AuthContext);
    const [commandes, setCommandes] = useState([]);
    const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

    const [activePage, setActivePage] = useState(1);
    const [nbCommand, setNbCommand] = useState(0)
    const [limit, setLimit] = useState(5)
    
    useEffect(() => {
        const url = BASE_URL + "commandes";
        axios.get(url, { params: { userId: utilisateur.id, _sort: "id", _order: "desc"}})
        .then(res => {
            setNbCommand(res.data.length);
            //setCommandes(res.data)
        });

        axios.get(url, { params: { userId: utilisateur.id, _page: activePage, _limit: limit, _sort: "id", _order: "desc"}})
        .then(res => {
            setCommandes(res.data)
        });
    }, [activePage]);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
      };

    const handleDeconnexion = () => {
        removeLocalUser();
        context.setConnected(false);
        history.push("/");
    }

    return (
        <main className="container marg-hauteur">
            <h1>Bonjour {utilisateur.prenom + " " + utilisateur.nom} - Mes commandes</h1>

            {commandes.map((x,y) => {
                return(
                    <div key={y} className="div-commande">
                        <h3>Commande du {new Date(x.date).toLocaleString()}</h3>
                        <label>
                            Livraison {x.isColissimo ? "par colissimo (+" + PRIX_COLISSIMO + "€)"  : "en point relais"}
                            <br/>{x.adresse.nom} {x.adresse.prenom}
                            <br/>{x.adresse.voie}, {x.adresse.ville}, {x.adresse.CP}
                        </label>
                        <TableCart articles={x.produits}/>
                    </div>
                )
            })}

            <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={activePage}
                    itemsCountPerPage={limit}
                    totalItemsCount={nbCommand}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    />
            <br/>
            <button onClick={handleDeconnexion} className="btn btn-secondary">Déconnexion</button>
        </main>
    )
}
