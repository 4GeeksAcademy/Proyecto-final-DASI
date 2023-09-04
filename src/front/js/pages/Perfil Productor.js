import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.css";
import { CardProducto } from "../component/card.producto.js";

export const PerfilProductor = () => {


	const { store, actions } = useContext(Context);

	// const [products, setProducts] = useState ([
	// 	{"variedad":"Cocos","precio":2, "cantidad":20, "id":1},
	// 	{"variedad":"Tommate","precio":10, "cantidad":3, "id":2},
	// 	{"variedad":"Cambur","precio":13, "cantidad":7, "id":3},
	// 	{"variedad":"Piña","precio":4, "cantidad":7, "id":4},
	// 	{"variedad":"Naranja","precio":6, "cantidad":7, "id":5},
	// 	{"variedad":"Sandía","precio":1, "cantidad":5, "id":6},
	// 	{"variedad":"Melocotón","precio":17, "cantidad":8, "id":7}
	// ]);



	let info_productor = store.info_productor
	// console.log(info_productor);
	console.log(info_productor.id);


	// useEffect(() => {
	// 	console.log(add_producto)
	// 	//window.location.reload();
	// 	// actions.getNombreProducto();


	// }, [add_producto]);
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
				<h1 className="display-2 ms-5 mt-5">{info_productor.nombre_huerta}</h1>
			</div>
			<div className="row mx-5 mt-5">
				<div className="col-2 ps-5 bg-success bg-opacity-25 me-5">
					<ul className="mt-5 fs-4">
						<h4 className="fs-4">Info</h4>
						<li>Nombre: {info_productor.nombre}</li>
						<li>Teléfono: {info_productor.telefono} </li>
						<li>Dirección: {info_productor.direccion} </li>
						<li>Dónde encontrar: {info_productor.donde_encontrar}</li>
					</ul>
				</div>
				<div className="col-5 text-center me-5">
					<span className="fs-5">{info_productor.descripcion}
					</span>
				</div>
				<div className="col-2">
					<img className="" style={{ width: "550px", objectFit: "cover" }} src="https://static.diariofemenino.com/media/7515/huertoensuenos.jpg" />
				</div>
			</div>
			<div>
				<CardProducto />
			</div>
			{/* CARD PRODUCTOS DE LA SEMANA */}

			{/* <div className="mt-5 mx-5 border border-success border-3 p-3 overflow-x-auto" >
				<div className="d-flex justify-content-between">
					<span className="display-4 mb-4">Productos del mes</span>
					<Link to="/add_product">
						<button className="btn btn-success" style={{ width: "35px", height: "35px" }}>
							<i className="fa-solid fa-plus"></i>
						</button>
					</Link>
				</div>
				<div className="">
					<ul className="d-flex justify-content-evenly flex-wrap m-3">{add_producto.map((item => (
						<li key={item.id}>
							<div className="card mb-3" style={{ width: "12rem" }}>
								<img className="card-img-top" src="https://previews.123rf.com/images/sybirko/sybirko1802/sybirko180200008/94798081-personaje-de-dibujos-animados-de-col-lechuga-iceberg-s%C3%ADmbolo-vegetal-feliz-icono-de-comida.jpg" alt="..." />
								<div className="card-body text-center fs-5">
									<p className="card-text">{item.nombre}</p>
									<p className="card-text">{item.variedad}</p>
									<p className="card-text">Precio:{item.precio}€</p>
								</div>
								<div className="fs-3 d-flex justify-content-end mb-2 me-2">
									<Link to="/edit_product">
										<span>
											<i className="fa-solid fa-pen-to-square btn btn-success mx-2"></i>
										</span>
									</Link>
									<span onClick={() => deleteProduct(item.id)}>
										<i className="fa-solid fa-trash btn btn-success"></i>
									</span>
								</div>
							</div>
						</li>))
					)}
					</ul>
				</div>
			</div > */}
			<a href="https://api.whatsapp.com/send?phone=680112737" target="_blank">Chat en WhatsApp</a>
		
			
		</div >
	);
};
