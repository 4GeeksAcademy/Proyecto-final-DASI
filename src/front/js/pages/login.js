import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
// import axios from "axios"

export const Login = () => {

	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlerNavigate = (e)=>{
        e.preventDefault()
        navigate("/") /* introducir la terminación de la page "Registro usuario" */
    }
    
	async function handlerSubmit(e)  {
		e.preventDefault()
		let logged = await actions.login(email, password)
		if (logged){
			navigate('/') /* --> HOME */
		} else{
			setEmail("");
			setPassword("");
		}
		
	};


	return (
		<div className=" text-center bg-success bg-opacity-25 pb-5">

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
					
					<button type="submit" className="btn btn-submit mt-5 form-control col-4">
						Submit
					</button>

				</form>

                <a href="#" className="link-primary" onClick={handlerNavigate}>Crear perfil</a>
            
		</div>
	);
};
