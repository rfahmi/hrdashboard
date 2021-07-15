import React from "react"

export default function ButtonCard(props) {
    return (
        <button
            {...props}
            className="w-60 p-8 rounded-lg flex flex-col justify-center items-center text-sm font-light text-gray-900 bg-gray-200 hover:bg-gray-100 focus:outline-none border-4 border-white transition-all"
        >
            {props.children}
        </button>
    )
}
