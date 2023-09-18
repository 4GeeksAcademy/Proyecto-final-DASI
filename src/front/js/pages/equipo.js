import React, { useContext, useState, useEffect } from "react";
import foto_daniel from "../../img/perfiles/daniel.jpeg";
import foto_angelica from "../../img/perfiles/angelica.jpeg";
import foto_sergio from "../../img/perfiles/sergio.jpeg";
import foto_inti from "../../img/perfiles/inti2.jpg";


export const Equipo = () => {

    return (
        <div className="Container" >

            <div className="pt-3 d-flex justify-content-center">

                <h8 id="titulo3" className="p-5 " >Muchas veces consumimos productos sin saber desde dónde, cómo y por quienes se producen. Con esta plataforma, queremos aportar al consumo local de productos frescos, fortalecer red social y apoyar a quienes experimentan, trabajan duro y disfrutan la vida en el campo.</h8>
            </div>


            <div className="row row-cols-1 row-cols-md-4 g-5 p-5">
                <div className="col">
                    <div className="card-perfil">
                        <img src={foto_daniel} className="card-img-top rounded-circle" alt="Foto de Daniel" />
                        <div className="card-body">
                            <h5 className="card-title text-center"><a class="link-opacity-25 text-decoration-none link-dark" href="https://www.linkedin.com/in/daniel-carri%C3%B3n-mart%C3%ADnez-19730aba/">Daniel Carrión</a></h5>
                            {/* <p className="card-text">This is a longer card with supporting text below.</p> */}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card-perfil">
                        <img src={foto_sergio} className="card-img-top rounded-circle" alt="Foto de Sergio" />
                        <div className="card-body">
                            <h5 className="card-title text-center"><a class="link-opacity-25 text-decoration-none link-dark" href="https://www.linkedin.com/in/sergio-reverte-4890b01b0/">Sergio Reverte</a></h5>
                            {/* <p className="card-text">This is a longer card with supporting text below.</p> */}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card-perfil">
                        <img src={foto_angelica} className="card-img-top rounded-circle" alt="Foto de Angelica" />
                        <div className="card-body">
                            <h5 className="card-title text-center"><a class="link-opacity-25 text-decoration-none link-dark" href="https://www.linkedin.com/in/angelica-quijada-zambrano-414387234/">Angelica Quijada</a></h5>

                            {/* <p className="card-text">This is a longer card with supporting text below.</p> */}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card-perfil">
                        <img src={foto_inti} className="card-img-top rounded-circle" alt="Foto de Inti" />
                        <div className="card-body">
                            <h5 className="card-title text-center"><a class="link-opacity-25 text-decoration-none link-dark" href="https://www.linkedin.com/in/inti-luna-aviles-8a55998/">Inti Luna</a></h5>
                            {/* <p className="card-text">This is a longer card with supporting text below.</p> */}
                        </div>
                    </div>
                </div>
            </div>




        </div >
    );
};
