import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const CardProductoPublico = () => {

    const { store, actions } = useContext(Context);

    let add_producto = store.productos;


    // function handleDeleteProduct(id) {
    //    actions.deleteProduct(id)
    // }

    return (

        <div className="mt-2 mx-5 border border-success border-3 p-3 overflow-x-auto" >
            <div className="d-flex justify-content-between">
                <span className="display-4 mb-4">Productos del mes</span>
                {/* <Link to="/add_product">
                    <button className="btn btn-success" style={{ width: "35px", height: "35px" }}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </Link> */}
            </div>
            <div className="">
                <ul className="d-flex justify-content-evenly flex-wrap m-3">{add_producto.map((item => (
                    <li key={item.id}>
                        <div className="card mb-3 card-product-publico" style={{ width: "20rem" }}>
                            {/* <img className="card-img-top" src="https://previews.123rf.com/images/sybirko/sybirko1802/sybirko180200008/94798081-personaje-de-dibujos-animados-de-col-lechuga-iceberg-s%C3%ADmbolo-vegetal-feliz-icono-de-comida.jpg" alt="..." /> */}
                            <div className="card-body fs-5">
                                <h4 className="card-text text-center mb-2">{item.nombre}</h4>
                                <p className="card-text">Variedad: {item.variedad}</p>
                                <p className="card-text">Tipo de producción: {item.tipo_produccion}</p>
                                <p className="card-text">Recogida:{item.recogida}</p>
                                <p className="card-text">Precio: {item.precio} €</p>
                                <p className="card-text">{item.unidad_medida} </p>
                            </div>
                            {/* <div className="fs-3 d-flex justify-content-end mb-2 me-2">
                                <Link to="/edit_product">
                                    <span>
                                        <i className="fa-solid fa-pen-to-square btn btn-success mx-2"></i>
                                    </span>
                                </Link>
                                <span onClick={() => handleDeleteProduct(item.id)}>
                                    <i className="fa-solid fa-trash btn btn-success"></i>
                                </span>
                            </div> */}
                        </div>
                    </li>))
                )}
                </ul>
            </div>
        </div >
    );
}