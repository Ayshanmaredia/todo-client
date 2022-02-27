import React from "react"
import { Input } from "../../../styles"

const NamePanel = ({ tempName, setTempName }) => {
    return (
        <>
            <Input
                type="text"
                defaultValue={tempName}
                onChange={(e) => setTempName(e.target.value)}
            />
        </>
    )
}

export default NamePanel