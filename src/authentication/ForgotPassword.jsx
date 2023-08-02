import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import "./authstyle/ForgotPassword.css"
export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const changeEmail = (e) => {
        emailRef.current = e.target.value
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }

        setLoading(false)
    }

    return (
        <>
        <div className="background">
            <div className="center">
                <div className="card">
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="title">
                        <h3>Password Reset</h3>
                    </div>
                    {error && <div className="error">{error}</div>}
                    {message && <div className="success">{message}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="text-field">
                                <label className="email">Email: <input type="text" onChange={(e) => changeEmail(e)} />
                                </label>
                            </div>
                            <button type="submit">Reset Password</button>
                        </form>
                        <div>
                            <Link to="/login">Login</Link>
                        </div>
                    <div>
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
            {/* <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} style={{ marginBottom: "1em" }} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Reset Password
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
            </Card> */}
        </>
    )
}
