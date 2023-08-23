
import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			communityData: {
				"Andalucía": ["Almería", "Cádiz", "Córdoba", "Granada", "Huelva", "Jaén", "Málaga", "Sevilla"],
				"Aragón": ["Huesca", "Teruel", "Zaragoza"],
				"Asturias": ["Oviedo"],
				"Baleares": ["Palma de Mallorca"],
				"Canarias": ["Santa Cruz de Tenerife", "Las Palmas de Gran Canaria"],
				"Cantabria": ["Santander"],
				"Castilla-La Mancha": ["Albacete", "Ciudad Real", "Cuenca", "Guadalajara", "Toledo"],
				"Castilla y León": ["Ávila", "Burgos", "León", "Salamanca", "Segovia", "Soria", "Valladolid", "Zamora"],
				"Cataluña": ["Barcelona", "Girona", "Lleida", "Tarragona"],
				"Comunidad Valenciana": ["Alicante", "Castellón de la Plana", "Valencia"],
				"Extremadura": ["Badajoz", "Cáceres"],
				"Galicia": ["La Coruña", "Lugo", "Orense", "Pontevedra"],
				"Madrid": ["Madrid"],
				"Murcia": ["Murcia"],
				"Navarra": ["Pamplona"],
				"País Vasco": ["Bilbao", "San Sebastián", "Vitoria"],
				"La Rioja": ["Logroño"],
				"Ceuta": ["Ceuta"],
				"Melilla": ["Melilla"],
			  },
			productores: [],

			nombre_producto:[],
			
			nombre: "",
			cantidad: "",
			unidad_medida: "",
			lista: "",
			variedad: "",
			recogida: "",
			precio: "",
			id: "",


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
			],
			log: false
		},
		actions: {


			crearPerfil: async (nombre_huerto, info, problemas, donde_encontrar) => {

				try {
					let response = await axios.post('https://refactored-carnival-6jvv96qjv5gfxrp-3001.app.github.dev/api/perfil_productor', {
						nombre_huerto: nombre_huerto,
						info: info,
						problemas: problemas,
						donde_encontrar: donde_encontrar
				})
					let data = await response.json();
					console.log(data);

				} catch (error) {
					console.log(error);
				}


				console.log(nombre_huerto, info, problemas, donde_encontrar);

			},



			// -------------------------- OBTENER TODOS LOS PRODUCTOS (nombre) --------------------------

			getNombreProducto: async() => {

				try{
					const resp = await axios.get(process.env.BACKEND_URL + "/api/producto")
					const data = await resp.json()
					setStore({ nombre_producto: data.nombre })

					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			// -------------------------- AÑADIR PRODUCTO --------------------------

			newProduct: async (nombre, cantidad, unidad_medida, lista, variedad, tipo, recogida, precio) => {

				try {

					let data = await axios.post(process.env.BACKEND_URL + '/api/producto',{
					nombre : nombre,
					cantidad: cantidad,
					unidad_medida: unidad_medida,
					lista: lista,
					variedad: variedad,
					recogida: recogida,
					precio: precio

					})

					console.log(data);

					return true;

				} catch (error) {

					console.log(error);

					return false;

				}
			},
			
			// -------------------------- REGISTRO --------------------------


			// -------------------------- EDITAR PRODUCTO--------------------------

			upDate: async (nombre, cantidad, unidad_medida, lista, variedad, recogida, precio, id) => {
				try {

					let data = await axios.put(process.env.BACKEND_URL + '/api/producto',{
					nombre : nombre,
					cantidad: cantidad,
					unidad_medida: unidad_medida,
					lista: lista,
					variedad: variedad,
					recogida: recogida,
					precio: precio

					})

					console.log(data);

					return true;

				} catch (error) {

					console.log(error);

					return false;

				}
			},

		
			registro: async (nombre, apellido, password, email, direccion, telefono, codigo_postal, comunidad_autonoma_id, provincia_id) => {

				try {

					let data = await axios.post('https://vigilant-goggles-ww97qrwr575hg776-3001.app.github.dev/api/registro',{
					nombre : nombre,
					apellido : apellido,
					password : password,
					email : email,
					direccion : direccion,
					telefono : telefono,
					codigo_postal : codigo_postal,
					comunidad_autonoma_id : comunidad_autonoma_id,
					provincia_id : provincia_id

					})

					console.log(data);

					return true;

				} catch (error) {

					console.log(error);

					return false;

				}
			},

		// -------------------------- LOG IN & LOG OUT --------------------------
		
			logout: () => {
				localStorage.removeItem("token")
				setStore({log:false})

				return false
			},

			login: async (dataEmail,dataPassword) => {

				try {

					let data = await axios.post(process.env.BACKEND_URL + '/api/login',{

						email:dataEmail,

						password:dataPassword

					})

					console.log(data);

					localStorage.setItem("token",data.data.access_token)

					setStore({token:data.data.access_token})

					return true;

				} catch (error) {

					console.log(error);

					return false;

				}
			},

			// -------------------------- PROFILE --------------------------

			getProfile: async () => {

				let token =localStorage.getItem("token")

				try {

					let data = await axios.get(process.env.BACKEND_URL + '/profile',{

						headers:{
							"Authorization": `Bearer ${token}`,						
						}

					})

					console.log(data);

					// localStorage.setItem("token",data.data.access_token)

					// setStore({token:data.data.access_token})
					setStore({log:true})

					return true;

				} catch (error) {

					console.log(error);
					setStore({log:false})


					return false;

				}
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
