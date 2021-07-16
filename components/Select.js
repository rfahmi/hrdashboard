import React from "react"

export default function Select({ options, onChange, value }) {
    return (
        <select
            onChange={onChange}
            className="border rounded w-full text-lg p-4 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
            {options &&
                options.map((i, index) => (
                    <option
                        value={i.value}
                        key={"select" + index}
                        selected={value === i.value}
                    >
                        {i.label}
                    </option>
                ))}
        </select>
    )
}
