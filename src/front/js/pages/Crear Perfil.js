import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Perfil = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Crear Perfil</h1>
			<di>
				<form style={{margin: "0 400px 0 400px"}}>
					<div className="input-group mb-3" style={{width: "50%", margin: "20px auto"}}>
						<input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Nombre Huerto"/>
					</div>
					<div className="d-flex justify-content-center">
						<input className="portada-input" type="file" id="file"/>
						<label className="portada-label" for="file">Foto Portada</label>

						<input className="portada-input" type="file" id="file"/>
						<label className="portada-label" for="file">Foto Perfil</label>
					</div>
					
					<div className="input-group mb-3" style={{width: "50%", margin: "20px auto"}}>
						<input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="¿Quién eres?"/>
					</div>
					<div className="input-group mb-3" style={{width: "50%", margin: "20px auto"}}>
						<input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="¿Cuáles son tus problemas como agriculltor?"/>
					</div>
					<div className="input-group mb-3" style={{width: "50%", margin: "20px auto"}}>
						<input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="¿Dónde y cuándo podemos encontrarle?"/>
					</div>
					<div>
						<button className="btn btn-success">
							Registro
						</button>
					</div>
				</form>
			</di>
		</div>
	);
};