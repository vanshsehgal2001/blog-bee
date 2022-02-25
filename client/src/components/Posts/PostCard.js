import { CssBaseline, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LikeDislike from './LikeDislike';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddComment from './AddComment';

const tagcolors = [
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

const PostCard = ({ posts, auth, post_id }) => {
    console.log(posts)

    const [showMore, setShowMore] = useState(false)
    return (
        <>
            <CssBaseline />
            <div style={{ minHeight: "500px", width: "60%", margin: "70px auto", backgroundColor: "rgba(255,255,255,0.8)", marginBottom: "50px" }} >
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginRight: "10px", marginTop: "10px", gap: "10px" }} >
                    <div style={{ display: "flex", marginRight: "auto", padding: "10px", fontSize: "24px", gap: "5px", fontWeight: "bold" }} >
                        <div><AccountCircleIcon style={{ height: "35px", width: "35px" }} /></div>
                        <div >
                            {posts?.post?.user.name}
                        </div>
                    </div>
                    {
                        auth.isAuthenticated && !auth.loading && auth.user._id === posts?.post?.user._id && (<>


                            {/* <Typography variant="h6" style={{ fontSize: "20px", marginRight: "auto", marginLeft: "10px", padding: "3px", borderRadius: "10px" }} >
                                <span style={{ fontWeight: "bold" }} > </span>
                            </Typography> */}
                            <div style={{ display: "flex", gap: "10px" }} >
                                <Link style={{ textDecoration: "none" }} to={`/edit-post/${posts?.post?._id}`} >
                                    <Button style={{ background: "#5F9EA0" }} ><EditIcon style={{ color: "black" }} /></Button>
                                </Link>
                                <Button style={{ background: "#5F9EA0" }} ><DeleteIcon style={{ color: "black" }} /></Button>
                            </div>
                        </>)
                    }
                </div>



                <div style={{ textAlign: "center", width: "100%", height: "100%" }} >
                    <Typography variant="h4" style={{ marginTop: "40px", fontWeight: "bold" }} >
                        {posts?.post?.title}
                    </Typography>
                    {/* {
                    (post?.image==null || post?.image===' ') ? (null) : (<>
                        
                    </>)
                } */}
                    <img alt="" style={{ height: "65%", width: "90%", marginTop: "10px", borderRadius: "20px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} src={"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"} />
                </div>


                {
                    posts?.post?.tags?.length > 0 && <>
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: "20px", color: "black", marginTop: "20px" }} >
                            {
                                posts?.post?.tags.map(tag => {
                                    return (
                                        <div key={tag} style={{ fontWeight: "bold", fontSize: "15px", backgroundColor: tagcolors[Math.floor(Math.random() * tagcolors.length)], padding: "10px", borderRadius: "10px", marginBottom: "10px" }} >
                                            {tag}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                }
                <div style={{ width: "90%", marginLeft: "30px", marginTop: "10px" }} >
                    {
                        posts?.post?.description.length <= 120 ? (<>
                            <Typography variant="h6" style={{ fontWeight: "bold", paddingBottom: "10px" }} >
                                {posts?.post?.description}
                            </Typography>
                        </>) : (<>
                            <Typography variant="h6" style={{ fontWeight: "bold", paddingBottom: "10px" }} >
                                {
                                    showMore ? posts?.post?.description : posts?.post?.description.substring(0, 120)
                                }
                                <Button style={{ background: "#800000", fontSize: "10px", marginTop: 0, marginLeft: "2px", padding: 2, color: "white" }} onClick={() => setShowMore(!showMore)} >
                                    Read {showMore ? 'Less' : 'More'}
                                </Button>
                            </Typography>

                        </>)
                    }
                </div>
                <LikeDislike posts={posts} auth={auth} post_id={post_id} />
                <AddComment auth={auth} post_id={post_id} />
            </div >
        </>
    )
}

export default PostCard