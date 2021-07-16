import React from "react"
import { withRouter, useRouter } from "next/router"
import Image from "next/image"
import logo from "../assets/logo.png"
import moment from "moment"

const qr = () => {
    const router = useRouter()
    const { payload } = router.query
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <button
                className="absolute top-8 left-8"
                onClick={() => router.back()}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
            </button>
            <Image src={logo} width={200} height={30} />

            <img src={payload} className="h-80 m-8" />
            <span className="text-xl font-medium m-4">
                Silahkan scan QR diatas dengan aplikasi QRPresence
            </span>
            <span className="text-sm">
                Berlaku hingga{" "}
                {moment().endOf("day").format("YYYY-MM-DD H:mm:ss")}
            </span>
        </div>
    )
}

export default withRouter(qr)
