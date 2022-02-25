import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getMyPosts } from '../../redux/actions/post'
import { CssBaseline, Typography, CardActionArea, CardContent, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
// import PostItem from './PostItem';
import clipContent from '../utils/ClipContent'
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import { deletePost } from '../../redux/actions/post'

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

const bgcolors = [
    '#FFFFE0',
    '#F0F8FF',
    '#98FB98',
    '#AFEEEE',
    '#E6E6FA',
    '#FAEBD7',
    '#FFB6C1',
    '#D8BFD8'
]

const MyPosts = ({ getMyPosts, posts, deletePost }) => {

    useEffect(() => {
        getMyPosts()
    }, [getMyPosts])

    return (
        <>
            <CssBaseline />
            {
                posts.loading ? (<div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <CircularProgress style={{ color: "white" }} />
                </div>) : (
                    <div style={{ width: "100%" }} >
                        <Typography variant="h4" style={{ marginBottom: "20px" }} >
                            My Posts
                        </Typography>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", rowGap: "10px", columnGap: "30px", alignItems: "center" }} >
                            {
                                posts?.posts.map(post => {
                                    return (
                                        <>
                                            <Card sx={{ width: "100%", boxSizing: "border-box", textAlign: "center", borderRadius: "15px", boxShadow: "rgba(0,0,0,0.7) 0px 13px 27px -5px, rgba(0, 0, 0, 0.8) 0px 8px 16px -8px" }} >
                                                <CardActionArea style={{ background: bgcolors[Math.floor(Math.random() * bgcolors.length)] }} >

                                                    <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "10px", marginTop: "10px", gap: "10px" }} >
                                                        <Link style={{ textDecoration: "none" }} to={`/edit-post/${post._id}`} >
                                                            <Button style={{ backgroundColor: "rgba(0,0,0,0.9)" }} ><EditIcon style={{ color: "white" }} /></Button>
                                                        </Link>
                                                        <Button style={{ backgroundColor: "rgba(0,0,0,0.9)" }} onClick={() => deletePost(post._id)} ><DeleteIcon style={{ color: "white" }} /></Button>
                                                    </div>


                                                    {
                                                        (post.image === '' || post.image == null) ? null : (
                                                            <CardMedia
                                                                component="img"
                                                                style={{ height: "70%", width: "70%", borderRadius: "100%", margin: "auto", marginTop: "10px", marginBottom: "10px" }}
                                                                image={post.image}
                                                            />
                                                        )
                                                    }
                                                    {/* <div style={{ height: 15, width: "100%", borderBottom: "2px solid gray" }} ></div> */}
                                                    <CardContent>
                                                        <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "10px" }} >
                                                            {post?.title}
                                                        </Typography>
                                                        <Typography variant="h6" >
                                                            <span style={{ fontWeight: "bold" }} >By :</span> {post?.user?.name}
                                                        </Typography>
                                                        {
                                                            post?.tags.length > 0 && (<>
                                                                <Typography style={{ marginTop: "20px", fontWeight: "bold", fontSize: "18px" }} >
                                                                    Tags
                                                                </Typography>
                                                                <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: "20px", color: "black", marginTop: "10px", marginBottom: "30px" }} >
                                                                    {
                                                                        post?.tags.slice(0, 3).map(tag => {
                                                                            return (
                                                                                <div key={tag} style={{ fontWeight: "bold", fontSize: "15px", backgroundColor: tagcolors[Math.floor(Math.random() * tagcolors.length)], padding: "10px", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }} >
                                                                                    {tag}
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </>)
                                                        }
                                                        <Typography style={{ marginTop: "15px", fontSize: "15px", fontWeight: "bold", marginBottom: "40px" }} >
                                                            {post.description && clipContent(post?.description)}
                                                        </Typography>
                                                        <div style={{ marginTop: "25px", marginBottom: "10px" }} >
                                                            <Link style={{ color: "white", textDecoration: "none", padding: "13px", background: "rgba(0,0,0,1)", borderRadius: "10px", fontSize: "15px" }} to={`/post/${post?._id}`} >
                                                                Read Full Post
                                                            </Link>
                                                        </div>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }

        </>

    )
}

const mapStateToProps = state => {
    const posts = state.posts
    return { posts }
}

export default connect(mapStateToProps, { getMyPosts, deletePost })(MyPosts)