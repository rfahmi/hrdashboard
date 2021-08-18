import moment from "moment"
import "moment/locale/id"
import router from "next/router"
import React, { useCallback, useEffect, useState } from "react"
import Modal from "react-modal"
import { toast } from "react-toastify"
import Button from "../components/Button"
import ButtonCard from "../components/ButtonCard"
import InputMask from "../components/InputMask"
import Layout from "../components/Layout"
import Select from "../components/Select"
import SubTitle from "../components/SubTitle"
import Title from "../components/Title"
import { api } from "../config/api"
import DatePicker from "react-date-picker/dist/entry.nostyle"
import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"

const presence = () => {
    const m = moment()
    const [data, setdata] = useState(null)
    const [history, sethistory] = useState(null)
    const [loading, setloading] = useState(false)
    const [modalopen, setmodalopen] = useState(false)
    const [modalphotoopen, setmodalphotoopen] = useState(false)
    const [selectedhistory, setselectedhistory] = useState(null)
    const [downloadyear, setdownloadyear] = useState(2021)
    const [downloadmonth, setdownloadmonth] = useState(1)
    const [datepick, setdatepick] = useState(new Date())
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
    const getHistory = useCallback(async (d) => {
        setloading(true)
        const date = moment(d).format("YYYY-MM-DD")
        const token = localStorage.getItem("api_token")
        await api
            .get(`/presence/history/${date}`, {
                headers: {
                    token,
                },
            })
            .then(async (res) => {
                setloading(false)
                if (res.data.success) {
                    sethistory(res.data.data)
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
        getHistory(new Date())
    }, [])

    return (
        <Layout loading={loading}>
            <Title text="Presensi" />
            <Modal
                isOpen={modalphotoopen}
                style={modalStyle}
                contentLabel="Example Modal"
            >
                <div className="modal-content text-left">
                    <div className="flex justify-between items-center p-4">
                        <div>
                            <p className="text-xl font-bold">
                                {selectedhistory?.user?.name}
                            </p>
                            <p className="text-md">
                                {moment(selectedhistory?.timestamp)
                                    .utc(false)
                                    .format("YYYY-MM-DD HH:mm:ss")}
                            </p>
                        </div>
                        <div
                            className="modal-close cursor-pointer z-50"
                            onClick={() => setmodalphotoopen(false)}
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
                        <img
                            src={
                                "https://rfahmibucket.s3.amazonaws.com/" +
                                selectedhistory?.photo
                            }
                            width="100%"
                            height="auto"
                        />
                    </div>
                </div>
            </Modal>
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
            <SubTitle text="Tools" />
            <div className="flex flex-row justify-between mb-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-2">
                    <div>
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
                    <div>
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
                    <div>
                        <label className="block text-gray-700 text-md font-bold mb-2">
                            Jam Telat Masuk
                        </label>
                        <InputMask
                            id="jamTelatMasuk"
                            type="text"
                            format="##:##:##"
                            placeholder="HH:MM:SS"
                            mask={["H", "H", "M", "M", "SS", "SS"]}
                            value={data?.jamTelatMasuk}
                            onValueChange={(e) =>
                                setdata({
                                    ...data,
                                    jamTelatMasuk: e.value,
                                })
                            }
                        />
                    </div>
                    <div>
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

            <div className="flex items-center">
                <SubTitle text="Presensi Harian" />
                <DatePicker
                    onChange={(e) => {
                        setdatepick(e)
                        getHistory(e)
                    }}
                    value={datepick}
                    className="ml-4 mt-8 mb-4 bg-gray-50"
                />
            </div>
            <table className="min-w-max w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Nama</th>
                        <th className="py-3 px-6 text-left">Jenis Presensi</th>
                        <th className="py-3 px-6 text-left">Waktu</th>
                        <th className="py-3 px-6 text-left">Metode</th>
                        <th className="py-3 px-6 text-left">Foto</th>
                        <th className="py-3 px-6 text-left">Status</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {history &&
                        history.map((i, index) => (
                            <tr
                                key={"usertr" + index}
                                className="border-b border-gray-200 hover:bg-gray-100"
                            >
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">
                                            {i.user.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        {i.type === "in" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-green-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-red-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
                                                />
                                            </svg>
                                        )}
                                        <span className="ml-2">
                                            {i.type.toUpperCase()}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>
                                            {moment(i.timestamp)
                                                .utc(false)
                                                .format("HH:mm:ss")}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>
                                            {i.photo ? "Selfie" : "QR Scan"}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        {i.photo ? (
                                            <a
                                                onClick={() => {
                                                    setselectedhistory(i)
                                                    setmodalphotoopen(true)
                                                }}
                                            >
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
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                            </a>
                                        ) : (
                                            <span>-</span>
                                        )}
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>
                                            {i.type === "in" ? (
                                                i.isLate ? (
                                                    <div className="flex flex-shrink-0 text-xs items-center pr-2">
                                                        <div className="bg-red-200 text-red-900 px-2 py-1 rounded">
                                                            {"Terlambat " +
                                                                i.lateDurationMin +
                                                                " min"}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-shrink-0 text-xs items-center pr-2">
                                                        <div className="bg-green-200 text-green-900 px-2 py-1 rounded">
                                                            Tepat Waktu
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                "-"
                                            )}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
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
