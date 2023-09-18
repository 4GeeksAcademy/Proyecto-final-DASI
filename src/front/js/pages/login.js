import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import axios from "axios"

export const Login = () => {

	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [resp, setResp] = useState("");

	const handlerNavigate = (e) => {
		e.preventDefault()
		navigate("/registro")
	}

	async function handlerSubmit(e) {
		e.preventDefault()

		let logged = await actions.login(email, password)

		if (logged) {
			navigate('/')
			actions.getProfile()
			console.log(actions.getProductor())
		} else {
			setEmail("");
			setPassword("");
			setResp("");
			email === "" || password === "" ?

				setResp(<div className="alert alert-danger" role="alert">
					Debes rellenar todos los campos
				</div>)

				: setResp(
					<div className="alert alert-danger" role="alert">
						{store.respuesta_log}
					</div>);

		}
		console.log(store.info_productor);
		console.log(store.is_productor);

	};

	// useEffect(() => {


	// 	actions.getProfile();



	// }, []);


	return (
		<div className=" text-center bg-success bg-opacity-25 pb-3" style={{ minHeight: '80vh' }}>

			<h1 id="log" className="display-2" >Bienvenido</h1>

			<form onSubmit={handlerSubmit} className="col-3 m-auto pb-3">

				<div className="form-floating my-4">
					<input
						type="email"
						value={email}
						className="form-control"
						placeholder="Introduzca su email"
						onChange={e => setEmail(e.target.value)}
					/>
					<label htmlFor="floatingInput">email</label>
				</div>
				<div className="form-floating">
					<input
						type="password"
						value={password}
						className="form-control"
						placeholder="Introduzca su contraseña"
						onChange={e => setPassword(e.target.value)}
					/>
					<label htmlFor="floatingInput">contraseña</label>
				</div>

				<br />

				{/* <div className="alert alert-danger" role="alert">
				{resp}
				</div> */}

				{resp}

				<button type="submit" id="submit" className="btn btn-submit mt-3 form-control col-4 fw-bold text-white fs-5">
					Iniciar sesión
				</button>


			</form>

			<div className="col-3" id="custom-hr"></div>

			<button className="btn btn-primary mt-3 mb-3 form-control col-4 fw-bold text-white fs-5" id="btn-nu" onClick={handlerNavigate}>
				Nuevo usuario
			</button>


		</div>
	);
};
