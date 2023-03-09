import React,{useState} from "react";

const AddTareas = ({putData}) => {

    const [state, setState] = useState("")

    const recordingTarea = (e) => {
        setState(e.target.value)
    }

    const addToDo = (e) => {
        console.log(state)
      if(e.keyCode === 13  && state.length > 2){
        console.log(state)
        putData(state)
        setState("")
      }      
    }

    return(
        <div className="form">
            <label>
                <h4>Introduce tarea...</h4>
            </label>
            <input className="form-control w-50" type="text" value={state} onChange={recordingTarea} onKeyDown={addToDo}></input>
        </div>
    )
}

export default AddTareas;