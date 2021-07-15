import React from "react"
import HashLoader from "react-spinners/HashLoader"

function Loading() {
    return (
        <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-20 flex flex-col justify-center items-center">
            <HashLoader size="50" color="#1100BB" />
            <span className="text-md mt-4">Loading</span>
        </div>
    )
}

export default Loading
