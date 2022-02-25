import { CssBaseline, Container, Typography, Button } from '@mui/material'
import { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addComment } from '../../redux/actions/post'

const AddComment = ({ addComment, post_id, auth }) => {

    const [text, setText] = useState('')

    const handleChange = e => {
        setText(e.target.value)
    }


    const onsubmit = e => {
        e.preventDefault()
        console.log(text)
        const data = { text }
        addComment(post_id, data)
        setText('')
    }

    return (
        <>
            <CssBaseline />
            {
                !auth.isAuthenticated || auth.loading ? (
                    <div>
                        <Typography variant="h6" style={{ marginLeft: "20px" }} >
                            <Link to="/login" style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }} >
                                Login
                            </Link> to add a comment
                        </Typography>
                    </div>
                ) : (
                    <Container className="comment-container" maxWidth="md" style={{ marginTop: "20px" }} >
                        <Typography variant="h5" style={{ fontWeight: "bold" }} >
                            Add Comment
                        </Typography>
                        <form onSubmit={e => onsubmit(e)} style={{ display: "flex", flexDirection: "column" }} >
                            <textarea onChange={e => handleChange(e)} style={{ padding: "5px", width: "100%", fontSize: "20px", height: "70px", marginTop: "10px", resize: "none" }} type="text" required placeholder="Text" value={text} />
                            <Button type="submit" style={{ backgroundColor: "rgba(0,0,0,0.8)", color: "white", marginBottom: "10px", width: "10%" }} >Add</Button>
                        </form>
                    </Container>
                )
            }

        </>

    )
}

export default connect(null, { addComment })(AddComment)