import { useRouter } from "next/router"
import React, { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import Button from "../../../components/Button"
import Input from "../../../components/Input"
import Layout from "../../../components/Layout"
import Title from "../../../components/Title"
import { api } from "../../../config/api"

function edit() {
    const router = useRouter()
    const { id } = router.query
    const [data, setdata] = useState({ name: "" })
    const [loading, setloading] = useState(false)
    const getData = useCallback(async () => {
        setloading(true)
        const token = localStorage.getItem("api_token")
        await api
            .get(`/division/${id}`, {
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
    const updateData = useCallback(async () => {
        setloading(true)
        const token = localStorage.getItem("api_token")
        await api
            .put(`/division/${id}`, data, {
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
    useEffect(() => {
        id && getData()
    }, [id])
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
            <Button onClick={() => updateData()}>Simpan</Button>
        </Layout>
    )
}

export default edit
