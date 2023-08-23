import axios from "axios"
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			productores: [],
			nombre_producto: [],
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

			registro: async (nombre, apellido, password, email, direccion, telefono, codigo_postal, comunidad_autonoma_id, provincia_id) => {

				try {

					let data = await axios.post('https://ideal-spoon-pxgr5jxjr96c4x9-3001.app.github.dev/api/registro',{
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
