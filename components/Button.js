import React from "react"

export default function Button(props) {
    return (
        <button
            {...props}
            className="w-full px-5 py-3 rounded-lg text-sm font-medium text-white bg-primary hover:bg-blue-500 border-4 border-white transition-all"
        >
            {props.children.toUpperCase()}
        </button>
    )
}
