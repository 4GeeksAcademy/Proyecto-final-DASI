import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Registro = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        username: "",
        password: "",
        email: "",
    });

    //Crear contacto

    async function createContact(e)  {
		e.preventDefault()
        console.log(contact.username,
            contact.password,
            contact.email)
        let nuevo_registro = await actions.registro(
            contact.username,
            contact.password,
            contact.email

        );
        if (nuevo_registro) {
            navigate('/');
        } else {
            setContact({
                username: "",
                password: "",
                email: "",
            });
        }

    };


    const handleChange = event => {
        setContact({ ...contact, [event.target.name]: event.target.value });
    };

    
    return (
        <div className="bg-success bg-opacity-25" style={{ minHeight: '80vh' }}>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="text-center mt-5">Registro Nuevo Usuario</h1>
                    <form onSubmit={createContact}>
                        <div className="form-group">
                            <label>Nombre</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí su nombre"
                                name="username"
                            />
                        </div>
                        {/* <div className="form-group">
                            <label>Apellidos</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí sus apellidos"
                                name="apellidos"
                            />
                        </div> */}
                        {/* <div className="form-group">
                            <label>Telefono</label>
                            <input
                                type="tel"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí el telefono"
                                name="telefono"
                            />
                        </div> */}

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Añada aquí su Email"
                                    name="email" />
                            </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí su password"
                                name="password" />
                        </div>

                        {/* <div className="form-group">
                            <label>Comunidad Autónoma</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí su Comunidad Autónoma"
                                name="comunidad_autonoma_id"
                            />

                            </div>

                        <div className="form-group">
                            <label>Provincia</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí su provincia"
                                name="provincia_id"
                            />
                        </div>

                            <div className="form-group">
                                <label>Codigo Postal</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Añada aquí su codigo postal"
                                    name="codigo_postal"
                                />
                            </div>

                            <div className="form-group">
                                <label>Dirección</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Añada aquí su dirección"
                                    name="dirección"
                                /> */}
                            {/* </div> */}

                            <button type="submit" className="btn btn-primary form-control mt-3">
                                Registro
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};