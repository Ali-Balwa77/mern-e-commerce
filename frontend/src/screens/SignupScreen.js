import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import { Store } from '../Store'
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../util";
import Button from "react-bootstrap/esm/Button";

export default function SignupScreen()
{
    const { search } = useLocation()
    const redirectUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectUrl ? redirectUrl : '/'

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { userInfo } = state
    const submitHandel = async (e) =>
    {
        e.preventDefault()
        try
        {
            if (password !== confirmPassword)
            {
                toast.error('Password do not match')
                return
            }
            const { data } = await axios.post('/api/users/signup', {
                name,
                email,
                password,
            })
            console.log(data)
            ctxDispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/')
        } catch (error)
        {
            toast.error(getError(error))
        }
    }
    useEffect(() =>
    {
        if (userInfo)
        {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])
    return (
        <Container className="small-container">
            <Helmet>
                <title>
                    Sign UP
                </title>
            </Helmet>
            <h1 className='my-3'>
                Sign Up
                </h1>
            <Form>
                <Form.Group className='mb-3' controlId="name">
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control required onChange={ (e) => setName(e.target.value) } />
                </Form.Group>
                <Form.Group className='mb-3' controlId="email">
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control type='email' required onChange={ (e) => setEmail(e.target.value) } />
                </Form.Group>
                <Form.Group className='mb-3' controlId="password">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type='password' required onChange={ (e) => setConfirmPassword(e.target.value) } />
                </Form.Group>
                <Form.Group className='mb-3' controlId="confirmPassword">
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control type='password' required onChange={ (e) => setPassword(e.target.value) } />
                </Form.Group>
                <div className='mb-3'>
                    <Button onClick={ submitHandel } type='submit'>
                        Sign Up
                    </Button>
                </div>
                <div className='mb-3'>
                    Already have an account?{ ' ' }
                    <Link to={ `/signin?redirect=${ redirect }` }>Sign In</Link>
                </div>
            </Form>
        </Container>
    )
}

