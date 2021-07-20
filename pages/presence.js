import router from "next/router"
import React, { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import Button from "../components/Button"
import ButtonCard from "../components/ButtonCard"
import InputMask from "../components/InputMask"
import Layout from "../components/Layout"
import Select from "../components/Select"
import SubTitle from "../components/SubTitle"
import Title from "../components/Title"
import { api } from "../config/api"
import Modal from "react-modal"
import moment from "moment"
import "moment/locale/id"

const presence = () => {
    const m = moment()
    const [data, setdata] = useState(null)
    const [loading, setloading] = useState(false)
    const [modalopen, setmodalopen] = useState(false)
    const [downloadyear, setdownloadyear] = useState(2021)
    const [downloadmonth, setdownloadmonth] = useState(1)
    const months = Array.from(Array(11)).map((_, index) => {
        let res = {
            value: m.month(index).format("M"),
            label: m.month(index).format("MMMM"),
        }
        return res
    })

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
                    year: downloadyear,
                    month: downloadmonth,
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
                link.setAttribute(
                    "download",
                    `Presence Report ${downloadyear}-${downloadmonth}.xlsx`
                )
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
            <Modal
                isOpen={modalopen}
                style={modalStyle}
                contentLabel="Example Modal"
            >
                <div className="modal-content py-4 text-left px-6">
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">Pilih Bulan</p>
                        <div
                            className="modal-close cursor-pointer z-50"
                            onClick={() => setmodalopen(false)}
                        >
                            <svg
                                className="fill-current text-black"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                            >
                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                            </svg>
                        </div>
                    </div>

                    <div>
                        <div style={{ marginBottom: 6 }}>
                            <Select
                                value={downloadyear}
                                onChange={(e) =>
                                    setdownloadyear(e.target.value)
                                }
                                options={[{ value: 2021, label: "2021" }]}
                            />
                        </div>
                        <div style={{ marginBottom: 6 }}>
                            <Select
                                value={downloadmonth}
                                onChange={(e) =>
                                    setdownloadmonth(e.target.value)
                                }
                                options={months}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            className="modal-close px-4 bg-primary p-3 rounded-lg text-white hover:bg-blue-900"
                            onClick={() =>
                                downloadReport().then(() => setmodalopen(false))
                            }
                        >
                            Download
                        </button>
                    </div>
                </div>
            </Modal>
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
                <ButtonCard onClick={() => setmodalopen(true)}>
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

const modalStyle = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    content: {
        width: "36%",
        padding: 0,
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
}

export default presence
