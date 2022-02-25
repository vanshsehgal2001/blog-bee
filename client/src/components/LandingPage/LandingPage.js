import React from 'react';
import './LandingPage.css'
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Typography } from '@mui/material';
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'


const LandingPage = ({ isAuthenticated }) => {


    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <div style={{ position: "relative", height: "100%", width: "100%" }} >
            <CssBaseline />
            <Typography variant="div" >
                <Typography variant="h3" style={{ color: "white", fontWeight: "bold" }} >
                    Connect people around the world
                </Typography>
                <Typography variant="h5" style={{ color: "white", marginTop: "20px" }}>
                    Create your own profile, share posts and connect with exciting people.
                </Typography>
                <div className="btns" >
                    <Link to="/register" style={{ textDecoration: "none" }}  >
                        <Button style={{ background: "lightgray", padding: "10px 20px 10px 20px", color: "black", fontWeight: "bold", fontSize: "15px" }}   >Register</Button>
                    </Link>
                    <Link to="/login" style={{ textDecoration: "none" }}  >
                        <Button style={{ background: "lightgray", padding: "10px 20px 10px 20px", color: "black", fontWeight: "bold", fontSize: "15px" }}  >Login</Button>
                    </Link>
                </div>
            </Typography>
        </div>
    )
};

const mapStateToProps = state => {
    const isAuthenticated = state.auth.isAuthenticated
    return { isAuthenticated };
}

export default connect(mapStateToProps)(LandingPage);
