import React, { useContext, useEffect, useState } from "react";
import portada from "../../img/Portada.jpg";
import productor from "../../img/productor1.jpg";
import perfil_lateral from "../../img/perfil_lateral.jpg";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const InfoProductorPerfil = () => {


    const { store, actions } = useContext(Context);


    let info_productor_publico = store.info_productor_publico;


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
          

        </div >
    );
};