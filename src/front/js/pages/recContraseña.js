import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import axios from "axios"

export const Contraseña = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [resp, setResp] = useState("");

    // const handlerNavigate = (e) => {
    // 	e.preventDefault()
    // 	navigate("/registro")
    // }
    // const recContraseña = (e) => {
    // 	e.preventDefault()
    // 	navigate("/registro")
    // }

    async function handlerSubmit(e) {
        e.preventDefault()

        let envio = await actions.rec(email)

        if (envio) {
            setEmail("");
            setResp(
                <div className="alert alert-primary col-4" role="alert">
                    Mensaje enviado
                </div>);
        } else {
            
            email === "" ?

                setResp(
                <div className="alert alert-danger col-4" role="alert">
                    Campo incompleto
                </div>)

                : setResp(
                    <div className="alert alert-danger col-7" role="alert">
                        {store.respuesta_log}
                    </div>);

        }

        // setEmail("");
        // setResp(
        //     <div className="alert alert-primary col-4" role="alert">
        //         Mensaje enviado
        //     </div>);
    }

    // };

    // useEffect(() => {


    // 	actions.getProfile();



    // }, []);


    return (
        <div className=" bg-success bg-opacity-25 pb-3 pt-1 d-flex" style={{ minHeight: '80vh' }}>

            <div className="col-6" id="cuerpo-form">

                <h1 id="" className="display-2 mx-4 col-9" >Recupera tu contraseña</h1>

                <h3 className="fs-5 fw-bolder mx-4 col-9 mt-3 lh-lg" >Introduce el correo electrónico empleado en tu registro y si se encuentra en nuestra base de datos te enviaremos una nueva contraseña.</h3>


                <form onSubmit={handlerSubmit} className="col-11 pb-3 mx-4">

                    {/* <br /> */}

                    <div className="form-floating my-3">
                        <input
                            type="email"
                            value={email}
                            className="form-control"
                            placeholder="Introduzca su email"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Correo electrónico</label>
                    </div>


                    {resp}

                    <button type="submit" id="rec" className="btn btn-submit mt-3 form-control col-4 fw-bold text-white fs-5 mb-3">
                        Recuperar contraseña
                    </button>

                    <br />

                </form>

            </div>
            <div className="col-6">
                <img id="plantas" src="https://cdn.pixabay.com/photo/2021/11/25/18/46/leaf-6824367_960_720.png" />
            </div>
        </div>
    );
};