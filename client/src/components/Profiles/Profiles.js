import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getProfiles } from '../../redux/actions/profile'
import CssBaseline from '@mui/material/CssBaseline'
import CircularProgress from '@mui/material/CircularProgress';
import ProfileItem from './ProfileItem'
import { Typography } from '@mui/material';



const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {

    // console.log(profiles)

    useEffect(() => {
        getProfiles()
    }, [getProfiles])

    return (
        <>
            <CssBaseline />
            {
                loading && (<div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <CircularProgress style={{ color: "white" }} />
                </div>)
            }
            <div>
                <Typography style={{ color: "rgba(255,255,255,0.7)", textAlign: "center", marginTop: "40px" }} variant="h2">
                    User Profiles
                </Typography>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "40px", marginTop: "30px", marginBottom: "40px" }} >
                    {
                        profiles.map(profile => {
                            return (
                                <ProfileItem key={profile._id} profile={profile} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
};

const mapStateToProps = state => {
    const profile = state.profile
    return { profile }
}

export default connect(mapStateToProps, { getProfiles })(Profiles);
