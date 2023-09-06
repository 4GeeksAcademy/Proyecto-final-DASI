import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { CardProducto } from "../component/card.producto.js";
import { InfoProductorPerfil } from "../component/info_productor_perfil.js";

export const PerfilProductorPublico = () => {




    return (
        <div className="Container" >

            <div className="p-4" >
                <InfoProductorPerfil />
            </div>
            <div>
                <CardProducto />
            </div>

        </div >
    );
};
