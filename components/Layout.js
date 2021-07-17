import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Loading from "./Loading"
import Sidemenu from "./Sidemenu"

export default function Layout(props) {
    const [authenticated, setauthenticated] = useState(false)
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem("api_token")
        !token ? router.replace("/login") : setauthenticated(true)
    }, [])
    return (
        <div className="flex w-full">
            {authenticated && (
                <>
                    <Sidemenu />
                    <div className="w-full p-8 relative">
                        {props?.loading && <Loading />}
                        {props.children}
                    </div>
                </>
            )}
        </div>
    )
}
