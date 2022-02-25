import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getLoggedinUserProfile } from '../../redux/actions/profile'
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Container, Typography } from '@mui/material';
import './Dashboard.css'
import { Link } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import Education from '../Profile/Education/Education';
import Experience from '../Profile/Experience/Experience';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import LandscapeIcon from '@mui/icons-material/Landscape';
import MyPosts from '../Posts/MyPosts'

const Dashboard = ({ auth, profile, getLoggedinUserProfile }) => {

    useEffect(() => {
        getLoggedinUserProfile()
    }, [getLoggedinUserProfile])

    return (
        <>
            <CssBaseline />
            {
                profile.loading && profile.profile === null ? (
                    <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <CircularProgress style={{ color: "white" }} />
                    </div>
                ) : (
                    <>
                        <Container maxWidth="xl" style={{
                            color: "white",
                            marginTop: "30px"
                        }} >
                            <Container style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                // marginLeft: "38px"
                            }} className="dashboard"  >
                                <Typography variant="h2" style={{ marginLeft: "-5px", fontWeight: "bold", color: "rgba(255,255,0,0.9)" }} >
                                    Dashboard
                                </Typography>
                                <Typography variant="h5" style={{ marginTop: "10px", fontSize: "20px", fontWeight: "bold" }} >
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }} >
                                        <PersonOutlineIcon style={{ height: 30, width: 30 }} />
                                        <span>Welcome {auth.user && auth.user.name}</span>
                                    </div>
                                </Typography>
                                {
                                    profile.loading && (<>
                                        <CircularProgress style={{ color: "white" }} />
                                    </>)
                                }
                                {
                                    profile.profile === null ? (
                                        <>
                                            <Typography variant="p" style={{ marginTop: "20px" }}  >
                                                You don't have a profile. Create Now!!
                                            </Typography>
                                            <Link to="/create-profile" style={{ textDecoration: "none", color: "black" }} >
                                                <Button style={{ width: "100%" }}  >
                                                    Create Profile
                                                </Button>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "50px", marginBottom: "50px" }} >
                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginTop: "10px" }} >

                                                    <Link to={`/profile/${profile?.profile?.user._id}`} style={{ textDecoration: "none" }} >
                                                        <Button>
                                                            <InsertEmoticonIcon style={{ marginRight: "5px" }} />
                                                            Visit Profile
                                                        </Button>
                                                    </Link>
                                                    <Link to="/edit-profile" style={{ textDecoration: "none" }} >
                                                        <Button>
                                                            <EditIcon style={{ marginRight: "5px" }} />
                                                            Edit Profile
                                                        </Button>
                                                    </Link>
                                                    <Link to="/add-post" style={{ textDecoration: "none" }} >
                                                        <Button>
                                                            <LandscapeIcon style={{ marginRight: "5px" }} />
                                                            Add Post
                                                        </Button>
                                                    </Link>
                                                    <Link to="/add-education" style={{ textDecoration: "none" }} >
                                                        <Button>
                                                            <SchoolIcon style={{ marginRight: "5px" }} />
                                                            Add Education
                                                        </Button>
                                                    </Link>
                                                    <Link to="/add-experience" style={{ textDecoration: "none" }} >
                                                        <Button>
                                                            <WorkIcon style={{ marginRight: "5px" }} />
                                                            Add Experience
                                                        </Button>
                                                    </Link>

                                                </div>
                                                <MyPosts />
                                                <Education />
                                                <Experience />
                                            </div>
                                        </>
                                    )
                                }
                            </Container>
                        </Container>
                    </>
                )
            }
        </>
    )
};

const mapStateToProps = state => {
    const auth = state.auth
    const profile = state.profile
    return { auth, profile }
}

export default connect(mapStateToProps, { getLoggedinUserProfile })(Dashboard);
