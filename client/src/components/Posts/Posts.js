import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../../redux/actions/post'
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';
import PostItem from './PostItem';

const Posts = ({ posts, getPosts }) => {

    useEffect(() => {
        getPosts()
    }, [getPosts])

    return (
        <>
            <CssBaseline />
            {
                posts.loading && (<div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <CircularProgress style={{ color: "white" }} />
                </div>)
            }
            <div>
                {
                    !posts.loading && posts.posts.length > 0 && (<>
                        <Typography style={{ color: "rgba(255,255,255,0.7)", textAlign: "center", marginTop: "40px" }} variant="h2">
                            Posts
                        </Typography>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "40px", marginTop: "30px", marginBottom: "40px" }} >
                            {
                                posts?.posts.map(post => {
                                    return (
                                        <PostItem key={post._id} post={post} />
                                    )
                                })
                            }
                        </div>
                    </>)
                }
            </div>
        </>
    )
}

const mapStateToProps = state => {
    const posts = state.posts
    return { posts }
}

export default connect(mapStateToProps, { getPosts })(Posts)