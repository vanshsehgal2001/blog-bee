import React from 'react';
import CssBaseline from '@mui/material/CssBaseline'
import Card from '@mui/material/Card';
import { CardActionArea, CardContent, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
// import user from '../../assets/user.jpg'
import user from '../../assets/user1.jpg'
import { Link } from 'react-router-dom';

const skillcolors = [
    '#BC8F8F',
    '#DAA520',
    '#FFF8DC',
    '#A52A2A',
    '#8FBC8F',
    '#FFA500',
    '#FF6347',
    '#A0522D',
    '#9370DB',
    '#66CDAA'
]

const bgcolors = [
    '#FFFFE0',
    '#F0F8FF',
    '#98FB98',
    '#AFEEEE',
    '#E6E6FA',
    '#FAEBD7',
    '#FFB6C1',
    '#D8BFD8',
    '#FFFACD',
    '#FFDAB9',
    '#FFE4E1',
    '#FFA500'
]

const ProfileItem = ({ profile }) => {
    return (
        <>
            <CssBaseline />
            <Card sx={{ width: "30%", boxSizing: "border-box", textAlign: "center", borderRadius: "15px", boxShadow: "rgba(0,0,0,0.7) 0px 13px 27px -5px, rgba(0, 0, 0, 0.8) 0px 8px 16px -8px" }} >
                <CardActionArea style={{ background: bgcolors[Math.floor(Math.random() * bgcolors.length)] }} >
                    <CardMedia
                        component="img"
                        style={{ height: "70%", width: "70%", borderRadius: "100%", margin: "auto", marginTop: "10px", marginBottom: "10px" }}
                        image={(profile.image === '' || profile.image == null) ? user : profile.image}
                    />
                    {/* <div style={{ height: 15, width: "100%", borderBottom: "2px solid gray" }} ></div> */}
                    <CardContent>
                        <Typography style={{ fontSize: "25px" }} >
                            <span style={{ fontWeight: "bold", fontSize: "25px" }} >Name</span> : {
                                profile?.user?.name
                            }
                        </Typography>
                        <Typography style={{ fontSize: "25px" }} >
                            <span style={{ fontWeight: "bold", fontSize: "25px" }} >Gender</span> : {
                                profile?.gender
                            }
                        </Typography>
                        <Typography style={{ fontSize: "25px" }} >
                            <span style={{ fontWeight: "bold", fontSize: "25px" }} >Status</span> : {
                                profile?.status
                            }
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: "10px", color: "black", marginTop: "10px" }} >
                            {
                                profile?.skills.slice(0, 3).map(skill => {
                                    return (
                                        <div key={skill} style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "15px", backgroundColor: skillcolors[Math.floor(Math.random() * skillcolors.length)], padding: "10px", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }} >
                                            {skill}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div style={{ marginTop: "25px", marginBottom: "10px" }} >
                            <Link style={{ color: "white", textDecoration: "none", padding: "13px", background: "rgba(0,0,0,0.8)", borderRadius: "10px" }} to={`/profile/${profile?.user?._id}`} >
                                Visit Profile
                            </Link>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
};

export default ProfileItem;
