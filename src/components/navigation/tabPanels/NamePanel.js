import React from "react"
import { SearchInput } from "../../../styles"

const NamePanel = ({ tempName, setTempName }) => {
    return (
        <>
            <SearchInput
                type="text"
                defaultValue={tempName}
                onChange={(e) => setTempName(e.target.value)}
            />
        </>
    )
}

export default NamePanel