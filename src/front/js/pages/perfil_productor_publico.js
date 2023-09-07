import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { CardProducto } from "../component/card.producto.js";
import { InfoProductorPerfil } from "../component/info_productor_perfil.js";
import { Context } from "../store/appContext";
import { Whatsapp } from "../component/whatsapp.js";

export const PerfilProductorPublico = () => {
   


    return (
        <div className="Container" >

            <div className="p-4" >
                <InfoProductorPerfil />
            </div>
            <div className="mb-5">
                <CardProducto />
            </div>
            <div>
                <Whatsapp />
            </div>
            

        </div >
    );
};
