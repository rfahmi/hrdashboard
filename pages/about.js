import Image from "next/image"
import { withRouter } from "next/router"
import React from "react"
import logo from "../assets/nusamandiri.png"
import Layout from "../components/Layout"

const about = () => {
    return (
        <Layout>
            <div className="flex flex-col h-full justify-center items-center">
                <Image src={logo} width={200} height={200} />

                <span className="text-xl font-medium m-4">
                    HR Dashboard v1.0.0
                </span>
                <span className="text-sm">
                    Nur M. R. Fahmi (11170625) - Universitas Nusa Mandiri
                </span>
            </div>
        </Layout>
    )
}

export default withRouter(about)
