import { Link } from "react"
import Head from "next/head"

export default function Home() {
    return (
        <div>
            <Head>
                <title>HR Dashboard</title>
            </Head>

            <main>
                <Link href="/login">Login</Link>
            </main>
        </div>
    )
}
