import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";


export const EditProduct = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    let producto = store.producto_elegido
    const [product, setProduct] = useState({
        nombre: producto.nombre,
        cantidad: producto.cantidad,
        unidad_medida: producto.unidad_medida,
        variedad: producto.variedad,
        tipo_produccion: producto.tipo_produccion,
        recogida: producto.recogida,
        precio: producto.precio
    });

    //EDITAR PRODUCTO

    async function editProduct(e) {
        e.preventDefault()
        let nuevo_producto = await actions.upDate(
            product.nombre,
            product.cantidad,
            product.unidad_medida,
            product.variedad,
            product.tipo_produccion,
            product.recogida,
            product.precio

        );
        if (nuevo_producto) {
            navigate('/perfil'); /* enlace a perfil productor*/
        } else {
            setProduct({
                nombre: "Nombre",
                cantidad: "",
                unidad_medida: "Medida",
                variedad: "",
                tipo_produccion: "Producción",
                recogida: "Recogida",
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

    //   useEffect(() => {

    // 	actions.getNombreProducto();

    // }, []);
    // useEffect(() => {

    // 	actions.getProfile();


    // }, []);
    return (
        <div className="pb-5 text-center m-auto">

            <h1 className="mt-5" >Editar producto</h1>

            <form onSubmit={editProduct} className=" pb-5 ">

                <div className="d-inline-flex my-3 mx-5 text-start" >

                    <div className="dropdown form-group  mx-4">

                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {product.nombre}
                        </button>
                        <ul className="dropdown-menu">

                            {store.producto.nombre.map((item) =>
                                <li><a className="dropdown-item"
                                    onClick={handleDropdownClick}
                                    name="nombre"
                                    href="#">{item}
                                </a></li>
                            )}

                        </ul>
                    </div>

                    <div className="dropdown form-group  mx-4">

                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {product.unidad_medida}
                        </button>
                        <ul className="dropdown-menu">

                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="unidad_medida" href="#">Por unidad</a></li>
                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="unidad_medida" href="#">Por kilo</a></li>

                        </ul>
                    </div>

                    {/* <div className="dropdown form-group  mx-4">

                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {product.lista}
                        </button>
                        <ul className="dropdown-menu">

                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="lista" href="#">Semanal</a></li>
                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="lista" href="#">Mensual</a></li>

                        </ul>
                    </div> */}


                    <div className="dropdown form-group  mx-4">

                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {product.recogida}
                        </button>
                        <ul className="dropdown-menu">

                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="recogida" href="#">En Huerto</a></li>
                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="recogida" href="#">En Mercado</a></li>

                        </ul>
                    </div>
                    <div className="dropdown form-group  mx-4">

                        <button className="btn btn-secondary dropdown-toggle drop-butt" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {product.tipo_produccion}
                        </button>
                        <ul className="dropdown-menu">

                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="tipo_produccion" href="#">Orgánica</a></li>
                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="tipo_produccion" href="#">Ecológica</a></li>
                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="tipo_produccion" href="#">Convencional</a></li>

                        </ul>
                    </div>


                </div>

                <div className="form-group my-3 col-6 m-auto text-start">
                    <label>Variedad</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        className="form-control"
                        value={product.variedad}
                        name="variedad"
                    />
                </div>

                <div className="form-group my-3 col-6 m-auto text-start">
                    <label>Cantidad</label>
                    <input
                        type="number"
                        onChange={handleChange}
                        className="form-control"
                        placeholder={product.cantidad}
                        name="cantidad"
                    />
                </div>

                <div className="form-group my-3 col-6 m-auto text-start">
                    <label>Precio</label>
                    <input
                        type="number"
                        onChange={handleChange}
                        className="form-control"
                        placeholder={product.precio}
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