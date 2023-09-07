import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const AddProduct = () => {

    const { store, actions } = useContext(Context);
    const [resp, setResp] = useState("");
    const navigate = useNavigate();
    const producto = store.producto;

    const [product, setProduct] = useState({
        nombre: "Nombre",
        cantidad: "",
        unidad_medida: "Medida",
        // pedido: "Pedido",
        variedad: "",
        tipo_produccion: "Producción",
        recogida: "Recogida",
        precio: ""
    });


    //AÑADIR PRODUCTO

    async function addProduct(e) {
        e.preventDefault()
        console.log(product);
        let nuevo_producto = await actions.newProduct(
            product.nombre,
            product.cantidad,
            product.unidad_medida,
            // product.pedido,
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
            setResp("");
            product.nombre === "" ||
            product.cantidad === "" ||
            product.unidad_medida === "" ||
            product.variedad === "" ||
            product.tipo_produccion === "" ||
            product.recogida === "" ||
            product.precio === "" ? setResp("Debes introducir todos los valores") : null;
        }

    };


    const handleChange = event => {
        setProduct({ ...product, [event.target.name]: event.target.value });

        console.log("handleChangeProduct: ", product);
    };

    const handleDropdownClick = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.text });
        console.log(product);
    };

    // useEffect(() => {
    //     window.location.href = '/perfil'
    //     // actions.getNombreProducto();


    // }, [addProduct]);

    return (
        <div className="pb-5 text-center m-auto">

            <h1 className="mt-5" >Añadir producto</h1>

            <form onSubmit={addProduct} className=" pb-5 ">

                <div className="d-inline-flex my-3 mx-5 text-start" >

                    <div className="dropdown form-group  mx-4">

                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {product.nombre}
                        </button>
                        <ul className="dropdown-menu">

                            {producto.nombre.map((item, i) =>
                                <li><a className="dropdown-item"
                                    onClick={handleDropdownClick}
                                    name="nombre"
                                    // key={i}
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
                        {product.pedido}
                        </button>
                        <ul className="dropdown-menu">

                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="pedido" href="#">Semanal</a></li>
                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="pedido" href="#">Mensual</a></li>

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

                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {product.tipo_produccion}
                        </button>
                        <ul className="dropdown-menu">

                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="tipo_produccion" href="#">Ecológica</a></li>
                            <li><a className="dropdown-item" onClick={handleDropdownClick} name="tipo_produccion" href="#">Estándard</a></li>

                        </ul>
                    </div>


                </div>

                <div className="form-group my-3 col-6 m-auto text-start">
                    <label>Variedad</label>
                    <input
                        type="text"
                        value={product.variedad}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Añada aquí la variedad de su producto"
                        name="variedad"
                    />
                </div>

                <div className="form-group my-3 col-6 m-auto text-start">
                    <label>Cantidad</label>
                    <input
                        type="number"
                        value={product.cantidad}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Cantidad disponible"
                        name="cantidad"
                    />
                </div>

                <div className="form-group my-3 col-6 m-auto text-start">
                    <label>Precio</label>
                    <input
                        type="number"
                        onChange={handleChange}
                        value={product.precio}
                        className="form-control"
                        placeholder="Precio de su producto"
                        name="precio"
                    />
                </div>
                <div className="d-flex justify-content-center" >
                    <p className="text-danger">{resp}</p>
                </div>

                <button type="submit" className="btn btn-submit mt-5 form-control col-6 text-center">
                    Submit
                </button>

            </form>

        </div>
    );
};