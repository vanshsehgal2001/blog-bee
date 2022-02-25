import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import './Register.css'
import { Button, TextField, Typography } from '@mui/material';
import { Link, Navigate } from 'react-router-dom'
// import axios from 'axios'
import { connect } from 'react-redux'
import { setAlert } from '../../redux/actions/alert'
import { register } from '../../redux/actions/auth'

const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    })

    const { name, email, password, confirm_password } = formData

    const onchange = e => {
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        )
    }

    const onsubmit = async e => {
        e.preventDefault()
        console.log("fdf")
        if (password !== confirm_password) {
            // console.log("Passwords dont match")
            setAlert("Passwords don't match", 'error')
        }
        else {
            const user = {
                name, email, password
            }
            register(user)
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm" className="form-container" >
                <Typography variant="h4" >
                    Register
                </Typography>
                <form onSubmit={e => onsubmit(e)} style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center" }} >
                    <TextField type="text" autoComplete="off" label="Name" name="name" value={name} onChange={e => onchange(e)} />
                    <TextField type="email" autoComplete="off" label="Email" name="email" value={email} onChange={e => onchange(e)} />
                    <div style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center" }} >
                        <TextField type="password" autoComplete="off" label="Password" name="password" value={password} onChange={e => onchange(e)} />
                        <Typography variant="p" style={{ color: "white", alignSelf: "flex-start", marginLeft: "70px" }} >
                            * minimum 5 characters
                        </Typography>
                    </div>
                    <TextField type="password" autoComplete="new-password" label="Confirm Password" name="confirm_password" value={confirm_password} onChange={e => onchange(e)} />
                    <Button type="submit" >Register</Button>
                    <Typography style={{ color: "white" }} variant="h6" >
                        Already have an account? <Link style={{ textDecoration: "none", color: "white", background: "rgba(0,0,0,0.5)", padding: "3px", borderRadius: "10px" }} to="/login" >Login</Link>
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

export default connect(mapStateToProps, { setAlert, register })(Register);
