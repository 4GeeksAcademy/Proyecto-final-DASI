import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import portada from "../../img/Portada.jpg";
import productor from "../../img/productor1.jpg";
import perfil_lateral from "../../img/perfil_lateral.jpg";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.css";
import { CardProducto } from "./card.producto.js";

export const InfoProductorPerfil = () => {


    const { store, actions } = useContext(Context);


    let info_productor_publico = store.info_productor_publico
    // console.log(info_productor_publico);
    //console.log(info_productor_publico.id);


    async function GetProducts() {
        await actions.getNombreProducto();
    }

   
    useEffect(() => {
        GetProducts();
       

    }, []);





    return (
        <div className="Container" >
            <div className="p-4" >
                <img src={portada} className="img-fluid w-100 portada" alt="..." />
                <div className="fs-3 d-flex justify-content-end">
                    <span className="btn btn-success mx-2" style={{ marginTop: "-50px", width: "40px", height: "40px" }}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </span>
                </div>
            </div>
            <div className="d-flex">
                <img className="img-perfil" src={productor} />
                <h1 className="display-2 fw-bolder ms-5 mt-5">{info_productor_publico.nombre_huerta}</h1>
            </div>
            <div className="row mx-5 mt-5 bg-success bg-opacity-25 rounded wrapper">
				<div className="right">
					<div className="info">
						<h3>Información</h3>
						<div className="info_data">
							<div className="data">
								<h4>Nombre</h4>
								<p>{info_productor_publico.nombre}</p>
							</div>
							<div className="data">
								<h4>Teléfono</h4>
								<p>{info_productor_publico.telefono}</p>
							</div>
							<div className="data">
								<h4>Dirección</h4>
								<p>{info_productor_publico.direccion}</p>
							</div>
							<div className="data">
								<h4>Dónde Encontrar</h4>
								<p>{info_productor_publico.donde_encontrar}</p>
							</div>
						</div>
					</div>
					<div className="descrip">
						<h3>Descripción</h3>
						<div className="descrip_data">
							<div className="data">
								<p>{info_productor_publico.descripcion}</p>
							</div>
						</div>
					</div>

				</div>
				<div className="imagen">
					<img className="" src={perfil_lateral} />
				</div>
			</div>



            {/* <div className="row mx-5 mt-5">
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
            </div> */}
          

        </div >
    );
};