// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Context } from "../store/appContext";

// export const Card = ({ hasSearched }) => {
//     const { store, actions } = useContext(Context);
//     const perfiles = store.perfil;

//     const navigate = useNavigate();

//     function handlePerfilPublico(id) {
//         actions.getInfoPublicaProductor(id);
//         actions.getProductosPorProductor(id);
//         navigate(`/perfil/${id}`);
//     }

//     return (
//         <div className="grid-container">
//             {perfiles.length === 0 && hasSearched && (
//                 <h6>No se encontraron resultados.</h6>
//             )}
//             {perfiles.map((perfil) => (
//                 <div key={perfil.id} className="card rounded card-home mb-2">
//                     <div className="card-body">
//                         <h4 className="card-title text-center">{perfil.nombre_huerta}</h4>
//                         <p className="card-text"><b>Nombre:</b> {perfil.nombre}</p>
//                         <p className="card-text"><b>Apellido:</b> {perfil.apellido}</p>
//                         <p className="card-text"><b>Dirección:</b> {perfil.direccion || "No especificado"}</p>
//                         <p className="card-text"><b>Municipio:</b> {perfil["municipio "] || "No especificado"}</p>
//                         <p className="card-text"><b>Telefono:</b> {perfil.telefono || "No especificado"}</p>
//                         <p className="card-text"><b>Dónde encontrar:</b> {perfil.donde_encontrar || "No especificado"}</p>
//                         <button type="button" className="btn btn-success" onClick={(e) => handlePerfilPublico(perfil.id)}>Ir a perfil</button>
//                     </div>

//                 </div>
//             ))}
//         </div>
//     );
// };

import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const Card_P = (props,{ hasSearched }) => {
    const { store, actions } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(false);
    const perfiles = store.perfil;

    const navigate = useNavigate();

    // FUNCION ICONO DE ME GUSTA

    const handleClick = (e, id, nombre_huerta) => {
        e.preventDefault()
        console.log(store.favoritos);
        let favs = [...store.favoritos]
        setIsFavorite(!isFavorite)

        if (!isFavorite === true) {
            favs.push({
                nombre_huerta: nombre_huerta,
                id: id,
            })

        } else (
            favs = favs.filter((item) => item.nombre_huerta !== nombre_huerta)
        )
        // setIsFavorite(!isFavorite);
        // if (!isFavorite) {
        //     actions.addFavorito(id, nombre_huerta)
        // }

        actions.addFavorito(favs)
        console.log(store.favoritos);
    }

    // const [showNoResults, setShowNoResults] = useState(false);

    // useEffect(() => {
    //     if (hasSearched) {
    //         // Muestra el mensaje "No se encontraron resultados" después de que hayan pasado 1 segundo (ajusta el tiempo según necesites)
    //         const timer = setTimeout(() => {
    //             setShowNoResults(true);
    //         }, 2000);

    //         return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    //     }
    // }, [hasSearched]);

    function handlePerfilPublico(id) {
        actions.getInfoPublicaProductor(id);
        actions.getProductosPorProductor(id);
        navigate(`/perfil/${id}`);
    }

    return (
   
                <div className="card rounded card-home mb-2">
                    <div className="card-body">
                        <h4 className="card-title text-center">{props.nombre_huerta}</h4>
                        <p className="card-text"><b>Nombre:</b> {props.nombre}</p>
                        {/* <p className="card-text"><b>Apellido:</b> {perfil.apellido}</p>
                        <p className="card-text"><b>Dirección:</b> {perfil.direccion || "No especificado"}</p> */}
                        <p className="card-text"><b>Municipio:</b> {props.municipio}</p>
                        <p className="card-text"><b>Teléfono:</b> {props.telefono}</p>
                        <p className="card-text"><b>Dónde encontrar:</b> {props.donde_encontrar}</p>

                        <button type="button" className="btn btn-success" onClick={e => handlePerfilPublico(props.id)}>Ir a perfil</button>

                        {(store.log === true) ?
                            <button type="button" className="btn btn-outline-success float-end" onClick={e => handleClick(e, props.id, props.nombre_huerta)}>

                                {

                                    (isFavorite) ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>

                                }

                            </button>
                            
                            : null}
                    </div>
                    
                </div>
    );


};
Card_P.propTypes = {

	nombre: PropTypes.string,
	id: PropTypes.number,
    nombre_huerta: PropTypes.string,
    municipio: PropTypes.string,
    telefono: PropTypes.number,
    donde_encontrar: PropTypes.string

};