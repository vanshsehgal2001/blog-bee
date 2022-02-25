import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css'
import { connect } from 'react-redux'
import { createPost } from '../../../redux/actions/post'

const CreatePost = ({ createPost }) => {

    const navigate = useNavigate()

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

    const onsubmit = async e => {
        e.preventDefault()
        const response = await createPost(formData)
        if (response === "Success") {
            return navigate('/dashboard')
        }
        // console.log(formData)
    }

    const { title, description, tags, image } = formData

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm" className="post-container" >
                <Typography variant="h3" >
                    Create Post
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
                        rows={3}
                        value={description}
                        onChange={e => handleChange(e)}
                        name="description"
                    />
                    <TextField
                        placeholder="Tags (Comma separated)"
                        multiline
                        rows={3}
                        value={tags}
                        onChange={e => handleChange(e)}
                        name="tags"
                    />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", gap: "10px" }} >
                        <Button type="submit" >Create</Button>
                        <Button onClick={e => {
                            navigate(-1)
                        }} >Back</Button>
                    </div>
                </form>
            </Container>
        </>
    )
}

export default connect(null, { createPost })(CreatePost)