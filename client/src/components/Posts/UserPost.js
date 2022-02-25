import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../../redux/actions/post'
import { useParams, Link } from 'react-router-dom'
import { CssBaseline, Container, Button, Typography, Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import './UserPost.css'
import PostCard from './PostCard'
import DeleteIcon from '@mui/icons-material/Delete';
import { removeComment } from '../../redux/actions/post'
import { editComment } from '../../redux/actions/post'
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#F0FFF0',
    // border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    textAlign: "center",
};


const UserPost = ({ posts, getPost, auth, removeComment, editComment }) => {

    const { post_id } = useParams()
    const [open, setOpen] = useState(false)
    const [commentData, setCommentData] = useState('')

    useEffect(() => {
        getPost(post_id)
    }, [getPost, post_id, posts.loading])

    const handleChange = e => {
        setCommentData(e.target.value)
    }

    const onsubmit = (e, comment_id) => {
        e.preventDefault()
        console.log(commentData, post_id, comment_id)
        const data = { text: commentData }
        editComment(post_id, comment_id, data)
        setOpen(false)
        // setText('')
    }

    return (
        <>
            <CssBaseline />
            {
                (posts.post == null || posts.loading) ? (
                    <div style={{ height: "90vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <CircularProgress style={{ color: "white" }} />
                    </div>
                ) : (<>
                    <Container className="user-post" maxWidth="xl" style={{ marginTop: "30px" }} >
                        <div style={{ display: "flex", gap: "20px" }} >
                            <Link to="/posts" style={{ textDecoration: "none" }} >
                                <Button>
                                    <ArrowBackIcon style={{ marginRight: "5px" }} />
                                    Back to Posts
                                </Button>
                            </Link>
                            {
                                auth.isAuthenticated && !auth.loading && auth.user._id === posts?.post?.user._id && (
                                    <>
                                        <Link to={`/edit-post/${post_id}`} style={{ textDecoration: "none" }} >
                                            <Button>
                                                <EditIcon style={{ marginRight: "5px" }} />
                                                Edit Post
                                            </Button>
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                        <PostCard posts={posts} post_id={post_id} auth={auth} />
                        <div style={{ height: "100%", width: "100%", margin: "auto" }} >
                            <Typography variant="h4" style={{ textAlign: 'center', color: "white", marginBottom: "20px" }} >
                                Comments ({posts?.post?.comments.length})
                            </Typography>
                            <div style={{ display: 'grid', gridTemplateColumns: "repeat(4,1fr)", rowGap: "20px", textAlign: "center", columnGap: "30px", marginBottom: "20px" }} >
                                {
                                    posts?.post?.comments.map(comment => {
                                        return (
                                            <>
                                                <div style={{ backgroundColor: "#E6E6FA", height: "200px", width: "350px", borderRadius: "15px" }} key={comment._id} >

                                                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginRight: "10px", marginBottom: "30px" }} >
                                                        <div style={{ fontSize: "20px", marginRight: "auto", marginLeft: "10px", marginTop: "16px", padding: "5px", borderRadius: "10px", backgroundColor: "#A52A2A", color: "white" }} >
                                                            {comment.name}
                                                        </div>

                                                        {
                                                            auth.isAuthenticated && !auth.loading && auth.user._id === comment.user && (
                                                                <>

                                                                    <div style={{ display: "flex", gap: "10px" }} >
                                                                        <Button onClick={() => {
                                                                            setOpen(true)
                                                                            setCommentData(comment.text)
                                                                        }} style={{ backgroundColor: "black", cursor: "pointer" }} >
                                                                            <EditIcon style={{ marginRight: "5px", color: "white" }} />
                                                                        </Button>
                                                                        <Button onClick={(e) => {
                                                                            removeComment(post_id, comment._id)
                                                                        }} style={{ backgroundColor: "black", cursor: "pointer" }} >
                                                                            <DeleteIcon style={{ marginRight: "5px", color: "white" }} />
                                                                        </Button>

                                                                    </div>

                                                                </>
                                                            )
                                                        }
                                                    </div>

                                                    <Typography variant="h5" style={{ fontWeight: "bold" }} >
                                                        {comment.text}
                                                    </Typography>
                                                </div>
                                                <Modal
                                                    open={open}
                                                    onClose={() => {
                                                        setOpen(false)
                                                    }}
                                                >
                                                    <Box sx={style}>
                                                        <Typography style={{ fontWeight: "bold" }} id="modal-modal-title" variant="h6" component="h2">
                                                            Edit comment
                                                        </Typography>
                                                        <form onSubmit={e => onsubmit(e, comment._id)} style={{ display: "flex", flexDirection: "column" }} >
                                                            <textarea onChange={e => handleChange(e)} style={{ padding: "5px", width: "100%", fontSize: "20px", height: "70px", marginTop: "10px", resize: "none" }} type="text" required placeholder="Text" value={commentData} />
                                                            <Button type="submit" style={{ backgroundColor: "rgba(0,0,0,0.8)", color: "white", width: "10%", margin: "auto", marginTop: "10px" }} >Edit</Button>
                                                        </form>
                                                    </Box>

                                                </Modal>
                                            </>


                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Container>

                </>)
            }
        </>
    )
}

const mapStateToProps = state => {
    const posts = state.posts;
    const auth = state.auth
    return { posts, auth }
}

export default connect(mapStateToProps, { getPost, removeComment, editComment })(UserPost)