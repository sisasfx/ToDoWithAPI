import React from "react";

const TareasComponent = (props) => {
    return(
        <div className="containerTareas">
            <h5>{props.label}</h5>
            <h5 id="status">Status: {props.done.toString()}</h5>
        </div>
        
        )
}

export default TareasComponent;