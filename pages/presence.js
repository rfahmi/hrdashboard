import router from "next/router"
import React, { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import Button from "../components/Button"
import ButtonCard from "../components/ButtonCard"
import InputMask from "../components/InputMask"
import Layout from "../components/Layout"
import SubTitle from "../components/SubTitle"
import Title from "../components/Title"
import { api } from "../config/api"

export default function presence() {
    const [data, setdata] = useState(null)
    const [loading, setloading] = useState(false)

    const getSetting = useCallback(async () => {
        setloading(true)
        const token = localStorage.getItem("api_token")
        await api
            .get(`/setting`, {
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
    const updateSetting = useCallback(async () => {
        setloading(true)
        const token = localStorage.getItem("api_token")
        await api
            .put(`/setting`, data, {
                headers: {
                    token,
                },
            })
            .then(async (res) => {
                setloading(false)
                if (res.data.success) {
                    setdata(res.data.data)
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
    const downloadReport = useCallback(async () => {
        setloading(true)
        const token = localStorage.getItem("api_token")
        await api
            .post(
                `/presence/report`,
                {
                    year: 2021,
                    month: 6,
                },
                {
                    headers: {
                        token,
                    },
                    responseType: "arraybuffer",
                }
            )
            .then(async (res) => {
                setloading(false)
                const url = window.URL.createObjectURL(new Blob([res.data]))
                const link = document.createElement("a")
                link.href = url
                link.setAttribute("download", "file.xlsx") //or any other extension
                document.body.appendChild(link)
                link.click()
                toast.success("Download started!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
            .catch((err) => {
                setloading(false)
                console.log(err)
            })
    })

    const generateQR = useCallback(async () => {
        setloading(true)
        const token = localStorage.getItem("api_token")
        await api
            .get(`/presence/generateqr`, {
                headers: {
                    token,
                },
            })
            .then(async (res) => {
                setloading(false)
                router.push({
                    pathname: "/qr",
                    query: { payload: res.data.data.url },
                })
            })
            .catch((err) => {
                setloading(false)
                console.log(err)
            })
    })

    useEffect(() => {
        getSetting()
    }, [])

    return (
        <Layout loading={loading}>
            <Title text="Presensi" />
            <SubTitle text="Pengaturan Laporan" />
            <div className="flex flex-row justify-between mb-4">
                <div className="flex flex-col mr-2">
                    <label className="block text-gray-700 text-md font-bold mb-2">
                        Uang Makan
                    </label>
                    <InputMask
                        id="uangMakan"
                        type="text"
                        thousandSeparator
                        prefix={"Rp "}
                        value={data?.uangMakan}
                        onValueChange={(e) =>
                            setdata({ ...data, uangMakan: e.value })
                        }
                    />
                </div>
                <div className="flex flex-col mr-2">
                    <label className="block text-gray-700 text-md font-bold mb-2">
                        Denda Telat
                    </label>
                    <InputMask
                        id="dendaTelat"
                        type="text"
                        thousandSeparator
                        prefix={"Rp "}
                        value={data?.dendaTelat}
                        onValueChange={(e) =>
                            setdata({ ...data, dendaTelat: e.value })
                        }
                    />
                </div>
                <div className="flex flex-col mr-2">
                    <label className="block text-gray-700 text-md font-bold mb-2">
                        Kelipatan Telat
                    </label>
                    <InputMask
                        suffix={" Menit"}
                        id="kelipatanTelatMin"
                        type="text"
                        value={data?.kelipatanTelatMin}
                        onValueChange={(e) =>
                            setdata({
                                ...data,
                                kelipatanTelatMin: Number(e.value),
                            })
                        }
                    />
                </div>
            </div>
            <Button onClick={() => updateSetting()}>Simpan</Button>

            <SubTitle text="Unduh Laporan" />
            <div className="flex flex-row">
                <ButtonCard onClick={() => downloadReport()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                        />
                    </svg>
                    Download Excel
                </ButtonCard>

                <ButtonCard onClick={() => generateQR()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                        />
                    </svg>
                    Tampilkan QR
                </ButtonCard>
            </div>
        </Layout>
    )
}
