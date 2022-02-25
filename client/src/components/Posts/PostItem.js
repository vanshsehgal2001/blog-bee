import React from 'react';
import CssBaseline from '@mui/material/CssBaseline'
import Card from '@mui/material/Card';
import { Button, CardActionArea, CardContent, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import clipContent from '../utils/ClipContent'
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

const PostItem = ({ post, auth, deletePost }) => {
    return (
        <>
            <CssBaseline />
            <Card sx={{ width: "30%", boxSizing: "border-box", textAlign: "center", borderRadius: "15px", boxShadow: "rgba(0,0,0,0.7) 0px 13px 27px -5px, rgba(0, 0, 0, 0.8) 0px 8px 16px -8px" }} >
                <CardActionArea style={{ background: bgcolors[Math.floor(Math.random() * bgcolors.length)] }} >
                    {
                        auth.isAuthenticated && !auth.loading && auth.user._id === post.user._id && (<>
                            <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "10px", marginTop: "10px" }} >
                                <Link style={{ textDecoration: "none" }} to={`/edit-post/${post._id}`} >
                                    <Button><EditIcon style={{ color: "black" }} /></Button>
                                </Link>
                                <Button onClick={() => deletePost(post._id)} ><DeleteIcon style={{ color: "black" }} /></Button>
                            </div>
                        </>)
                    }

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
};

const mapStateToProps = state => {
    const auth = state.auth
    return { auth }
}

export default connect(mapStateToProps, { deletePost })(PostItem);
