import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProfile } from '../../redux/actions/profile'
import { getRepos } from '../../redux/actions/profile'
import { connect } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Container, CssBaseline } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import './UserProfile.css'
import ProfileCard from './ProfileCard';

const UserProfile = ({ profile, auth, getProfile, getRepos }) => {

    const { user_id } = useParams()
    // console.log(user_id)
    // console.log(profile)
    // console.log(auth)

    useEffect(() => {
        getProfile(user_id)
        // console.log(profile?.profile?.githubUsername)
        getRepos(profile?.profile?.githubUsername)
        //eslint-disable-next-line
    }, [getProfile, profile?.profile?.githubUsername])


    return (
        <>
            <CssBaseline />
            {
                (profile.profile == null || profile.loading) ? (
                    <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <CircularProgress style={{ color: "white" }} />
                    </div>
                ) : (<>
                    <Container className="user-profile" maxWidth="xl" style={{ marginTop: "30px" }} >
                        <div style={{ display: "flex", gap: "20px" }} >
                            <Link to="/users" style={{ textDecoration: "none" }} >
                                <Button>
                                    <ArrowBackIcon style={{ marginRight: "5px" }} />
                                    Back to Profiles
                                </Button>
                            </Link>
                            {
                                auth.isAuthenticated && !auth.loading && auth.user._id === profile.profile.user._id && (
                                    <>
                                        <Link to="/edit-profile" style={{ textDecoration: "none" }} >
                                            <Button>
                                                <EditIcon style={{ marginRight: "5px" }} />
                                                Edit Profile
                                            </Button>
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                        <ProfileCard profile={profile} />
                    </Container>
                </>)
            }
        </>
    )
}

const mapStateToProps = (state) => {
    const profile = state.profile
    const auth = state.auth
    return { profile, auth }
}

export default connect(mapStateToProps, { getProfile, getRepos })(UserProfile)