import React from 'react'

export default function AlertInfo(type, message) {
    return (
        <div className={"alert alert-dismissible alert-"+{type}}>
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            <p>{message}</p>
        </div>
    )
}
