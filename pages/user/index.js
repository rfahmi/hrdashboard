import router from "next/router"
import React, { useEffect, useState, useCallback } from "react"
import Layout from "../../components/Layout"
import Title from "../../components/Title"
import { api } from "../../config/api"

export default function user() {
    const [data, setdata] = useState(null)
    const [loading, setloading] = useState(false)
    const getData = useCallback(async () => {
        setloading(true)
        const token = localStorage.getItem("api_token")
        await api
            .get(`/user`, {
                headers: {
                    token,
                },
            })
            .then(async (res) => {
                setloading(false)
                if (res.data.success) {
                    setdata(res.data.data)
                }
            })
            .catch((err) => {
                setloading(false)
                console.log(err)
            })
    })
    const deleteData = useCallback(async (id) => {
        setloading(true)
        const token = localStorage.getItem("api_token")
        await api
            .delete(`/user/${id}`, {
                headers: {
                    token,
                },
            })
            .then(async (res) => {
                setloading(false)
                if (res.data.success) {
                    getData()
                    toast.success(res.data.message, {
                        position: "bottom-right",
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
                setloading(false)
                console.log(err)
            })
    })
    useEffect(() => {
        getData()
    }, [])

    return (
        <Layout loading={loading}>
            <Title
                text="Data Karyawan"
                buttonLabel="Create"
                buttonClick={() => router.push("/user/create")}
            />
            <div className="overflow-x-auto">
                <div className="flex w-full">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">NIK</th>
                                <th className="py-3 px-6 text-left">Nama</th>
                                <th className="py-3 px-6 text-left">Divisi</th>
                                <th className="py-3 px-6 text-left">Access</th>
                                <th className="py-3 px-6 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {data &&
                                data.map((i, index) => (
                                    <tr
                                        key={"usertr" + index}
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="font-medium">
                                                    {i.nik}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <span>{i.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <span>{i.division.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <span>
                                                    {i.isAdmin
                                                        ? "Admin"
                                                        : "General"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                <a
                                                    href="#edit"
                                                    onClick={() =>
                                                        router.push(
                                                            "/user/edit/" +
                                                                i._id
                                                        )
                                                    }
                                                    className="w-4 mr-2 transform hover:text-primary hover:scale-125"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                        />
                                                    </svg>
                                                </a>
                                                <a
                                                    href="#delete"
                                                    className="w-4 mr-2 transform hover:text-primary hover:scale-125"
                                                    onClick={() => {
                                                        if (
                                                            window.confirm(
                                                                "Apakah anda yakin akan mengapus karyawan " +
                                                                    i.name +
                                                                    "?"
                                                            )
                                                        ) {
                                                            deleteData(i._id)
                                                        }
                                                    }}
                                                >
                                                    <svg
                                                        className="text-red-500"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}
