import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './EditPost.css'
import { connect } from 'react-redux'
import { editPost } from '../../../redux/actions/post'
import { getPosts } from '../../../redux/actions/post'
import { useParams } from 'react-router-dom'

const EditPost = ({ editPost, getPost, posts }) => {

    const navigate = useNavigate()
    const { post_id } = useParams()


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
        image: ''
    })

    const handleChange = e => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const { title, description, tags, image } = formData


    useEffect(() => {
        getPosts()
        if (!posts.loading) {
            const mypost = posts?.posts?.filter(post => post._id == post_id)[0]
            setFormData({
                title: !mypost.title ? '' : mypost.title,
                description: !mypost.description ? '' : mypost.description,
                image: !mypost.image ? '' : mypost.image,
                tags: !mypost.tags ? '' : mypost.tags,

            })
        }
    }, [posts.loading, getPosts])

    const onsubmit = async e => {
        e.preventDefault()
        const response = await editPost(formData, post_id)
        if (response === "Success") {
            return navigate('/dashboard')
        }
        // console.log(formData)
    }


    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm" className="post-container" >
                <Typography variant="h3" >
                    Edit Post
                </Typography>
                <form onSubmit={e => onsubmit(e)} style={{ display: "flex", flexDirection: "column", gap: "30px", alignItems: "center", paddingBottom: "40px" }} >
                    <TextField
                        type="text"
                        required
                        autoComplete="off"
                        label="Title"
                        name="title"
                        value={title}
                        onChange={e => handleChange(e)}
                    />
                    <TextField
                        label="Description"
                        required
                        multiline
                        rows={10}
                        value={description}
                        onChange={e => handleChange(e)}
                        name="description"
                    />
                    <TextField
                        placeholder="Tags (Comma separated)"
                        multiline
                        rows={2}
                        value={tags}
                        onChange={e => handleChange(e)}
                        name="tags"
                    />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", gap: "10px" }} >
                        <Button type="submit" >Update</Button>
                        <Button onClick={e => {
                            navigate(-1)
                        }} >Back</Button>
                    </div>
                </form>
            </Container>
        </>
    )
}

const mapStateToProps = state => {
    // if(post_id){

    // }
    const posts = state.posts
    return { posts }
}

export default connect(mapStateToProps, { getPosts, editPost })(EditPost)