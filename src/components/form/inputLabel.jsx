import React from 'react'

export default function InputLabel(props) {
    return (
        <div className="form-group">
            {props.label && (<label htmlFor="">{props.label}</label>)}
            <input required={props.required} onChange={props.change} value={props.value} type={props.type} name={props.name} className="form-control" id="" placeholder={props.placeholder} />
        </div>
    )
}
