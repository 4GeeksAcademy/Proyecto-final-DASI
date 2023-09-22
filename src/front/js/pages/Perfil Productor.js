import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import portada from "../../img/Portada-decom.jpg";
import productor from "../../img/Perfil-productor1.jpg";
import perfil_lateral from "../../img/foto-info.jpg";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { CardProducto } from "../component/card.producto.js";

export const PerfilProductor = () => {


	const { store, actions } = useContext(Context);

	let info_productor = store.info_productor

	async function GetProducts() {
		await actions.getProductosPorProductor(store.info_productor.id);
	}

	// const openNewTab = () => {
	// 	window.open(`https://api.whatsapp.com/send?phone=${info_productor.telefono}`, '_blank');
	// }

	useEffect(() => {
		if (store.is_productor == true) {
			GetProducts();

		}

	}, []);

	return (
		<div className="Container" >
			<div className="p-4" >
				<img src={portada} className="img-fluid w-100 portada" alt="..." />
				<div className="fs-3 d-flex justify-content-end">
					{/* <span className="btn btn-success mx-2" style={{ marginTop: "-50px", width: "40px", height: "40px" }}>
						<i className="fa-solid fa-pen-to-square"></i>
					</span> */}
				</div>
			</div>
			{/* <div className="d-flex">
				<img className="img-perfil" src={productor} />
				<h1 className="display-2 fw-bolder ms-5 mt-1 mb-1">{info_productor.nombre_huerta}</h1>
			</div> */}
			<div className="row mx-5 bg-success bg-opacity-25 rounded wrapper mt-2">
				<div className="right">
					<div className="info">
						<h3 className="fs-3">{info_productor.nombre_huerta}</h3>
						<div className="info_data">
							<div className="data">
								<p>Nombre</p>
								<h4>{info_productor.nombre}</h4>
							</div>
							<div className="data">
								<p>Teléfono</p>
								<h4>{info_productor.telefono}</h4>
							</div>
							<div className="data">
								<p>Dirección</p>
								<h4>{info_productor.direccion}</h4>
							</div>
							<div className="data">
								<p>Dónde Encontrar</p>
								<h4>{info_productor.donde_encontrar}</h4>
							</div>
						</div>
					</div>
					<div className="descrip">
						<h2>Descripción</h2>
						<div className="descrip_data">
							<div className="data">
								<p>{info_productor.descripcion}</p>
							</div>
						</div>
					</div>

				</div>
				<div className="imagen">
					<img className="" src={productor} />
				</div>
			</div>
			<div className="mb-5">
				<CardProducto />
			</div>
			{/* <button type="button" className="btn btn-success fixed-bottom float-end" id="wp" onClick={openNewTab}>
				<a href="#" className="link-light" id="wp-icon" >
					<i className="fa-brands fa-whatsapp" ></i>
				</a>
			</button> */}



		</div >
	);
};
