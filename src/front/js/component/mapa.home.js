import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { MapContainer, TileLayer, Marker, Popup, Icon } from 'react-leaflet'
//import url("https://unpkg.com/leaflet@1.9.3/dist/leaflet.css");


export const Mapa = () => {
    const { store } = useContext(Context);
    const perfiles = store.perfil;

    const position = [39.854010220603925, -4.013509804550462]

    const myIcon = L.icon({
        iconUrl: 'myIcon.png',
        // ...
    });

    return (
        <MapContainer id="mapa" center={position} zoom={6} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* <Marker position={position},  {icon: myIcon}> */}
            {/* <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> */}

            {/* Marker for each Productor */}
            {perfiles.map(perfil => (

                <Marker position={[perfil.latitud, perfil.longitud]}>
                    <Popup>
                        {perfil.nombre_huerta}
                    </Popup>
                </Marker >

            ))}


        </MapContainer>
    )

}