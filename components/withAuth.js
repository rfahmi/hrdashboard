import React, { useEffect } from "react"

function withAuth({ Component, pageProps }) {
    useEffect(() => {
        const token = localStorage.getItem("api_token")
        token ? router.push("/presence") : router.push("/login")
    }, [])
    return (
        <>
            <ToastContainer />
            <Component {...pageProps} />
        </>
    )
}

export default withAuth
