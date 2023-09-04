import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.css";
import { CardProducto } from "../component/card.producto.js";

export const PerfilProductorPublico = () => {


    const { store, actions } = useContext(Context);


    let info_productor_publico = store.info_productor_publico
    // console.log(info_productor_publico);
    console.log(info_productor_publico.id);


    async function GetProducts() {
        await actions.getNombreProducto();
    }

    useEffect(() => {
        GetProducts();
        
    }, []);





    return (
        <div className="Container" >
            <div className="p-4" >
                <img src="https://www.huercasa.com/sites/default/files/2021-10/huerto-urbano-ni%C3%B1os-huercasa.jpg" className="img-fluid w-100 portada" alt="..." />
                <div className="fs-3 d-flex justify-content-end">
                    <span className="btn btn-success mx-2" style={{ marginTop: "-50px", width: "40px", height: "40px" }}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </span>
                </div>
            </div>
            <div className="d-flex">
                <img className="img-perfil" src="https://www.telegraph.co.uk/content/dam/news/2016/08/23/106598324PandawaveNEWS_trans_NvBQzQNjv4Bqeo_i_u9APj8RuoebjoAHt0k9u7HhRJvuo-ZLenGRumA.jpg?impolicy=logo-overlay" />
                <h1 className="display-2 ms-5 mt-5">{info_productor_publico.nombre_huerta}</h1>
            </div>
            <div className="row mx-5 mt-5">
                <div className="col-2 ps-5 bg-success bg-opacity-25 me-5">
                    <ul className="mt-5 fs-4">
                        <h4 className="fs-4">Info</h4>
                        <li>Nombre: {info_productor_publico.nombre}</li>
                        <li>Teléfono: {info_productor_publico.telefono} </li>
                        <li>Dirección: {info_productor_publico.direccion} </li>
                        <li>Dónde encontrar: {info_productor_publico.donde_encontrar}</li>
                    </ul>
                </div>
                <div className="col-5 text-center me-5">
                    <span className="fs-5">{info_productor_publico.descripcion}
                    </span>
                </div>
                <div className="col-2">
                    <img className="" style={{ width: "550px", objectFit: "cover" }} src="https://static.diariofemenino.com/media/7515/huertoensuenos.jpg" />
                </div>
            </div>
            <div>
                <CardProducto />
            </div>

        </div >
    );
};
