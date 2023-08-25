import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Perfil = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const [newProfile, setNewProfile] = useState({
		nombre_huerta: "",
		// info: "",
		problemas: "",
		donde_encontrar: ""
	});

	const handleChange = event => {
		setNewProfile({ ...newProfile, [event.target.name]: event.target.value})
	}

	// function handleSubmit(e) {
	// 	e.preventDefault()
	// 	// console.log(newProfile);
	// 	actions.crearPerfil(newProfile)
	// 	setNewProfile("")
	// }

	async function handleSubmit(e) {
		e.preventDefault()

		let nuevo_productor = await actions.crearPerfil(
			newProfile.nombre_huerta,
			newProfile.problemas,
			newProfile.donde_encontrar
		)
		if(nuevo_productor) {
			navigate('/') /* --> perfil del productor*/
		}else {
			setNewProfile({
				nombre_huerta: "",
				problemas: "",
				donde_encontrar: ""
			})
		};
	};


 
	return (
		<div className="Container">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<h1  className="text-center mb-5 mt-5 display-2">Crear Perfil</h1>
					<form onSubmit={handleSubmit}>
					<div className="form-floating mb-3">
                            <label htmlFor="floatingInput">Nombre</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí su nombre"
                                name="username"
                            />
                        </div>
						<div className="form-floating mb-3">
                            <label htmlFor="floatingInput">Apellidos</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí sus apellidos"
                                name="apellidos"
                            />
                        </div>
						<div className="form-floating mb-3">
                            <label htmlFor="floatingInput">Telefono</label>
                            <input
                                type="tel"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí el telefono"
                                name="telefono"
                            />
                        </div>
						<div className="form-floating mb-3">
                            <label htmlFor="floatingInput">Comunidad Autónoma</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí su Comunidad Autónoma"
                                name="comunidad_autonoma_id"
                            />

                            </div>

                        <div className="form-floating mb-3">
                            <label htmlFor="floatingInput">Provincia</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí su provincia"
                                name="provincia_id"
                            />
                        </div>

						<div className="form-floating mb-3">
							<label htmlFor="floatingInput">Codigo Postal</label>
							<input
								type="text"
								onChange={handleChange}
								className="form-control"
								placeholder="Añada aquí su codigo postal"
								name="codigo_postal"
							/>
						</div>

						<div className="form-floating mb-3">
							<label htmlFor="floatingInput">Dirección</label>
							<input
								type="text"
								onChange={handleChange}
								className="form-control"
								placeholder="Añada aquí su dirección"
								name="dirección"
							/>
						</div>
						<div className="form-floating mb-3">
							<input 
							type="text"
							onChange={handleChange}
							className="form-control"
							placeholder="Nombre Huerta"
							name= "nombre_huerta"
							/>
							<label htmlFor="floatingInput">Nombre Huerta</label>
						</div>
						
						<div className="form-floating mb-3">
							<input
							type="text"
							onChange={handleChange}
							className="form-control"
							placeholder="Tus problemas"
							name="problemas"
							/>
							<label htmlFor="floatingInput">¿Cuáles son tus problemas como agricultor?</label>
						</div>
						<div className="form-floating mb-3">
							<input 
							type="text"
							onChange={handleChange}
							className="form-control"
							placeholder="Donde y cuando encontrarte"
							name="donde_encontrar"
							/>
							<label htmlFor="floatingInput">¿Dónde y cuándo podemos encontrarte</label>
						</div>
						<div className="d-flex justify-content-center">
							<button className="btn btn-success" type="submit">
								Registro
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		
	);
};





{/* <div className="text-center mt-5">
			<h1 className="mb-5 display-2">Crear Perfil</h1>
			<di>
				<form style={{margin: "0 400px 0 400px"}}>
					<div className="input-group mb-3 border border-danger" style={{width: "50%", margin: "20px auto"}}>
						<label htmlFor="floatingInput">Nombre Huerto</label>
						<input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Añade el nombre de tu huerto"/>
					</div>
					<div className="input-group mb-3" style={{width: "50%", margin: "20px auto"}}>
						<label htmlFor="floatingInput">¿Quién eres?</label>
						<input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="¿Cuéntanos sobre ti?"/>
					</div>
					<div className="input-group mb-3" style={{width: "50%", margin: "20px auto"}}>
						<label htmlFor="floatingInput">¿Cómo te podemos ayudar?</label>
						<input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="¿Cuáles son tus problemas como agriculltor?"/>
					</div>
					<div className="input-group mb-3" style={{width: "50%", margin: "20px auto"}}>
						<label htmlFor="floatingInput">Ubicación</label>
						<input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="¿Dónde y cuándo podemos encontrarte?"/>
					</div>
					<div>
						<button className="btn btn-success" type="submit">
							Registro
						</button>
					</div>
				</form>
			</di>
		</div> */}