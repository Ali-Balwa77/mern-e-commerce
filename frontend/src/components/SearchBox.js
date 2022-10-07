import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FromControl from "react-bootstrap/FormControl";
import { useNavigate } from "react-router";

export default function SearchBox()
{
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const submitHandler = (e) =>
    {
        e.preventDefault();
        navigate(query ? `/search/?query=${ query }` : "/search");
    };
    return (
        <Form className="d-flex mt-auto" onSubmit={ submitHandler }>
            <InputGroup>
                <FromControl
                    type="text"
                    name="q"
                    id="q"
                    onChange={ (e) => setQuery(e.target.value) }
                    placeholder="search products..."
                    aria-label="Search Products"
                    aria-describedby="button-search"
                ></FromControl>
                <Button variant="outline-primary" type="submit" id="button-search">
                    <i className="fas fa-search"></i>
                </Button>
            </InputGroup>
        </Form>
    );
}
