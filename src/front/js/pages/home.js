import React, { useState , useContext } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/card.home"
import "../../styles/home.css";

export const Home = () => {

  const { store, actions } = useContext(Context);
  const communityData = store.communityData;

  const categories = [
    {
      label: "Producto",
      options: ["Tomate", "Cebolla", "Pimiento"]
    },
    {
      label: "Recogida",
      options: ["En huerto", "En mercado"]
    },
    {
      label: "Tipo de producción",
      options: ["Ecológica", "Estándar"]
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

  const handleSubmit = () => {

    const formData = {
      selectedCommunity,
      selectedProvince
    };
    console.log("Datos enviados:", formData);
    actions.pedirPerfil();
  };

  // async function handlerSubmit(e)  {
	// 	e.preventDefault()
	// 	await actions.login(email, password)
  // }

  return (
    <div className="bg-success bg-opacity-25" style={{ minHeight: '80vh' }}>
      <div className="container pt-5 d-flex justify-content-center">
        {categories.map((category, index) => (
          <div className="btn-group" key={index}>
            <button type="button" className="btn btn-secondary ms-3 custom-dropdown-btn">
              {selectedOptions[category.label] || category.label}
            </button>
            <button
              type="button"
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
        ))}
        <div className="btn-group">
          <button type="button" className="btn btn-secondary ms-3 custom-dropdown-btn">
            {selectedCommunity || "Com. Autónoma"}
          </button>
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
            aria-expanded="false"
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
          <button type="button" className="btn btn-secondary ms-3 custom-dropdown-btn">
            {selectedProvince || "Provincia"}
          </button>
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
            aria-expanded="false"
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
      </div>
      
      <div className="container pt-2 d-flex justify-content-center">
        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit}>
          Enviar
        </button>
      </div>
      <div className="container pt-5 d-flex justify-content-center">
        <img src="https://www.google.com/maps/vt/data=9-vFr39yIfHtm7b0Jg4x_dYsFtJOlx1Gtjfe9ekL3xu4axrueV0686kJuG0Q34gDGfrnIGbtyI1-bDm1ZhnAlum_cd0wymSBwt7G4nAKteGt_Bn8Y4voGdGLEoF9S5aNU2YqhpY-jPKsvC9PJWJ4Z6nJkQvoEGJ1ho1ubZCIFlv-jWl0JnANlLKtAYh9T_sfiVoZaUS3-gRYfyiipCFwjxd8hu65hWjv7YfiLtE29s_VgCQIu-g" alt="Mapa provisional" />
      </div>

      <div className="container pt-4">
        <Card />
      </div>
      
    </div>
  );
};
