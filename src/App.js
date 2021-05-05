import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer';
import Contact from './pages/contact';
import { ToastContainer } from 'react-toastify';
import About from './pages/about';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Profil from './pages/profil';
import PrivateRoute from './route/privateRoute';
import Register from './pages/register';
import Products from './pages/products';
import ProductDetail from './pages/productDetail';
import Cart from './pages/cart';
import { isConnected } from './services/userService';
import Address from './pages/address';
import Payment from './pages/payment';
import Thanks from './pages/thanks';

export const AuthContext = React.createContext({
  isConnected: false,
  setConnected: (value) => { }
})

function App() {
  const [auth, setauth] = useState(isConnected())
  const contextValue = {
    isConnected: auth,
    setConnected: setauth
  }

  return (
    <>
      <AuthContext.Provider value={contextValue}>
        <Router>
        <Header/>
          <Switch>
            <PrivateRoute path="/profil"><Profil/></PrivateRoute>
            <PrivateRoute path="/address"><Address/></PrivateRoute>
            <PrivateRoute path="/payment"><Payment/></PrivateRoute>
            <PrivateRoute path="/thanks/:id"><Thanks/></PrivateRoute>
            <PrivateRoute path="/thanks"><Thanks/></PrivateRoute>
            <Route path="/contact" component={Contact}/>
            <Route path="/about" component={About}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/products/categorie/:type" component={Products}/>
            <Route path="/products/recherche/:recherche" component={Products}/>
            <Route path="/product/:id" component={ProductDetail}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/" component={Home}/>
          </Switch>
          <Footer/>
          <ToastContainer/>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
