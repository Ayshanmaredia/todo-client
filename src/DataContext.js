import React, { useContext, useState } from "react";

const DataContext = React.createContext();

export const useData = () => {
    return useContext(DataContext);
}

export const DataProvider = ({ children }) => {

    
    const [groups, setGroups] = useState([]);

    const [name, setName] = useState("");
    const [selectedOwner, setSelectedOwner] = useState();

    const getName = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();

            setName(parseRes.name);

        } catch (err) {
            console.error(err.message);
        }
    };

    const value = { selectedOwner, setSelectedOwner, getName, name, groups, setGroups };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )

}