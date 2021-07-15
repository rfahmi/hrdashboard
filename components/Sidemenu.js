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

    return (
        <div className="flex bg-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-around">
                <div className="w-64 h-screen">
                    <div className="flex items-center justify-center mt-10 px-8">
                        <Image src={logo} alt="Picture of the author" />
                    </div>
                    <nav className="mt-10">
                        {menus.map((i, index) => (
                            <Link href={i.path}>
                                <div
                                    className={`flex items-center py-4 px-4 ${
                                        currentPath === i.path &&
                                        "bg-gray-200 text-primary border-l-8 border-primary"
                                    }`}
                                >
                                    <span
                                        className={`mx-4 ${
                                            currentPath === i.path &&
                                            "font-bold italic"
                                        }`}
                                    >
                                        {i.name}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </nav>

                    <div className="absolute bottom-0 my-10">
                        <a
                            onClick={() => {
                                router.replace("/")
                                localStorage.clear()
                            }}
                        >
                            <div className="flex items-center py-2 px-8 text-gray-500 hover:text-gray-600">
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
