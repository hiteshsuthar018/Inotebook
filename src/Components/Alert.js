import React from 'react'

function Alert(props) {
    const capatelized = (text)=>{
        if(text==="danger"){
          text="error";
        }
        const newText = text.toLowerCase();
        return newText.charAt(0).toUpperCase()+newText.slice(1);
    }
    return (
        <div style={{height:'57px'}}>
        {props.alert && <div>
            <div className={`alert alert-${props.alert.type}`} role="alert">
                {capatelized(props.alert.type)} : {props.alert.msg}
            </div>
        </div>}
        </div>
            
    )
}

export default Alert
