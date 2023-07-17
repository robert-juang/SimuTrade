import React, { useRef, useState } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom" 
import './authstyle/Login.css' 

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const userNameRef = useRef() 
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const changeEmail = (e) =>{
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
        try {
            setError("") //set error 
            setLoading(true) //currently loading (to prevent repeated clicking maaking requests)
            await login(emailRef.current, passwordRef.current)
            navigate("/")
        } catch (error) {
            setError("Failed to log in")
        }
        setLoading(false)
    }

    return (
        <>
            <div className="center"> 
                <div className="card">
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="title">
                        <h2>SimuTrade</h2>
                        <div className="description">Simulate Markets and Trade RealTime!</div>
                    </div>
                    {error && <div className="error">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="text-field">
                            <label className="email">Email: <input type="text" onChange={(e) => changeEmail(e)}/> 
                            </label>
                        </div>
                        <div className="text-field">
                            <label className="username">Username: <input type="text" onChange={(e) => changeUsername(e)} /> 
                            </label>
                        </div>
                        <div className="text-field">
                            <label className="password">Password: <input type="password" onChange={(e) => changePassword(e)} /> 
                            </label>
                        </div>
                        <button type="submit">Log In</button>
                    </form>
                    <div>
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div>
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>

            {/* <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">TweetSpace</h2>
                    <div className="text-center mb-4">A better place to shitpost</div>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" style={{ marginTop: "1em", marginBottom: "1em" }}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="username" style={{ marginTop: "1em", marginBottom: "1em" }}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" ref={userNameRef} />
                        </Form.Group>
                        <Form.Group id="password" style={{ marginTop: "1em", marginBottom: "1em" }}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Log In
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
            </Card> */}
        </>
    )
}