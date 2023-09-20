import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { InfoProductorPerfil } from "../component/info_productor_perfil.js";
import { Context } from "../store/appContext";
import { Whatsapp } from "../component/whatsapp.js";
import { CardProductoPublico } from "../component/card.producto.publico.js";

export const PerfilProductorPublico = () => {
    const { store, actions } = useContext(Context);
	let info_productor_publico = store.info_productor_publico

    useEffect(() => {
		let info_productor_publico = JSON.parse(localStorage.getItem('info_productor_publico'));
		if (info_productor_publico !== null) {
			store.info_productor_publico = info_productor_publico;
		}
	}, []);

    const openNewTab = () => {
        window.open(`https://api.whatsapp.com/send?phone=${info_productor_publico.telefono}`, '_blank');
    }

    return (
        <div className="Container" >

            <div className="p-4" >
                <InfoProductorPerfil />
            </div>
            <div className="mb-5">
                <CardProductoPublico />
            </div>
            <div>
                <Whatsapp />
            </div>
            <button type="button" className="btn btn-success fixed-bottom float-end" id="wp" onClick={openNewTab}>
                <a href="#" className="link-light" id="wp-icon" >
                    <i className="fa-brands fa-whatsapp" ></i>
                </a>
            </button>


        </div >
    );
};
