import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import logo from "../assets/logo.png"

export default function Sidemenu() {
    const router = useRouter()
    const currentPath = router.pathname
    const menus = [
        {
            name: "Presensi",
            icon: "",
            path: "/presence",
        },
        {
            name: "Divisi",
            icon: "",
            path: "/division",
        },
        {
            name: "Karyawan",
            icon: "",
            path: "/user",
        },
    ]

    const isInRoute = (path, current) => {
        const r = current.split("/")
        return "/" + r[1] === path
    }

    return (
        <div className="flex bg-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-around">
                <div className="w-64 h-screen relative">
                    <div className="flex items-center justify-center mt-10 px-8 w-48">
                        <Image src={logo} alt="Logo" />
                    </div>
                    <nav className="mt-10">
                        {menus.map((i, index) => (
                            <Link key={"menu" + index} href={i.path}>
                                <a
                                    className={`flex items-center py-4 px-4 hover:bg-gray-200 ${
                                        isInRoute(i.path, currentPath) &&
                                        "pl-2 bg-gray-200 text-primary border-l-8 border-primary"
                                    }`}
                                >
                                    <span
                                        className={`mx-4 ${
                                            isInRoute(i.path, currentPath) &&
                                            "font-bold"
                                        }`}
                                    >
                                        {i.name}
                                    </span>
                                </a>
                            </Link>
                        ))}
                    </nav>

                    <div className="absolute bottom-0 left-0 right-0">
                        <a
                            className="flex w-full items-center bg-gray-600 hover:bg-gray-800"
                            href="/logout"
                            onClick={(e) => {
                                e.preventDefault()
                                router.replace("/")
                                localStorage.clear()
                            }}
                        >
                            <div className="flex items-center py-4 px-8 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span className="mx-4 font-medium">Logout</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
