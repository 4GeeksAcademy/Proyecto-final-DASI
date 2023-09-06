import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";



export const Card = () => {
    const { store, actions } = useContext(Context);
    const perfiles = store.perfil;

    const navigate = useNavigate();

    function handlePerfilPublico(id) {
        //alert('hello');
        actions.getInfoPublicaProductor(id)
        actions.getProductosPorProductor(id)
        //navigate("/perfil/1")
        navigate(`/perfil/${id}`)
        console.log("funciona")
    }

    return (
        <div className="row justify-content-center">
            {perfiles.map(perfil => (
                <div key={perfil.id} className="col-sm-4 mb-3 mb-sm-0">
                    <div className="card rounded">
                        <div className="card-body">
                            <h4 className="card-title text-center">{perfil.nombre_huerta}</h4>
                            <p className="card-text"><b>Nombre:</b> {perfil.nombre}</p>
                            <p className="card-text"><b>Apellido:</b> {perfil.apellido}</p>
                            <p className="card-text"><b>Dirección:</b> {perfil.direccion}</p>
                            <p className="card-text"><b>Problemas:</b> {perfil.problemas || "No especificado"}</p>
                            <p className="card-text"><b>Dónde encontrar:</b> {perfil.donde_encontrar || "No especificado"}</p>
                            {/* <Link to={`/perfil/${perfil.id}`} className="btn btn-primary">Ir a su perfil</Link> */}
                            <button type="button" className="btn btn-primary" onClick={e => handlePerfilPublico(perfil.id)}>Ir a perfil</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
