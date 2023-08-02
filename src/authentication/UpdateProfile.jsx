import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function UpdateProfile() {
    const emailRef = useRef()
    const userNameRef = useRef() 
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useNavigate()

    const changeEmail = (e) => {
        emailRef.current = e.target.value
    }

    const changeUsername = (e) => {
        userNameRef.current = e.target.value
    }

    const changePassword = (e) => {
        passwordRef.current = e.target.value
    }

    const changePassword2 = (e) => {
        passwordConfirmRef.current = e.target.value
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                history("/")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
        <div className="background">
            <div className="center">
                <div className="card">
                    <div className="title">
                        <h2>Update Profile</h2>
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
                            <label className="password">Password: <input type="password" onChange={(e) => changePassword(e)} />
                            </label>
                        </div>
                        <div className="text-field">
                            <label className="password-confirm">Confirm Password: <input type="password" onChange={(e) => changePassword2(e)} />
                            </label>
                        </div>
                        <button type="submit">Update</button>
                    </form>
                    <div>
                        <Link to="/">Cancel</Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
