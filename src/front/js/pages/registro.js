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
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="text-center mt-5">Registro Nuevo Usuario</h1>
                    <form onSubmit={createContact}>
                        <div className="form-group">
                            <label>Usuario</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí su usuario"
                                name="username"
                            />
                        </div>

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