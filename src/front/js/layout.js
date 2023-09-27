import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

// import { Home } from "./pages/home";
import { Home_P } from "./pages/home_prueba";
import { Home } from "./pages/home";
import { Equipo } from "./pages/equipo";
import { Demo } from "./pages/demo";
import { Login } from "./pages/login";

import { EditProduct } from "./pages/edit_product";
import { AddProduct } from "./pages/add_product";

import { Single } from "./pages/single";
import { Registro } from "./pages/registro.js";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Perfil } from "./pages/Crear Perfil";
import { PerfilProductor } from "./pages/Perfil Productor";
import { PerfilProductorPublico } from "./pages/perfil_productor_publico";
import { Contraseña } from "./pages/recContraseña";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        {/* <Route element={<Home />} path="/" /> */}
                        <Route element={<Home_P />} path="/" />
                        <Route element={<PerfilProductorPublico />} path="/perfil/:theid" />
                        <Route element={<Contraseña />} path="/contraseña" />
                        <Route element={<PerfilProductor />} path="/perfil" />
                        <Route element={<Perfil />} path="/crear_perfil" />
                        <Route element={<EditProduct />} path="/edit_product" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<AddProduct />} path="/add_product" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Registro />} path="/registro" />
                        <Route element={<Equipo />} path="/equipo" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
