import React from "react"
import { withRouter, useRouter } from "next/router"

const edit = () => {
    const router = useRouter()
    const { id } = router.query
    return <div>edit {id}</div>
}

export default withRouter(edit)
