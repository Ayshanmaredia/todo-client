import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SideBarItem = styled.li({
    marginTop: '5px',
    padding: '10px 15px',
    fontSize: '16px',
    listStyle: 'none',
    cursor: 'pointer',
    ":hover": {
        backgroundColor: '#0d6efd',
        color: 'white'
    }
});

export const BurgerMenu = styled(FontAwesomeIcon)({
    fontSize: '20px',
    margin: '0 10px',
})