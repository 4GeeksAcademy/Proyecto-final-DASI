import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Registro = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        password: "",
        email: "",
    });
    const [resp, setResp] = useState("");

    //Crear contacto

    async function createContact(e) {
        e.preventDefault()

        console.log(
            contact.password,
            contact.email)

        let nuevo_registro = await actions.registro(

            contact.password,
            contact.email

        );

        if (nuevo_registro) {
            navigate('/login');


        } else {
            setContact({

                password: "",
                email: "",
            });
            setResp(
                <div className="alert alert-danger" role="alert">
                    {store.respuesta_log}
                </div>)

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
                        <h1 className="text-center mt-5 display-2">Regístrate</h1>
                        <div className="col-3 mt-4" id="custom-hr"></div>
                        <form onSubmit={createContact} className="col-4 m-auto text-center" >


                            <div className="form-floating mt-3">
                                <input
                                    type="email"
                                    value={contact.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Introduzca su correo electrónico"
                                    name="email"
                                />
                                <label htmlFor="floatingInput">Correo electrónico</label>
                            </div>

                            <div className="form-floating mt-3">
                                <input
                                    type="password"
                                    value={contact.password}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Introduzca su contraseña"
                                    name="password"
                                />
                                <label htmlFor="floatingInput">contraseña</label>
                            </div>

                            <br />

                            {resp}



                            <button type="submit" className="btn btn-primary mt-3 mb-3 form-control col-4 fw-bold text-white fs-5" id="btn-re">
                                Regístrate
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};