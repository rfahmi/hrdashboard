import React, { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import router from "next/router"
import Card from "../../components/Card"
import Input from "../../components/Input"
import Button from "../../components/Button"
import Layout from "../../components/Layout"
import Title from "../../components/Title"
import { api } from "../../config/api"
import { toast } from "react-toastify"

function create() {
    const [data, setdata] = useState({ name: "" })
    const [loading, setloading] = useState(false)
    const createData = useCallback(async () => {
        setloading(true)
        const token = localStorage.getItem("api_token")
        await api
            .post(`/division`, data, {
                headers: {
                    token,
                },
            })
            .then(async (res) => {
                setloading(false)
                if (res.data.success) {
                    router.back()
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
    return (
        <Layout loading={loading}>
            <Title text="Buat Divisi" />
            <div className="flex flex-col mr-2 mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2">
                    Nama Divisi
                </label>
                <Input
                    id="name"
                    type="text"
                    value={data?.name}
                    onChange={(e) => setdata({ ...data, name: e.target.value })}
                />
            </div>
            <Button onClick={() => createData()}>Simpan</Button>
        </Layout>
    )
}

export default create
