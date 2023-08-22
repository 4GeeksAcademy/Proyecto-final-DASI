import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {

			crearPerfil: (nombre_huerto, info, problemas, donde_encontrar) => {

				console.log(nombre_huerto, info, problemas, donde_encontrar);

				let response = axios.post('https://refactored-carnival-6jvv96qjv5gfxrp-3001.app.github.dev/api/perfil_productor', {
						nombre_huerto: nombre_huerto,
						info: info,
						problemas: problemas,
						donde_encontrar: donde_encontrar
				})
				.then((Response) => Response.json())
				.then((data)=>console.log(data))
				.catch((error)=>console.log(error))
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
