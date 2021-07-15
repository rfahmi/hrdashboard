import React from "react"
import Image from "next/image"
import Link from "next/link"
import logo from "../assets/logo.png"

export default function Sidemenu() {
    return (
        <div className="flex bg-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-around">
                <div className="w-64 h-screen">
                    <div className="flex items-center justify-center mt-10 px-8">
                        <Image src={logo} alt="Picture of the author" />
                    </div>

                    <nav className="mt-10">
                        <Link href="/presence">
                            <div className="flex items-center py-2 px-8 bg-gray-200 text-primary">
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
                                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                <span className="mx-4 font-bold">Presensi</span>
                            </div>
                        </Link>

                        <Link href="/user">
                            <div className="flex items-center mt-5 py-2 px-8 hover:bg-gray-200">
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
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                                <span className="mx-4 font-medium">
                                    Karyawan
                                </span>
                            </div>
                        </Link>

                        <Link href="/division">
                            <div className="flex items-center mt-5 py-2 px-8 hover:bg-gray-200">
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
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                    />
                                </svg>
                                <span className="mx-4 font-medium">Divisi</span>
                            </div>
                        </Link>
                    </nav>

                    <div className="absolute bottom-0 my-10">
                        <Link href="/login">
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
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
