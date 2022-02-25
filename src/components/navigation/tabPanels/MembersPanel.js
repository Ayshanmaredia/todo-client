import React from "react"
import { useData } from "../../../DataContext";
import { MembersList, MembersName } from "../../../styles";

const MembersPanel = () => {

    const { user, members } = useData();

    return (
        <>
            <MembersList>
                {members.map((member, index) => (
                    <MembersName key={index}>{member.name === user.name ? "You" : member.name}</MembersName>
                ))}
            </MembersList>
        </>
    )
}

export default MembersPanel