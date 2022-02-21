import React from 'react'

import { useRef, useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

import axios from '../api/axios';
import {Link} from 'react-router-dom'

import AuthContext from '../context/AuthProvider'

const LOGIN_URL = '/api/auth/login';

const Login = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const { setAuth, setUser } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');


    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: email, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setAuth(true);
            setUser(response.data.user)
            setEmail('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Nedostaje Email ili Lozinka');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            console.log(err)
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                    navigate(state?.path || "/")
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Prijava</h1>
                    <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <label htmlFor="password">Lozinka:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button className="loginbutton">Prijavi se</button>
                    </form>
                    <p>
                        Nisi korisnik?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <Link to='/registracija'>Registruj se</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login
