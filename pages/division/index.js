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
    useEffect(() => {
        getData()
    }, [])
    return (
        <Layout loading={loading}>
            <Title text="Data Divisi" />
            <div className="grid grid-cols-4 gap-2">
                <Link href="/division/create">
                    <Card>
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
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        <span className="text-md">Tambah Baru</span>
                    </Card>
                </Link>
                {data &&
                    data.map((i, index) => (
                        <Card>
                            <span className="text-xl font-bold mb-4">
                                {i.name}
                            </span>
                            <div className="flex flex-row justify-around w-full">
                                <button
                                    className="bg-primary rounded-md px-4 py-1 text-white"
                                    onClick={() =>
                                        router.push({
                                            pathname: "/division/edit",
                                            query: { id: i._id },
                                        })
                                    }
                                >
                                    Edit
                                </button>
                                <button className="bg-red-500 rounded-md px-4 py-1 text-white">
                                    Hapus
                                </button>
                            </div>
                        </Card>
                    ))}
            </div>
        </Layout>
    )
}
