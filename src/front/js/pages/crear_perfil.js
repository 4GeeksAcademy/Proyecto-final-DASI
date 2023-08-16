import React, { useState } from "react";

export const CrearPerfil = () => {
    const [contact, setContact] = useState({
        nombre: "",
        apellidos: "",
        telefono: "",
        email: "",
        com_autonoma: "",
        provincia: "",
        codigo_postal: "",
        dirección: "",
        sexo: ""
    });

    //Crear contacto
    const createContact = event => {
        event.preventDefault();
        console.log(contact);
        fetch("https://assets.breatheco.de/apis/fake/contact/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    };

    const handleChange = event => {
        setContact({ ...contact, [event.target.name]: event.target.value });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="text-center mt-5">Crear perfil</h1>
                    <form onSubmit={createContact}>
                        <div className="form-group">
                            <label>Nombre</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí su nombre"
                                name="nombre"
                            />
                        </div>
                        <div className="form-group">
                            <label>Apellidos</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí sus apellidos"
                                name="apellidos"
                            />
                        </div>
                        <div className="form-group">
                            <label>Telefono</label>
                            <input
                                type="tel"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí el telefono"
                                name="telefono"
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
                            <label>Comunidad Autónoma</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí su Comunidad Autónoma"
                                name="com_autonoma"
                            />

                        </div>

                        <div className="form-group">
                            <label>Provincia</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí su provincia"
                                name="provincia"
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
                            />
                        </div>

                        <div className="form-group">
                            <label>Sexo</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Añada aquí si es usted mujer, hombre, o no quiere definirse."
                                name="sexo"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary form-control mt-3">
                            Registro
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};