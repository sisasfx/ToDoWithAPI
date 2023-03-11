import React from "react";

const TareasComponent = (props) => {

    const deleteOneItem = (id) => {
        props.deleteToDo(id)
    }

    return(
        <div className="containerTareas">
            <h5>{props.label}</h5>
            <h5 id="status">Status: {props.done.toString()}</h5>
            <button className="btn btn-success">Check</button>
            <button className="btn btn-danger" onClick={()=> deleteOneItem(props.id)}>Delete</button>
        </div>
        )
}

export default TareasComponent;