import React, { useEffect } from "react"
import router from "next/router"

export default function Home() {
    useEffect(() => {
        const token = localStorage.getItem("api_token")
        token ? router.push("/presence") : router.push("/login")
    }, [])
    return <div />
}
