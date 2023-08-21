import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

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
            product.nombre,
            product.cantidad,
            product.unidad_medida,
            product.lista,
            product.variedad,
            product.tipo,
            product.recogida,
            product.precio

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

        console.log(product);
    };

    const handleDropdownClick = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.text });
        console.log(product);
      };


	return (
		<div className="pb-5 text-center m-auto">

            <h1 className="mt-5" >Añadir producto</h1>

            <form onSubmit={addProduct} className=" pb-5 ">
					
                <div className="form-group my-3 col-6 m-auto text-start">
                    <label>Nombre</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Añada aquí su nombre"
                        name="nombre"
                    />
                </div>

                <div className="form-group my-3 col-6 m-auto text-start">
                    <label>Cantidad</label>
                    <input
                        type="number"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Añada aquí su nombre"
                        name="cantidad"
                    />
                </div>

                <div className="d-inline-flex my-3 mx-5 text-start" >

                    <div className="dropdown form-group  mx-4">
                        
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Unidad de Medida
                        </button>
                        <ul className="dropdown-menu">

                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="unidad_medida" href="#">Por unidad</a></li>
                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="unidad_medida" href="#">Por kilo</a></li>
                
                        </ul>
                    </div>
                    <div className="dropdown form-group  mx-4">
                        
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Lista
                        </button>
                        <ul className="dropdown-menu">

                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="lista" href="#">Semanal</a></li>
                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="lista" href="#">Mensual</a></li>
                
                        </ul>
                    </div>
                    <div className="dropdown form-group  mx-4">
                        
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Variedad
                        </button>
                        <ul className="dropdown-menu">

                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="unidad_medida" href="#">Por unidad</a></li>
                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="unidad_medida" href="#">Por kilo</a></li>
                
                        </ul>
                    </div>
                    <div className="dropdown form-group  mx-4">
                        
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Tipo
                        </button>
                        <ul className="dropdown-menu">

                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="unidad_medida" href="#">Por unidad</a></li>
                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="unidad_medida" href="#">Por kilo</a></li>
                
                        </ul>
                    </div>
                    <div className="dropdown form-group  mx-4">
                        
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Recogida
                        </button>
                        <ul className="dropdown-menu">

                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="recogida" href="#">En Huerto</a></li>
                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="recogida" href="#">En Mercado</a></li>
                
                        </ul>
                    </div>

                    {/* <div className="form-group  mx-4">
                        <label>Unidad de Medida</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Añada aquí su nombre"
                            name="nombre"
                        />
                    </div> */}

                    <div className="form-group mx-4 ">
                        <label>Lista</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Añada aquí su nombre"
                            name="nombre"
                        />
                    </div>

                    <div className="form-group mx-4">
                        <label>Variedad</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Añada aquí su nombre"
                            name="nombre"
                        />
                    </div>

                    <div className="form-group mx-4">
                        <label>Tipo</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Añada aquí su nombre"
                            name="nombre"
                        />
                    </div>

                    <div className="form-group mx-4">
                        <label>Recogida</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Añada aquí su nombre"
                            name="nombre"
                        />
                    </div>

                </div>

                <div className="form-group my-3 col-6 m-auto text-start">
                    <label>Precio</label>
                    <input
                        type="number"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Añada aquí su nombre"
                        name="precio"
                    />
                </div>
					
                <button type="submit" className="btn btn-submit mt-5 form-control col-6 text-center">
                    Submit
                </button>

            </form>
            
		</div>
	);
};