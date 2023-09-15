import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";



export const Card = (props) => {
    const { store, actions } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(false);
    const perfiles = store.perfil;

    const navigate = useNavigate();

    // FUNCION ICONO DE ME GUSTA

    const handleClick = (e) => {
        e.preventDefault()
        console.log(store.favoritos);
        let favs = [...store.favoritos]
        setIsFavorite(!isFavorite)

        if (!isFavorite === true) {
            favs.push({
                name: target.nombre_huerta,
                id: perfiles.id,
            })

        } else (
            favs = favs.filter((item) => item.nombre_huerta !== perfiles.nombre_huerta)
        )

        actions.addFavorito(favs)
    }

    function handlePerfilPublico(id) {
        //alert('hello');
        actions.getInfoPublicaProductor(id)
        actions.getProductosPorProductor(id)
        navigate(`/perfil/${id}`)
        console.log("funciona")
    }

    return (
        <div className="row justify-content-center">
            {perfiles.map(perfil => (
                <div key={perfil.id} className="col-sm-4 mb-3 mb-sm-0">
                    <div className="card rounded card-home mb-5">
                        <div className="card-body">
                            <h4 className="card-title text-center">{perfil.nombre_huerta}</h4>
                            <p className="card-text"><b>Nombre:</b> {perfil.nombre}</p>
                            <p className="card-text"><b>Apellido:</b> {perfil.apellido}</p>
                            <p className="card-text"><b>Dirección:</b> {perfil.direccion}</p>
                            <p className="card-text"><b>Problemas:</b> {perfil.problemas || "No especificado"}</p>
                            <p className="card-text"><b>Dónde encontrar:</b> {perfil.donde_encontrar || "No especificado"}</p>

                            {/* <Link to={`/perfil/${perfil.id}`} className="btn btn-primary">Ir a su perfil</Link> */}
                            <button type="button" className="btn btn-success" onClick={e => handlePerfilPublico(perfil.id)}>Ir a perfil</button>

                            {(store.log === true) ?
                                <button type="button" className="btn btn-outline-warning float-end" onClick={handleClick}>
                                    {

                                        (isFavorite) ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>
                                    }

                                </button>
                            : null}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );


};
Card.propTypes = {

    name: PropTypes.string,
    id: PropTypes.string,

};