import React, {useState, useEffect} from "react";
import TareasComponent from "./tareasComponent.jsx";
import AddTareas from "./addTareas.jsx";
import Footer from "./footer.jsx";
//create your first component
const endPoint = "https://assets.breatheco.de/apis/fake/todos/user/mortiz";

const Home = () => {
	
	const [state, setState] = useState([]);
	const [loading, setLoading] = useState(false)

	/*
	 * Metodo GET con async await 
	 */
	async function fetchData(){
		setLoading(true);
		const response = await fetch(endPoint, {method: "GET"}); // --> A por la Data --> {Especificar el metodo}
		const dataDelResponse = await response.json(); //--> Data a Json
		setLoading(false);
		setState(dataDelResponse);
	}
	/*
	 * Metodo PUT con fetch 
	 */
	function putData(tarea){
		 fetch(endPoint, {
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
				fetchData()
			}else{
				throw Error(req.statusText)
			}
		})
		.catch(error => console.error(error))
	}
	/*
	METODO DELETE USANDO PUT
	*/
	function deleteToDo(id){
		const copiaState = [...state]
		copiaState.splice(id,1)
		
		fetch(endPoint, {
			method: "PUT",
			headers:{"Content-Type":"application/json"},
			body: JSON.stringify(copiaState),
			redirect: "follow"
		})
		.then(req => {
			if(req.ok){
				console.log("SUCCESS: ", req)
				fetchData()
			}else{
				throw Error(req.statusText)
			}
		})
		.catch(error => console.error(error))
	}
	/**
	 * Check item on List
	 */
	function checkItem(id){
		console.log("Se viene un check", id)
		const copiaState = [...state];
		copiaState[id].done = !copiaState[id].done;

		fetch(endPoint, {
			method:"PUT",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify(copiaState),
			redirect: "follow"
		})
		.then(req => {
			if(req.ok){
				console.log("SUCCESS: ", req)
				fetchData()
			}else{
				throw Error(req.statusText)
			}
		})
		.catch(error => console.error(error))
	}
	useEffect(() => {
		fetchData()
	},[])
	
	return (
		<div className="text-center">
			<h1 className="mt-5">Hello Mike!</h1>
			<AddTareas putData={putData}/>
			
			<div className="tareasContainer">
				{
				loading ? <p>Loading...</p> :
			 		state.map((tarea, key) =>  <TareasComponent label={tarea.label} done={tarea.done} key={key} id={key} deleteToDo={deleteToDo} checkItem={checkItem}/>)
				}
			</div>
			<Footer/>
		</div>
	);
};

export default Home;
