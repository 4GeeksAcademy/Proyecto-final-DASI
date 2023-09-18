import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


export const Equipo = () => {

    return (
        <div className="Container" >
            <div className="row row-cols-1 row-cols-md-4 g-5">
                <div className="col">
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Daniel Carrión</h5>
                                <p className="card-text">This is a longer card with supporting text below.</p>
                            </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Sergio Reverte</h5>
                                <p className="card-text">This is a longer card with supporting text below.</p>
                            </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Angelica Quijada</h5>
                                <p className="card-text">This is a longer card with supporting text below.</p>
                            </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Inti Luna</h5>
                                <p className="card-text">This is a longer card with supporting text below.</p>
                            </div>
                    </div>
                </div>
            </div>




        </div >
    );
};
