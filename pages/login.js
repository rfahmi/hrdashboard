import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { toast } from "react-toastify"
import banner from "../assets/banner.jpg"
import logo from "../assets/logo.png"
import Input from "../components/Input"
import { api } from "../config/api"

export default function login() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const onLoginPressed = async (e) => {
        e.preventDefault()
        setLoading(true)
        await api
            .post("/user/login", {
                nik: e.target.nik.value,
                password: e.target.password.value,
            })
            .then(async (res) => {
                setLoading(false)
                if (res.data.success) {
                    router.push("/presence")
                    console.log(res)
                    localStorage.setItem("api_token", res.headers.token)
                    localStorage.setItem(
                        "user_data",
                        JSON.stringify(res.data.data)
                    )
                    toast.success(res.data.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else {
                    toast.error(res.data.message, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }
    return (
        <div className="flex flex-row flex-1 h-screen">
            <div
                className="w-2/3 h-screen bg-gray-500 relative"
                style={{
                    backgroundImage: `url('${banner.src}')`,
                    width: "100%",
                    backgroundPositionY: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            />
            <div className="flex flex-col w-1/3 h-full">
                <div className="flex flex-col h-full justify-center items-center">
                    <Image src={logo} width={200} height={30} />
                    <span className="mt-4">HR Dashboard</span>
                </div>
                <form className="flex flex-col" onSubmit={onLoginPressed}>
                    <div className="p-4">
                        <div className="mb-8">
                            <label className="block text-gray-700 text-md font-bold mb-2">
                                NIK
                            </label>
                            <Input id="nik" type="text" placeholder="nik" />
                        </div>
                        <div className="mb-8">
                            <label className="block text-gray-700 text-md font-bold mb-2">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="password"
                            />
                        </div>
                    </div>
                    <button className="flex flex-row justify-center items-center bg-primary w-full p-4 rounded-none font-bold text-white">
                        {loading ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="animate-spin h-7 w-7 text-white"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    className="opacity-25"
                                ></circle>
                                <path
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    className="opacity-75"
                                ></path>
                            </svg>
                        ) : (
                            <span className="text-lg">MASUK</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
