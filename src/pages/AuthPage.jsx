import React, { useState, useEffect, useContext } from "react"
import { mainURL } from "../api"
import Loader from "../components/common/Loader"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useNotification } from "../hooks/notification.hook"

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const showNotif = useNotification()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    useEffect(() => {
        showNotif(error)
        clearError()
        //return () => {};
    }, [error, showNotif, clearError])

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request(`${mainURL}/api/auth/register`, "POST", {
                ...form,
            })
            showNotif(data.message)
        } catch (error) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request(`${mainURL}/api/auth/login`, "POST", {
                ...form,
            })
            auth.login(data.token, data.userId)
        } catch (error) {}
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className='row '>
            <div className='col s10 offset-s1'>
                {auth.isAuth && <strong>you authificated</strong>}
                <h1 className='white-text center '>Too long link!</h1>
                <div className='card  grey darken-4'>
                    <div className='card-content black-text '>
                        <span className='card-title white-text'>
                            Authtorize
                        </span>
                        <div>
                            <div className='input-field '>
                                <input
                                    id='email'
                                    type='text'
                                    className='validate white-text'
                                    name='email'
                                    onChange={changeHandler}
                                    value={form.email}
                                />
                                <label className='active' htmlFor='email'>
                                    Email
                                </label>
                            </div>
                            <div className='input-field'>
                                <input
                                    id='password'
                                    type='password'
                                    className='validate white-text'
                                    name='password'
                                    onChange={changeHandler}
                                    value={form.password}
                                />
                                <label className='active' htmlFor='password'>
                                    Password
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='card-action'>
                        <button
                            onClick={loginHandler}
                            className='btn orange darken-4'
                            style={{ marginRight: "10px" }}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={registerHandler}
                            className='btn grey darken-2'
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
