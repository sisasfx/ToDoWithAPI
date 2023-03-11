import React from "react";

const TareasComponent = (props) => {

    const deleteOneItem = (id) => {
        props.deleteToDo(id)
    }

    const checkOneItem = (id) => {
        props.checkItem(id)
    }

    return(
        <div className="containerTareas">
            <h5>{props.label}</h5>
            <h5 className={props.done ? "statusTrue" : "statusFalse"}>Status: {props.done.toString()}</h5>
            <button className="btn btn-success" onClick={() => checkOneItem(props.id)}>Check</button>
            <button className="btn btn-danger" onClick={()=> deleteOneItem(props.id)}>Delete</button>
        </div>
        )
}

export default TareasComponent;