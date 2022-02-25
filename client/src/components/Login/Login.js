import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import './Login.css'
import { Button, TextField, Typography } from '@mui/material';
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/auth'


const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onchange = e => {
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        )
    }

    const onsubmit = e => {
        e.preventDefault()
        // console.log(formData)
        const user = {
            email, password
        }
        login(user)
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm" className="form-container" >
                <Typography variant="h4" >
                    Login
                </Typography>
                <form onSubmit={e => onsubmit(e)} style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "Center" }} >
                    <TextField type="email" autoComplete="off" label="Email" name="email" value={email} onChange={e => onchange(e)} />
                    <TextField type="password" autoComplete="off" label="Password" name="password" value={password} onChange={e => onchange(e)} />
                    <Button type="submit" >Login</Button>
                    <Typography style={{ color: "white" }} variant="h6" >
                        Don't have an account? <Link style={{ textDecoration: "none", color: "white", background: "rgba(0,0,0,0.5)", padding: "3px", borderRadius: "10px" }} to="/register" >Register</Link>
                    </Typography>
                </form>
            </Container>
        </>
    )
};

const mapStateToProps = (state) => {
    const isAuthenticated = state.auth.isAuthenticated
    return { isAuthenticated }
}

export default connect(mapStateToProps, { login })(Login);
