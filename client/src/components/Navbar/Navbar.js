import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import './Navbar.css'
import blogbee from '../../assets/blogbee.jpg'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth'


const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    return (
        <>
            <CssBaseline />
            {
                loading ? null : (
                    <>
                        <Box sx={{ flexGrow: 1 }} >
                            <AppBar position="sticky" style={{ background: "transparent" }} elevation={10}>
                                <Container maxWidth="xl">
                                    <Toolbar disableGutters >
                                        <div className="container" >
                                            <div className="sub-container1" >
                                                <Link to="/" >
                                                    <img alt="" src={blogbee} />
                                                </Link>
                                                <Typography variant="h4"  >
                                                    <Link to="/" style={{ textDecoration: "none", color: "white" }} >
                                                        Blog Bee
                                                    </Link>
                                                </Typography>
                                            </div>
                                            {
                                                !loading && isAuthenticated ? (
                                                    <>
                                                        <div className="sub-container2">
                                                            <Typography variant="h5" >
                                                                <Link to="/users" style={{ textDecoration: "none", color: "white" }} >
                                                                    Users
                                                                </Link>
                                                            </Typography>
                                                            <Typography variant="h5" >
                                                                <Link to="/posts" style={{ textDecoration: "none", color: "white" }} >
                                                                    Posts
                                                                </Link>
                                                            </Typography>
                                                            <Typography variant="h5" >
                                                                <Link to="/" style={{ textDecoration: "none", color: "white" }} >
                                                                    Dashboard
                                                                </Link>
                                                            </Typography>
                                                            <Typography variant="h5" >
                                                                <Link onClick={() => {
                                                                    logout()
                                                                }} to="/" style={{ textDecoration: "none", color: "white" }} >
                                                                    Logout
                                                                </Link>
                                                            </Typography>
                                                        </div>
                                                    </>
                                                ) :
                                                    <>
                                                        <div className="sub-container2">
                                                            <Typography variant="h5" >
                                                                <Link to="/users" style={{ textDecoration: "none", color: "white" }} >
                                                                    Users
                                                                </Link>
                                                            </Typography>
                                                            <Typography variant="h5" >
                                                                <Link to="/posts" style={{ textDecoration: "none", color: "white" }} >
                                                                    Posts
                                                                </Link>
                                                            </Typography>
                                                            <Typography variant="h5" >
                                                                <Link to="/register" style={{ textDecoration: "none", color: "white" }} >
                                                                    Register
                                                                </Link>
                                                            </Typography>
                                                            <Typography variant="h5" >
                                                                <Link to="/login" style={{ textDecoration: "none", color: "white" }} >
                                                                    Login
                                                                </Link>
                                                            </Typography>
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                    </Toolbar>
                                </Container>
                            </AppBar>
                        </Box>
                    </>
                )
            }

        </>
    )
};

const mapStateToProps = (state) => {
    const auth = state.auth
    return { auth }
}

export default connect(mapStateToProps, { logout })(Navbar);
