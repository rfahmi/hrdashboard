import React from "react"

export default function Title(props) {
    return (
        <div className="text-3xl font-bold text-primary mb-8">
            {props.text}
            {props?.buttonLabel && (
                <button
                    className="ml-4 p-2 rounded-md text-white text-sm bg-primary "
                    onClick={props.buttonClick}
                >
                    {props.buttonLabel}
                </button>
            )}
        </div>
    )
}
