import React, { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Card from "../../components/Card"
import Layout from "../../components/Layout"
import Title from "../../components/Title"
import { api } from "../../config/api"

export default function division() {
    const router = useRouter()
    const [data, setdata] = useState(null)
    const [loading, setloading] = useState(false)
    const getData = useCallback(async () => {
        setloading(true)
        const token = localStorage.getItem("api_token")
        await api
            .get(`/division`, {
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
            .delete(`/division/${id}`, {
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
                text="Data Divisi"
                buttonLabel="Create"
                buttonClick={() => router.push("/division/create")}
            />
            <div className="grid grid-cols-4 gap-2">
                {data &&
                    data.map((i, index) => (
                        <Card key={"division" + index}>
                            <span className="text-xl font-bold mb-4">
                                {i.name}
                            </span>
                            <div className="flex flex-row justify-around w-full">
                                <button
                                    className="bg-primary rounded-md px-4 py-1 text-white"
                                    onClick={() =>
                                        router.push("/division/edit/" + i._id)
                                    }
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 rounded-md px-4 py-1 text-white"
                                    onClick={() => deleteData(i._id)}
                                >
                                    Hapus
                                </button>
                            </div>
                        </Card>
                    ))}
            </div>
        </Layout>
    )
}
