import React, { useEffect, useContext, useState } from "react";
import { Link, Navigate, Route, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
//import Leaflet
//import { MapContainer, TileLayer, useMap } from 'react-leaflet' 
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

export const Mapa = () => {

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )

}