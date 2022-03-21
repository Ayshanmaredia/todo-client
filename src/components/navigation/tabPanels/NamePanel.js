import React from "react"
import { Input } from "../../../styles"

const NamePanel = ({ onKeyPress, tempName, setTempName }) => {
    return (
        <>
            <Input
                type="text"
                onKeyPress={(e) => onKeyPress(e)}
                defaultValue={tempName}
                onChange={(e) => setTempName(e.target.value)}
            />
        </>
    )
}

export default NamePanel