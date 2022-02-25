import { useEffect, useState } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { connect } from 'react-redux'
import { likePost, dislikePost, getPosts } from '../../redux/actions/post'
import { setAlert } from '../../redux/actions/alert'

const LikeDislike = ({ likePost, posts, auth, dislikePost, post_id, getPosts, setAlert }) => {

    console.log(posts)


    useEffect(() => {
        getPosts()
    }, [getPosts])


    return (
        <>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", marginLeft: "25px", gap: "10px" }} >

                <ThumbUpIcon style={{ height: "30px", width: "30px", cursor: "pointer", marginBottom: "10px", color: 'black' }} onClick={e => {
                    if (!auth.isAuthenticated || auth.loading) {
                        setAlert("Login to like the post", "error")
                        return;
                    }
                    likePost(post_id);
                }} />
                <ThumbDownIcon style={{ height: "30px", width: "30px", cursor: "pointer", marginBottom: "10px", color: "black" }} onClick={e => {
                    if (!auth.isAuthenticated || auth.loading) {
                        setAlert("Login to dislike the post", "error")
                        return;
                    }
                    dislikePost(post_id);
                }} />
            </div>
            <div>
                <span style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "4px", marginLeft: "25px" }} >
                    {posts?.posts?.filter(post => post._id == post_id)[0]?.likes.length} likes
                </span>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    const posts = state.posts
    return { posts }
}

export default connect(mapStateToProps, { likePost, dislikePost, getPosts, setAlert })(LikeDislike)