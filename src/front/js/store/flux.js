
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
			usuario: [],
			perfil: [],
			nombre_huerta: [],
			info_productor: "",
			info_productor_publico: "",
			is_productor: false,

			// perfil_productor:[],

			add_producto: [],

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

			respuesta_log: "",
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

			productos:[]

		},
		actions: {


			pedirPerfil: async (filters) => {
				try {
					let response = await axios.post(process.env.BACKEND_URL + "/api/perfil_productor_home", filters);
					setStore({ perfil: response.data.results });
					console.log(getStore());
					if (getStore().perfil.length !== 0) {
					} else {
						console.log("No hay ningún perfil de productor.");
					}


				} catch (error) {
					console.log(error);

				}
			},

			sincroToken: async () => {

				let token = localStorage.getItem("token")
				setStore({ token: token })
				setStore({ log: true })

			},



			crearPerfil: async (nombre, apellido, direccion, telefono, codigo_postal, comunidad_autonoma, provincia, nombre_huerta, problemas, donde_encontrar, descripcion) => {
				let user_id = localStorage.getItem("user_id")
				try {
					let data = await axios.post(process.env.BACKEND_URL + '/api/perfil_productor', {

						nombre: nombre,
						apellido: apellido,
						direccion: direccion,
						telefono: telefono,
						codigo_postal: codigo_postal,
						comunidad_autonoma: comunidad_autonoma,
						provincia: provincia,
						nombre_huerta: nombre_huerta,
						problemas: problemas,
						donde_encontrar: donde_encontrar,
						descripcion: descripcion,
						user_id: user_id
					})
					console.log("Perfil creado", data);
					setStore({ info_productor: data.data.results[1] })
					setStore({ is_productor: true })
					console.log(getStore().info_productor);


					return true


				} catch (error) {
					console.log(error);
				}

			},

			// ---------------------------------- OBTENER TODOS LOS PRODUCTORES -----------------------

			getPerfilProductor: async () => {
				const productorId = localStorage.getItem("productor_id");
				let productor = parseInt(productorId) - 1;
				try {
					let response = await axios.get(process.env.BACKEND_URL + "/api/crear_perfil")
					setStore({ perfil_productor: response.results })
					setStore({ info_productor: response.data.results[productor] })
					console.log(response);

				} catch (error) {
					console.log("Error loading message from backend", error)

				}
			},

			//----------------------------OBTENER INFORMACION PUBLICA DE PERFIL DE PRODUCTOR----------------------
			getInfoPublicaProductor: async (id) => {
				try {
					const response = await axios.get(process.env.BACKEND_URL + `/api/perfil/${id}`);
					const data = response.data;

					setStore({ info_productor_publico: data.result }); // Aquí corregido

					return data;
				} catch (error) {
					console.log("Error loading message from backend endpoint api", error);
				}
			},

			// -------------------------- OBTENER TODOS LOS PRODUCTOS (nombre) --------------------------

			getNombreProducto: async () => {
				try {
					const response = await axios.get(process.env.BACKEND_URL + "/api/producto");
					const data = response.data;

					setStore({ nombre_producto: data.results }); // Aquí corregido

					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			getProductosPorProductor: async (id) => {
				console.log(id);
				try {
					const response = await axios.get(process.env.BACKEND_URL + `/api/producto_by_productor/${id}`);
					const data = response.data;
					setStore({ productos: data.results });
					console.log(data);
					

					return data;
				} catch (error) {
					console.log("Error loading products by producer from backend", error);
				}
			},


			// -------------------------- AÑADIR PRODUCTO --------------------------

			newProduct: async (nombre, cantidad, unidad_medida, variedad, tipo_produccion, recogida, precio) => {
				let productor_id = getStore().info_productor.id

				console.log("productor id del flux", productor_id);
				try {

					let data = await axios.post(process.env.BACKEND_URL + '/api/producto', {
						nombre: nombre,
						cantidad: cantidad,
						unidad_medida: unidad_medida,
						variedad: variedad,
						tipo_produccion: tipo_produccion,
						recogida: recogida,
						precio: precio,
						productor_id: productor_id

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
				setStore({ is_productor: false })
				setStore({ info_productor:"" })
				// setStore({ nombre_producto: [] });
				localStorage.removeItem("token")
				localStorage.removeItem("user_id")

				return false
			},

			login: async (dataEmail, dataPassword) => {

				try {

					let data = await axios.post(process.env.BACKEND_URL + '/api/login', {

						email: dataEmail,

						password: dataPassword

					})

					localStorage.setItem("token", data.data.access_token)
					localStorage.setItem("user_id", data.data.user_id)

					setStore({ token: data.data.access_token })
					setStore({ info_productor: data.data.info_productor })
					setStore({ is_productor: data.data.productor })					

					return true;

				} catch (error) {

					console.log(error);


					error.response.status === 404 ? setStore({respuesta_log: error.response.data.msg }): null
					error.response.status === 401 ? setStore({respuesta_log: error.response.data.msg }): null


					return false;


				}
			},

			// -------------------------- PROFILE --------------------------

			getProfile: async () => {

				let token = localStorage.getItem("token")

				try {

					let data = await axios.get(process.env.BACKEND_URL + '/api/profile', {

						headers: {
							"Authorization": `Bearer ${token}`,
						}

					})


					setStore({ log: true })

					console.log(data);


					return true;

				} catch (error) {

					console.log(error);
					setStore({ log: false })

					return false;

				}
			},

			getProductor: async () => {

				try {

					let data = await axios.get(process.env.BACKEND_URL + '/api/get_productor')

					console.log(data)
					// setStore({ is_productor: data.data.productor })



					return true;

				} catch (error) {

					console.log(error);

					return false;

				}
			},

			// -------------------------- VALIDACIÓN TOKEN --------------------------


			validToken: async () => {

				let token = localStorage.getItem("token")

				try {

					//codigo exitoso

					let data = await axios.get(process.env.BACKEND_URL + '/api/validate', {

						headers: {

							"Authorization": `Bearer ${token}`,

						}

					})

					console.log(data);

					return true;

				} catch (error) {

					//manejar los errrores

					console.log(error);

					return false;

				}

			},

			// -------------------------- TODOS LOS USUARIOS --------------------------

			getUsuarios: async () => {

				try {

					const response = await axios.get(process.env.BACKEND_URL + "/api/users")

					let resultados = response.data.results
					setStore({ usuarios: resultados })

					const idArray = getStore().usuarios.map(item => item.id);

					setStore({ usuarios: idArray })

					console.log(getStore().usuarios);

					return response;
				} catch (error) {
					console.log("Error loading message from backend", error)

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
