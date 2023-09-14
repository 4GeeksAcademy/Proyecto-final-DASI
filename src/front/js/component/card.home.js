import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Card = ({ hasSearched }) => {
    const { store, actions } = useContext(Context);
    const perfiles = store.perfil;

    const navigate = useNavigate();

    function handlePerfilPublico(id) {
        actions.getInfoPublicaProductor(id);
        actions.getProductosPorProductor(id);
        navigate(`/perfil/${id}`);
    }

    return (
        <div className="grid-container">
            {perfiles.length === 0 && hasSearched && (
                <p>No se encontraron resultados.</p>
            )}
            {perfiles.map((perfil) => (
                <div key={perfil.id} className="card rounded card-home mb-2">
                    <div className="card-body">
                        <h4 className="card-title text-center">{perfil.nombre_huerta}</h4>
                        <p className="card-text"><b>Nombre:</b> {perfil.nombre}</p>
                        <p className="card-text"><b>Apellido:</b> {perfil.apellido}</p>
                        <p className="card-text"><b>Dirección:</b> {perfil.direccion || "No especificado"}</p>
                        <p className="card-text"><b>Municipio:</b> {perfil["municipio "] || "No especificado"}</p>
                        <p className="card-text"><b>Telefono:</b> {perfil.telefono || "No especificado"}</p>
                        <p className="card-text"><b>Dónde encontrar:</b> {perfil.donde_encontrar || "No especificado"}</p>
                        <button type="button" className="btn btn-success" onClick={(e) => handlePerfilPublico(perfil.id)}>Ir a perfil</button>
                    </div>

                </div>
            ))}
        </div>
    );
};

