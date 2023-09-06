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

    async function createContact(e) {
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
            navigate('/login');
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
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8 ">
                        <h1 className="text-center mt-5">Regístrate</h1>
                        <div className="col-3 mt-4" id="custom-hr"></div>
                        <form onSubmit={createContact} className="col-4 m-auto text-center" >
                           
                            <div className="form-group mt-5 ">
                                {/* <label className="float-start" >Usuario</label> */}
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Introduzca su usuario"
                                    name="username"
                                />
                            </div>

                            <div className="form-group mt-5">
                                {/* <label className="float-start">Email</label> */}
                                <input
                                    type="email"
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Introduzca su email"
                                    name="email" />
                            </div>

                            <div className="form-group mt-5">
                                {/* <label className="float-start">Contraseña</label> */}
                                <input
                                    type="password"
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Introduzca su contraseña"
                                    name="password" />
                            </div>

                            {/* <button type="submit" className="btn btn-primary form-control mt-3">
                                Regístrate
                            </button> */}
                            <button type="submit" className="btn btn-primary mt-5 mb-3 form-control col-4 fw-bold text-white fs-5" id="btn-re">
                                Regístrate
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};