import { useRouter } from "next/router"
import React, { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import Button from "../../../components/Button"
import Checkbox from "../../../components/Checkbox"
import Input from "../../../components/Input"
import Layout from "../../../components/Layout"
import Select from "../../../components/Select"
import Title from "../../../components/Title"
import { api } from "../../../config/api"

function edit() {
    const router = useRouter()
    const { id } = router.query
    const [division, setdivision] = useState(null)
    const [data, setdata] = useState({
        name: "",
        nik: "",
        division: "",
        isAdmin: false,
        password: "",
    })
    const [loading, setloading] = useState(false)
    const getData = useCallback(async () => {
        setloading(true)
        const token = localStorage.getItem("api_token")
        await api
            .get(`/user/${id}`, {
                headers: {
                    token,
                },
            })
            .then(async (res) => {
                setloading(false)
                if (res.data.success) {
                    res.data.data.password = ""
                    res.data.data.division = res.data.data.division._id
                    setdata(res.data.data)
                }
            })
            .catch((err) => {
                setloading(false)
                console.log(err)
            })
    })
    const getDivision = useCallback(async () => {
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
                    const d_init = { label: "--Pilih Divisi--", value: null }
                    let d = res.data.data.map((i) => {
                        return { label: i.name, value: i._id }
                    })
                    d.unshift(d_init)
                    setdivision(d)
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
            .put(`/user/${id}`, data, {
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
        id && getData() && getDivision()
    }, [id])
    return (
        <Layout loading={loading}>
            <Title text="Buat Karyawan" />
            <div className="flex flex-col mr-2 mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2">
                    NIK
                </label>
                <Input
                    id="nik"
                    type="text"
                    value={data?.nik}
                    onChange={(e) => setdata({ ...data, nik: e.target.value })}
                />
            </div>
            <div className="flex flex-col mr-2 mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2">
                    Nama Karyawan
                </label>
                <Input
                    id="name"
                    type="text"
                    value={data?.name}
                    onChange={(e) => setdata({ ...data, name: e.target.value })}
                />
            </div>
            <div className="flex flex-col mr-2 mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2">
                    Divisi
                </label>
                <Select
                    value={data?.division}
                    onChange={(e) =>
                        setdata({ ...data, division: e.target.value })
                    }
                    options={division && division}
                />
            </div>
            <div className="flex flex-col mr-2 mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2">
                    Password (Isi untuk mengubah)
                </label>
                <Input
                    id="password"
                    type="password"
                    value={data?.password}
                    onChange={(e) =>
                        setdata({ ...data, password: e.target.value })
                    }
                />
            </div>
            <div className="flex flex-row  mr-2 mb-4">
                <Checkbox
                    checked={data?.isAdmin}
                    onChange={(e) =>
                        setdata({ ...data, isAdmin: e.target.checked })
                    }
                    label="Admin Akses"
                />
            </div>
            <Button
                onClick={() => updateData()}
                disabled={!data.name || !data.division || !data.nik}
            >
                Simpan
            </Button>
        </Layout>
    )
}

export default edit
