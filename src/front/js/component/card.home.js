import React, { useEffect, useContext, useState } from "react";
import { Link, Navigate, Route, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const Card = () => {
    const { store, actions } = useContext(Context);
    const [perfiles, setPerfiles] = useState(store.perfil);


        return (
            <div className="row">
                {perfiles.map(perfil => (
                    <div key={perfil.id} className="col-sm-6 mb-3 mb-sm-0">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{perfil.nombre_huerta}</h5>
                            <p className="card-text">{perfil.problemas}</p>
                            <p className="card-text">{perfil.donde_encontrar}</p>
                            <Link to={`/perfil/${perfil.id}`} className="btn btn-primary">Ir a su perfil</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
