import React, {useContext, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

import { Context } from "../store/appContext.js";

export const Navbar = () => {

	const { actions, store } = useContext(Context);
	const navigate = useNavigate()

	const handlerPerfil = (e)=>{
        e.preventDefault()
        navigate("/") /* --> Enlace a perfil productor*/
    }

	const handlerHome = (e)=>{
        e.preventDefault()
        navigate("/") /* --> Enlace a la home*/
    }

	const handlerLogIn = (e)=>{
		e.preventDefault()
		navigate("/login")
	}

	const handlerLogOut = (e)=>{
        e.preventDefault()
        // localStorage.removeItem("token")
		let logout = actions.logout()
		if (!logout) {
			navigate("/login")
		}
    }


	return (

		<nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					<img src="https://media.istockphoto.com/id/1023035296/es/vector/ensalada-icono-vector-de-se%C3%B1al-y-s%C3%ADmbolo-aisladas-sobre-fondo-blanco-el-concepto-de-logotipo.jpg?s=612x612&w=0&k=20&c=HMLUg1UhDlldPBK_ZNc9XBm9a5nJtbJrDk3JCj9qD30=" alt="" width="50" height="50"/>
				</a>
				<div className="collapse navbar-collapse " id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="#" onClick={handlerPerfil}>Ir a mi huerto</a>
						</li>

						<li className="nav-item" id="btn-home">
							<a className="nav-link active" aria-current="page" href="#" onClick={handlerHome}>Home</a>
						</li>

						
						{ (store.log === false) ? 

							<li className="nav-item" id="btn-login" onClick={handlerLogIn}>
								<a className="nav-link active" aria-current="page" href="#">Log in</a>
							</li>

							:<li className="nav-item" id="btn-login" onClick={handlerLogOut}>
								<a className="nav-link active" aria-current="page" href="#">Log out</a>
							</li>

					

						}
						{/* <li className="nav-item" id="btn-login" onClick={handlerLogOut}>
								<a className="nav-link active" aria-current="page" href="#">Log out</a>
							</li> */}

						{/* FAVORITOS */}
					

						<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favoritos
						</a>
						<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
							<li><a className="dropdown-item" href="#">Action</a></li>
							<li><a className="dropdown-item" href="#">Another action</a></li>
							<li><hr className="dropdown-divider"/></li>
							<li><a className="dropdown-item" href="#">Something else here</a></li>
						</ul>
						</li>

						{/* CARRITO */}
						
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="carrito" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								<i className="fa-solid fa-cart-arrow-down"></i>
							</a>
							<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
								<li><a className="dropdown-item" href="#">Action</a></li>
								<li><a className="dropdown-item" href="#">Another action</a></li>
								<li><hr className="dropdown-divider"/></li>
								<li><a className="dropdown-item" href="#">Something else here</a></li>
							</ul>
						</li>
						
					</ul>
			

				</div>
			</div>
		</nav>
	);
};
