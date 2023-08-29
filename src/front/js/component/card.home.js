import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Card = () => {
    const { store } = useContext(Context);
    const perfiles = store.perfil;

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
                            <Link to={`/perfil/${perfil.id}`} className="btn btn-primary">Ir a su perfil</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
