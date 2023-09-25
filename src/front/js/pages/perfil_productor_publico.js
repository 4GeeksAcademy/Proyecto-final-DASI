import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { InfoProductorPerfil } from "../component/info_productor_perfil.js";
import { Context } from "../store/appContext";
import { Whatsapp } from "../component/whatsapp.js";
import { CardProductoPublico } from "../component/card.producto.publico.js";

export const PerfilProductorPublico = () => {
    const { store, actions } = useContext(Context);
	let info_productor = store.info_productor

   

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
           

        </div >
    );
};
