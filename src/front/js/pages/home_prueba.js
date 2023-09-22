import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
// import { Card } from "../component/card.home.js";
import { Card_P } from "../component/card.home_prueba.js";

import { Mapa } from "../component/mapa.home"

import "../../styles/home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Home_P = () => {

    const { store, actions } = useContext(Context);
    const communityData = store.communityData;
    const [hasSearched, setHasSearched] = useState(false); // Estado inicializado en false
    const perfiles = store.perfil;


    async function GetProducts() {
        await actions.getNombreProducto();
    }




    const categories = [
        {
            label: "Producto",
            options: Array.from(new Set(store.nombre_producto?.map(x => x.nombre)))
        },
        {
            label: "Tipo de produccion",
            options: Array.from(new Set(store.nombre_producto?.map(x => x.tipo_produccion)))
        }
    ];

    const [selectedCommunity, setSelectedCommunity] = useState("");
    const [selectedOptions, setSelectedOptions] = useState({});
    const [selectedProvince, setSelectedProvince] = useState("");

    const handleCommunitySelect = (community) => {
        setSelectedCommunity(community);
        setSelectedProvince("");
    };

    const handleProvinceSelect = (province) => {
        setSelectedProvince(province);
    };

    const handleOptionSelect = (categoryLabel, option) => {
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [categoryLabel]: option,
        }));
    };

    const [isCardVisible, setIsCardVisible] = useState(true);

    const handleSubmit = () => {
        setHasSearched(true);
        const formData = {
            selectedCommunity,
            selectedProvince,
            selectedOptions
        };
        console.log("Datos enviados:", formData);
        actions.pedirPerfil(formData);
        setIsCardVisible(true);
        setSelectedCommunity("");
        setSelectedProvince("");
        setSelectedOptions({});
    };
    const [showNoResults, setShowNoResults] = useState(false);

    useEffect(() => {
        if (hasSearched) {
            // Muestra el mensaje "No se encontraron resultados" después de que hayan pasado 1 segundo (ajusta el tiempo según necesites)
            const timer = setTimeout(() => {
                setShowNoResults(true);
            }, 2000);

            return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
        }
    }, [hasSearched]);


    useEffect(() => {
        GetProducts();
        actions.getProductor();
        const storedJsonString = localStorage.getItem("favoritos");
        const storedObject = JSON.parse(storedJsonString);
        actions.addFavorito(storedObject)
    }, []);

    return (
        <div className="  bg-success bg-opacity-25" style={{ minHeight: '80vh' }}>
            <div className="pt-3 d-flex justify-content-center">
                {/* <h5>Busca productos frescos y producidos por agricultores locales</h5> */}
                <h5 id="titulo2" className="fs.3 fw-semibold" >Busca productos frescos y producidos por agricultores locales</h5>
            </div>
            <div className="container pt-3 d-flex justify-content-center">
                {categories.length > 0 ? categories.map((category, index) => (
                    <div className="btn-group" key={index}>
                        <button type="button" id="params" className="btn btn-secondary ms-3 custom-dropdown-btn">
                            {selectedOptions[category.label] || category.label}
                        </button>
                        <button
                            type="button"
                            id="op"
                            className="btn btn-secondary dropdown-toggle dropdown-toggle-split btn-secondary"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="visually-hidden">Toggle Dropdown</span>
                        </button>

                        <ul className="dropdown-menu">
                            {category.options.map((option, optionIndex) => (
                                <li key={optionIndex}>
                                    <button
                                        className={`dropdown-item ${option === selectedOptions[category.label] ? "active" : ""}`}
                                        onClick={() => handleOptionSelect(category.label, option)}
                                    >
                                        {option}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )) : "cargando"}
                <div className="btn-group">
                    <button type="button" id="params" className="btn btn-secondary ms-3 custom-dropdown-btn">
                        {selectedCommunity || "Com. Autónoma"}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        id="op"
                    >
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu">
                        {Object.keys(communityData).map((community, index) => (
                            <li key={index}>
                                <button
                                    className={`dropdown-item ${community === selectedCommunity ? "active" : ""}`}
                                    onClick={() => handleCommunitySelect(community)}
                                >
                                    {community}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="btn-group">
                    <button type="button" id="params" className="btn btn-secondary ms-3 custom-dropdown-btn">
                        {selectedProvince || "Provincia"}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        id="op"
                    >
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu">
                        {communityData[selectedCommunity]?.map((province, index) => (
                            <li key={index}>
                                <button
                                    className={`dropdown-item ${province === selectedProvince ? "active" : ""}`}
                                    onClick={() => handleProvinceSelect(province)}
                                >
                                    {province}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="ms-3">
                    <button type="button" id="lupa" className="btn btn-primary" onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    {/* <button type="button" className="btn btn-danger" onClick={() => handleReset()} style={{ marginLeft: '10px' }}>
            Resetear
          </button> */}
                </div>
            </div>

            <div className="py-5 ms-5 d-flex justify-content-start">
                <div style={{ width: '40%' }} >
                    < Mapa />
                </div>

                <div className="grid-container mx-3" style={{ width: '60%' }}>
                    {showNoResults && perfiles.length === 0 && (
                        // <h6>No se encontraron resultados.</h6>
                        <div className="alert alert-danger" role="alert" style={{ height: '10%' }}>
                            No se encontraron resultados
                        </div>
                    )}
                    {perfiles.map(perfil => (
                        <div key={perfil.id}>
                            {isCardVisible && <Card_P hasSearched={hasSearched}

                                id={perfil.id}
                                nombre_huerta={perfil.nombre_huerta}
                                nombre={perfil.nombre}
                                municipio={perfil["municipio "] || "No especificado"}
                                telefono={perfil.telefono || "No especificado"}
                                donde_encontrar={perfil.donde_encontrar || "No especificado"}

                            />}

                        </div>
                    ))}

                </div>
            </div>


        </div>
    );
};

