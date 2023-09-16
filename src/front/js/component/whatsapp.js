import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

import { Context } from "../store/appContext.js";

export const Whatsapp = () => {

    const { actions, store } = useContext(Context);
    const navigate = useNavigate()



    let info_productor_publico = store.info_productor_publico
    
    const openNewTab = () => {
        window.open(`https://api.whatsapp.com/send?phone=${info_productor_publico.telefono}`, '_blank');
    }

    async function GetProducts() {
        await actions.getNombreProducto();
    }


    useEffect(() => {
        GetProducts();


    }, []);


    return (

        <button type="button" className="btn btn-success fixed-bottom float-end" id="wp" onClick={openNewTab}>
            <a href="#" className="link-light" id="wp-icon" >
                <i className="fa-brands fa-whatsapp" ></i>
            </a>
        </button>

    );
};
