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
		} else {
			setEmail("");
			setPassword("");
			setResp("");
			// email === "" || password === "" ? setResp("Debes rellenar todos los campos") : null;
			email === "" || password === "" ? setResp("Debes rellenar todos los campos") : setResp(store.respuesta_log);
			
		}
		console.log(store.info_productor);
		console.log(store.is_productor);

	};

	// useEffect(() => {

	// 	actions.getProfile();


	// }, []);


	return (
		<div className=" text-center bg-success bg-opacity-25 pb-5" style={{ minHeight: '80vh' }}>

			<h1 id="log">Log in</h1>

			<form onSubmit={handlerSubmit} className="col-3 m-auto pb-5">

				<div className="form-group my-4">
					{/* <label>Email</label> */}
					<input
						type="email"
						value={email}
						className="form-control"
						placeholder="Enter email"
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-group">
					{/* <label>Password</label> */}
					<input
						type="password"
						value={password}
						className="form-control"
						placeholder="Enter password"
						onChange={e => setPassword(e.target.value)}
					/>
				</div>

				<br/>

				<div>

					<p className="text-danger">{resp}</p>

				</div>



				<button type="submit" className="btn btn-submit mt-5 form-control col-4">
					Submit
				</button>

			</form>

			<a href="#" className="link-primary" onClick={handlerNavigate}>Nuevo usuario</a>

		</div>
	);
};
