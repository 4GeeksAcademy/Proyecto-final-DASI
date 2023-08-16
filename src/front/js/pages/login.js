import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className=" text-center bg-success bg-opacity-25">

            <h1 id="log" >Login</h1>

            <div className="col-6 m-auto" >

                <div className="input-group my-4 ">
                <input type="email" className="form-control" placeholder="Email" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                </div>

                <div className="input-group">
                <input type="password" className="form-control" placeholder="Contraseña" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                </div>

                <input class="btn btn-submit mt-5" type="submit" value="Submit"></input>

                <br/>
                <br/>

                <a href="#" class="link-primary">Crear perfil</a>

            </div>


		</div>
	);
};
