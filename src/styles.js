import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SideBarItem = styled.li({
    padding: '7px 15px',
    fontSize: '16px',
    listStyle: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    ":hover": {
        backgroundColor: '#ECECEF'
    }
});

export const BurgerMenu = styled(FontAwesomeIcon)({
    fontSize: '20px',
    margin: '0 10px',
});

export const Input = styled.input({
    marginRight: '10px',
    width: '100%',
    display: 'block',
    padding: '7px 12px',
    fontSize: '16px',
    fontWeight: '400',
    backgroundColor: '#faf9fa',
    lineHeight: '1.5',
    borderRadius: '4px',
    border: '1px solid gray',
    ":focus": {
        backgroundColor: '#fff'
    },
    ":focus-visible": {
        outline: 'none'
    }
});

export const MembersList = styled.ul({
    listStyle: 'none',
    margin: '0',
    padding: '0'
});

export const MembersName = styled.li({
    backgroundColor: '#f8f9fa',
    marginTop: '3px',
    padding: '5px 15px',
    fontSize: '16px'
});

export const CustomButtonDiv = styled.div({
    margin: '5px',
    display: 'inline-block',
});