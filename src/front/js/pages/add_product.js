import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import axios from "axios"

export const AddProduct = () => {

	const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        nombre: "",
        cantidad: "",
        unidad_medida: "",
        lista: "",
        variedad: "",
        tipo: "",
        recogida: "",
        precio: ""
    });

    //AÑADIR / MODIFICAR PRODUCTO

    async function addProduct(e)  {
		e.preventDefault()
        let nuevo_producto = await actions.registro(
            contact.nombre,
            contact.cantidad,
            contact.unidad_medida,
            contact.lista,
            contact.variedad,
            contact.tipo,
            contact.recogida,
            contact.precio

        );
        if (nuevo_producto) {
            navigate('/'); /* enlace a perfil productor*/
		} else{
			setProduct({
                nombre: "",
                cantidad: "",
                unidad_medida: "",
                lista: "",
                variedad: "",
                tipo: "",
                recogida: "",
                precio: ""
            });
		}
		
	};


    const handleChange = event => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    };


	return (
		<div className=" text-center pb-5">

            <h1 className="mt-5" >Añadir producto</h1>

            <form onSubmit={addProduct} className="col-3 m-auto pb-5">
					
                <div className="form-group my-3">
                    <label>Nombre</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Añada aquí su nombre"
                        name="nombre"
                    />
                </div>

                <div className="form-group">
                    <label>Cantidad</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Añada aquí su nombre"
                        name="nombre"
                    />
                </div>

                <div className="form-group">
                    <label>Unidad de Medida</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Añada aquí su nombre"
                        name="nombre"
                    />
                </div>

                <div className="form-group">
                    <label>Lista</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Añada aquí su nombre"
                        name="nombre"
                    />
                </div>

                <div className="form-group">
                    <label>Variedad</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Añada aquí su nombre"
                        name="nombre"
                    />
                </div>

                <div className="form-group">
                    <label>Tipo</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Añada aquí su nombre"
                        name="nombre"
                    />
                </div>

                <div className="form-group">
                    <label>Recogida</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Añada aquí su nombre"
                        name="nombre"
                    />
                </div>

                <div className="form-group">
                    <label>Precio</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Añada aquí su nombre"
                        name="nombre"
                    />
                </div>
					
                <button type="submit" className="btn btn-submit mt-5 form-control col-4">
                    Submit
                </button>

            </form>
            
		</div>
	);
};