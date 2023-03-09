import React, {useState, useEffect} from "react";
import TareasComponent from "./tareasComponent.jsx";
import AddTareas from "./addTareas.jsx";
//create your first component
const endPoint = "https://assets.breatheco.de/apis/fake/todos/user/mortiz";

const Home = () => {
	
	const [state, setState] = useState([]);

	/*
	 * Metodo GET con async await 
	 */
	async function fetchData(){
		const response = await fetch(endPoint, {method: "GET"}); // --> A por la Data --> {Especificar el metodo}
		const dataDelResponse = await response.json(); //--> Data a Json
		setState(dataDelResponse);
	}

	/*
	 * Metodo PUT con fetch 
	 */
	function putData(tarea){
		const request = fetch(endPoint, {
			method: "PUT",
			headers:{"Content-Type":"application/json"},
			body: JSON.stringify([
				...state,
				{
					"label": tarea.toString(),
					"done": false
				}
			]),
			redirect: "follow"
		})
		.then(req => {
			if(req.ok){
				console.log("SUCCESS: ", req)
			}else{
				throw Error(req.statusText)
			}
		})
		.catch(error => console.error(error))
	}

	useEffect(() => {
		fetchData()
	})
	
	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Hello Mike!</h1>
			<AddTareas putData={putData}/>
			{
				state.map((tarea, key) => <TareasComponent label={tarea.label} key={key} />)
			}
		</div>
	);
};

export default Home;
