import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const changeEmail = (e) => {
        emailRef.current = e.target.value
    }

    const changeUsername = (e) => {
        userNameRef.current = e.target.value
    }

    const changePassword = (e) => {
        passwordRef.current = e.target.value
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch (error) {
            setError("Failed to create an account")
            console.log(error)
        }

        setLoading(false)
    }

    return (
        <>
        <div className="background">
            <div className="center">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="card">
                    <div className="title">
                        <h2>Signup</h2>
                    </div>
                    {error && <div className="error">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="text-field">
                            <label className="email">Email: <input type="text" onChange={(e) => changeEmail(e)} />
                            </label>
                        </div>
                        <div className="text-field">
                            <label className="username">Username: <input type="text" onChange={(e) => changeUsername(e)} />
                            </label>
                        </div>
                        <div className="text-field">
                            <label className="password">Password: <input type="text" onChange={(e) => changePassword(e)} />
                            </label>
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                    <div>
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </div>
            </div>
        </div>
            {/* <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} style={{ marginBottom: "1em" }} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} style={{ marginBottom: "1em" }} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} style={{ marginBottom: "1em" }} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </Card> */}
        </>
    )
}
