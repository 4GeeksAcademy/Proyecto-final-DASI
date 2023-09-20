import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { InfoProductorPerfil } from "../component/info_productor_perfil.js";
import { Context } from "../store/appContext";
import { Whatsapp } from "../component/whatsapp.js";
import { CardProductoPublico } from "../component/card.producto.publico.js";

export const PerfilProductorPublico = () => {
    const { store, actions } = useContext(Context);
	let info_productor = store.info_productor
    useEffect(() => {
		
		let info_productor = JSON.parse(localStorage.getItem('info_productor'));
		if (info_productor !== null) {
			store.info_productor = info_productor;
		}
	}, []);

    const openNewTab = () => {
        window.open(`https://api.whatsapp.com/send?phone=${info_productor.telefono}`, '_blank');
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
