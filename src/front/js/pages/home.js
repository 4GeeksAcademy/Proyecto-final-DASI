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

	

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
