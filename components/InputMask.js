import React from "react"
import NumberFormat from "react-number-format"

export default function Input(props) {
    return (
        <NumberFormat
            className="border rounded w-full text-lg p-4 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...props}
        />
    )
}
