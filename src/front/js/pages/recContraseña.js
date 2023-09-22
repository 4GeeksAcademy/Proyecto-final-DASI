import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import axios from "axios"

export const Contraseña = () => {

	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [resp, setResp] = useState("");

	// const handlerNavigate = (e) => {
	// 	e.preventDefault()
	// 	navigate("/registro")
	// }
	// const recContraseña = (e) => {
	// 	e.preventDefault()
	// 	navigate("/registro")
	// }

	async function handlerSubmit(e) {
		e.preventDefault()


		}

	// };

	// useEffect(() => {


	// 	actions.getProfile();



	// }, []);


	return (
		<div className=" bg-success bg-opacity-25 pb-3" style={{ minHeight: '80vh' }}>

			<h1 id="" className="display-2 mx-4 col-6" >Recupera tu contraseña</h1>

            <h3 className="fs-6 fw-bolder mx-4 col-6 mt-3" >Introduce el correo electrónico empleado en tu registro y si se encuentra en nuestra base de datos te enviaremos una nueva contraseña.</h3>

			<form onSubmit={handlerSubmit} className="col-6 pb-3 mx-4">

            <br />

				<div className="form-floating my-4">
					<input
						type="email"
						value={email}
						className="form-control"
						placeholder="Introduzca su email"
						onChange={e => setEmail(e.target.value)}
					/>
					<label htmlFor="floatingInput">Correo electrónico</label>
				</div>
				
                

				{resp}

				<button type="submit" id="rec" className="btn btn-submit mt-3 form-control col-4 fw-bold text-white fs-5 mb-3">
					Recuperar contraseña
				</button>

				<br/>

			</form>
		</div>
	);
};