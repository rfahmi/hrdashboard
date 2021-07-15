import React from "react"

export default function Card(props) {
    return (
        <div
            {...props}
            className="w-60 p-8 rounded-lg flex flex-col justify-center items-center text-sm font-light text-gray-900 bg-gray-200 border-4 border-white transition-all"
        >
            {props.children}
        </div>
    )
}
