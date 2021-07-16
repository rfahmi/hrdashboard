import React from "react"
import Loading from "./Loading"
import Sidemenu from "./Sidemenu"

export default function Layout(props) {
    return (
        <div className="flex w-full">
            <Sidemenu />
            <div className="w-full p-8 relative">
                {props?.loading && <Loading />}
                {props.children}
            </div>
        </div>
    )
}
