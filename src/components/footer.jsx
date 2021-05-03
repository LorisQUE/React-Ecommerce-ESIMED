import axios from 'axios';
import React, { useState } from 'react'
import InputLabel from './form/inputLabel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../services/data';

export default function Footer() {

    const [newsletter, setNewsletter] = useState({email: ""})

    const handleChange = (e) => {
        setNewsletter({email: e.currentTarget.value});
    }
    const handleSubscribe = (e) => {
        e.preventDefault();
        const url = BASE_URL + "newsletters";
        const result = axios.post(url, newsletter);

        result.then(res => {
            setNewsletter({email: ""});
            toast.success("Vous vous êtes bien abonner à la newsletter ! ");
        })
    }

    return (
        <footer className="bg-dark text-center text-white">
            <div className="container p-4">
                <section className="mb-4">
                    <p>
                        Suivez-nous sur nos réseaux sociaux pour vous tenir informé des concerts à venir !
                    </p>
                </section>
                <section className="mb-4">
                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </section>
                <section className="mb-4">
                    <p>
                        Recevez notre <strong>newsletter</strong> pour ne manquer aucune information.
                    </p>
                </section>
                <section className="">
                    <form id="footer-form-newsletter" onSubmit={handleSubscribe} method="POST">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-5 col-12">
                                <div className="form-outline form-white mb-4">
                                    <InputLabel required="required" value={newsletter.email} change={handleChange} name="email" type="email" placeholder="Saisir votre e-mail" />
                                </div>
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-outline-light mb-4">
                                    S'abonner
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
                <section className="">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Links</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-white">Link 1</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 2</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 3</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 4</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Links</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-white">Link 1</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 2</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 3</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 4</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Links</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-white">Link 1</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 2</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 3</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 4</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Links</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-white">Link 1</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 2</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 3</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 4</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
            <div className="text-center p-3">
            © 2021 <strong>Marque</strong> - Tous droits réservés
            </div>
        </footer>
    )
}
