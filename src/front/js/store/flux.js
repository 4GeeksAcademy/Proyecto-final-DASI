
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
				"País Vasco": ["Vizcaya", "Guipúzcoa", "Álava"],
				"La Rioja": ["Logroño"],
				"Ceuta": ["Ceuta"],
				"Melilla": ["Melilla"],
			},
			productores: [],
			perfil: [],
			nombre_huerta: [],

			perfil_productor: [],

			nombre_producto: [],
			producto: {

				"nombre": ["Tomate", "Berenjena", "Pepino", "Lechuga", "Pimiento"],
				"cantidad": "",
				"unidad_medida": "",
				"lista": "",
				"variedad": "",
				"tipo_produccion": "",
				"recogida": "",
				"precio": "",
				"id": "",

			},


			log: false,
			token: "",

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

		},
		actions: {

			pedirPerfil: async (filters) => {
				try {
					let response = await axios.post(process.env.BACKEND_URL + "/api/perfil_productor_home", filters);
					setStore({ perfil: response.data.results });
					console.log(getStore());
					//if getStore().perfil.length != 0:  //agregar condicional para evitar error cuando no hay perfil creado
					console.log(getStore().perfil[0].nombre_huerta)


				} catch (error) {
					console.log(error);
				}
			},


			sincroToken: async () => {

				let token = localStorage.getItem("token")
				setStore({ token: token })
				setStore({ log: true })

			},



			crearPerfil: async (nombre, apellido, direccion, telefono, codigo_postal, comunidad_autonoma, provincia, nombre_huerta, problemas, donde_encontrar) => {
				try {
					let response = await axios.post(process.env.BACKEND_URL + '/api/perfil_productor', {

						nombre: nombre,
						apellido: apellido,
						direccion: direccion,
						telefono: telefono,
						codigo_postal: codigo_postal,
						comunidad_autonoma: comunidad_autonoma,
						provincia: provincia,
						nombre_huerta: nombre_huerta,
						problemas: problemas,
						donde_encontrar: donde_encontrar
					})
					// let data = await response.json();
					console.log("Perfil creado", response);
					setStore({perfil_productor: response.data})
					return true


				} catch (error) {
					console.log(error);
				}


				// console.log(nombre_huerta, info, problemas, donde_encontrar);

			},

			// -------------------------OBTENER TODOS LOS PERFILES PRODUCTOR --------------------------
			getPerfilProductor: async () => {

				try {
					let response = await axios.get(process.env.BACKEND_URL + "/api/perfil_productor")
					setStore({ perfil_productor: response.results })
					console.log(getStore());

				} catch (error) {
					console.log("Error loading message from backend", error)

				}
			},

			// -------------------------OBTENER UN PERFIL DE PRODUCTOR --------------------------

		


			// -------------------------- OBTENER TODOS LOS PRODUCTOS (nombre) --------------------------

			getNombreProducto: async () => {

				try {
					const data = await axios.get(process.env.BACKEND_URL + "/api/producto")
					// const data = await resp.json()
					setStore({ nombre_producto: data.nombre })

					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)

				}
			},
			// -------------------------- AÑADIR PRODUCTO --------------------------

			newProduct: async (nombre, cantidad, unidad_medida, variedad, tipo_produccion, recogida, precio) => {

				try {

					let data = await axios.post(process.env.BACKEND_URL + '/api/producto', {
						nombre: nombre,
						cantidad: cantidad,
						unidad_medida: unidad_medida,
						variedad: variedad,
						tipo_produccion: tipo_produccion,
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

			// -------------------------- EDITAR PRODUCTO--------------------------

			upDate: async (nombre, cantidad, unidad_medida, lista, variedad, recogida, precio, id) => {
				try {

					let data = await axios.put(process.env.BACKEND_URL + '/api/producto', {
						nombre: nombre,
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

			registro: async (username, password, email) => {

				try {



					let data = await axios.post(process.env.BACKEND_URL + '/api/registro', {
						username: username,
						password: password,
						email: email



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
				setStore({ log: false })

				return false
			},

			login: async (dataEmail, dataPassword) => {

				try {

					let data = await axios.post(process.env.BACKEND_URL + '/api/login', {

						email: dataEmail,

						password: dataPassword

					})

					console.log(data);

					localStorage.setItem("token", data.data.access_token)

					setStore({ token: data.data.access_token })


					return true;

				} catch (error) {

					console.log(error);

					return false;

				}
			},

			// -------------------------- PROFILE --------------------------

			getProfile: async () => {

				let token = localStorage.getItem("token")

				try {

					let data = await axios.get(process.env.BACKEND_URL + '/profile', {

						headers: {
							"Authorization": `Bearer ${token}`,
						}

					})

					const store = getStore();


					if (!store.token) setStore({ log: false })
					else setStore({ log: true })


					return true;

				} catch (error) {

					console.log(error);

					return false;

				}
			},


			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
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
