import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

import { Context } from "../store/appContext.js";

export const Navbar = () => {

	const { actions, store } = useContext(Context);
	const navigate = useNavigate()

	const handlerPerfil = (e) => {
		e.preventDefault()
		console.log(store.is_productor);
		store.log === false && store.is_productor === false ? navigate('/login') :
			store.log === true && store.is_productor === false ? navigate('/crear_perfil') :
				navigate("/perfil") /* --> Enlace a perfil productor*/
	}

	const handlerHome = (e) => {
		e.preventDefault()
		navigate("/") /* --> Enlace a la home*/
	}

	const handlerLogIn = (e) => {
		e.preventDefault()
		navigate("/login")
	}

	const handlerLogOut = (e) => {
		e.preventDefault()
		let logout = actions.logout()
		if (!logout) {
			navigate("/login")
		}
	}




	useEffect(() => {

		actions.getProfile();

	}, []);


	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" id="nav" >
			<div className="container-fluid px-4">

				<div className="collapse navbar-collapse col-4" id="navbarSupportedContent">

					<a className="navbar-brand" href="#">
						<img src="https://media.istockphoto.com/id/1023035296/es/vector/ensalada-icono-vector-de-se%C3%B1al-y-s%C3%ADmbolo-aisladas-sobre-fondo-blanco-el-concepto-de-logotipo.jpg?s=612x612&w=0&k=20&c=HMLUg1UhDlldPBK_ZNc9XBm9a5nJtbJrDk3JCj9qD30=" alt="" width="50" height="50" />
					</a>

					<button id="ir" className="btn btn-success p-0 " >

						<li className="nav-item float-start ">
							<a className="nav-link active link-light" aria-current="page" href="#" onClick={handlerPerfil}>Ir a mi huerto</a>
						</li>

					</button>

				</div>

				<div className="d-flex col-4 justify-content-end">

					<div className="col-4 d-flex justify-content-end">

						<button id="login" className="btn btn-success p-0 " >

							<li className="nav-item" onClick={handlerHome}>
								<a className="nav-link active link-light" aria-current="page" href="#" onClick={handlerHome}>Home</a>
							</li>

						</button>

					</div>

					

					{(store.log === false) ?

						<button id="login" className="btn btn-success p-0 " >

							<li className="nav-item" onClick={handlerLogIn}>
								<a className="nav-link active link-light" aria-current="page" href="#">Log in</a>
							</li>
						</button>

						: <button id="login" className="btn btn-success p-0">
							<li className="nav-item" onClick={handlerLogOut}>
								<a className="nav-link active link-light" aria-current="page" href="#">Log out</a>
							</li>
						</button>

					}

					{/* FAVORITOS */}

					{(store.log === true) ?

						<button id="fav" className="btn btn-success p-0 " >


							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle link-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
									Favoritos
								</a>
								<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
									<li><a className="dropdown-item" href="#">Action</a></li>
									<li><a className="dropdown-item" href="#">Another action</a></li>
									<li><hr className="dropdown-divider" /></li>
									<li><a className="dropdown-item" href="#">Something else here</a></li>
								</ul>
							</li>

						</button>

						: null}


					{/* CARRITO */}

					{(store.log === true) ?
						<button id="car" className="btn btn-success p-0 " >


							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle link-light" href="#" id="carrito" role="button" data-bs-toggle="dropdown" aria-expanded="false">
									<i className="fa-solid fa-cart-arrow-down"></i>
								</a>
								<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
									<li><a className="dropdown-item" href="#">Action</a></li>
									<li><a className="dropdown-item" href="#">Another action</a></li>
									<li><hr className="dropdown-divider" /></li>
									<li><a className="dropdown-item" href="#">Something else here</a></li>
								</ul>
							</li>
						</button>

						: null}
				</div>

			</div>
		</nav>

	);
};
