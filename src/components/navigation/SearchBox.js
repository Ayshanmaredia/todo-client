import React from 'react'
import { Form } from "react-bootstrap";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '../../styles';

const Search = styled.div({
    display: 'inline-flex',
    width: '100%'
});

const SearchButton = styled.button({
    width: '50px',
    border: '1px solid gray',
    backgroundColor: 'transparent',
    borderRadius: '4px',
    ":hover": {
        backgroundColor: '#ececef'
    },
    "@media (max-width: 768px)": {
        display: 'none'
    },
});

const SearchBox = ({ className, handleChange }) => {
    return (
        <Search>
            <Form className={className}>
                <Input
                    type="search"
                    placeholder="Search"
                    onChange={handleChange}
                />
                <SearchButton>
                    <FontAwesomeIcon icon="search" />
                </SearchButton>
            </Form>
        </Search>
    )
}

export default SearchBox