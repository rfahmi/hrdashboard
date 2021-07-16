import React from "react"

export default function Checkbox({ onChange, label }) {
    return (
        <label onChange={onChange} className="flex justify-start items-start">
            <div className="cb border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-primary">
                <input type="checkbox" className="opacity-0 absolute" />
                <svg
                    className="fill-current hidden w-4 h-4 text-primary pointer-events-none"
                    viewBox="0 0 20 20"
                >
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
            </div>
            <div className="select-none">{label}</div>
        </label>
    )
}
