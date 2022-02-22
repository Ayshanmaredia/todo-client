import React, { useContext, useState } from "react";

const DataContext = React.createContext();

export const useData = () => {
    return useContext(DataContext);
}

export const DataProvider = ({ children }) => {

    const [groups, setGroups] = useState([]);
    const [user, setUser] = useState("");
    const [members, setMembers] = useState([]);
    const [selectedOwner, setSelectedOwner] = useState();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebarMobile = () => {
        setIsCollapsed(!isCollapsed)
    }

    const getUser = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_HOST_URL + "/dashboard", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();

            setUser(parseRes);

        } catch (err) {
            console.error(err.message);
        }
    };

  
    const groupMembersName = async () => {

        try {
            const response = await fetch(process.env.REACT_APP_HOST_URL + "/member/get-members", {
                method: "GET",
                headers: { "group_id": selectedOwner.owner_type_id, token: localStorage.token }
            });

            const parseRes = await response.json();

            setMembers(parseRes);

        } catch (err) {
            console.error(err.message)
        }
    }

    const getInviteDetails = async (inviteToken) => {

        try {
            const response = await fetch(process.env.REACT_APP_HOST_URL + "/invite", {
                method: "POST",
                headers: { invitetoken: inviteToken }
            })

            return response;

        } catch (err) {
            console.error(err.message);
        }
    }

    const value = { selectedOwner, setSelectedOwner, user, getUser, groups, setGroups, members, setMembers, groupMembersName, getInviteDetails, isCollapsed, toggleSidebarMobile };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )

}