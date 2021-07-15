import React from "react"

export default function Input(props) {
    return (
        <input
            className="border rounded w-full text-lg p-4 bg-gray-50 font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...props}
        />
    )
}
