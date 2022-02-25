const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const User = require('../modals/User')
const Profile = require('../modals/Profile')
const Post = require('../modals/Post')
const { check, validationResult } = require('express-validator')


//get logged in users posts
router.get('/my', authMiddleware, async (req, res) => {
    try {
        const posts = await Post.find({
            user: req.user.id
        })
        if (!posts) {
            return res.status(400).json({ msg: "No posts found" })
        }
        return res.json(posts)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
})

//get all posts
router.get('/all', async (req, res) => {
    try {
        const posts = await Post.find().sort({
            date: -1
        }).populate('user', '-password')
        res.json(posts)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
})

//get a post
router.get('/:post_id', async (req, res) => {
    try {
        const post = await Post.find({
            _id: req.params.post_id
        }).populate('user', '-password')
        res.json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
})





//get a user's posts
router.get('/:user_id', async (req, res) => {
    try {

        const user = await User.findOne({
            _id: req.params.user_id
        })

        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        }

        const posts = await Post.find({
            user: req.params.user_id
        })
        if (!posts) {
            return res.status(400).json({ msg: "No posts found" })
        }
        return res.json(posts)
    } catch (error) {
        console.log(error)
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: "User not found" })
        }
        return res.status(500).json({ msg: "Server error" })
    }
})


//create a post
router.post('/create', [authMiddleware, [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        title,
        description,
        tags,
        image
    } = req.body

    try {
        const user = await User.findOne({
            '_id': req.user.id
        }).select('-password')

        const post = new Post({
            title,
            description,
            image,
            user: req.user.id
        })

        if (tags) {
            post.tags = tags.split(',').map(tag => tag.trim())
        }

        await post.save()
        res.json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }

})


//update a post
router.put('/update/:post_id', [authMiddleware, [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        title,
        description,
        tags,
        image
    } = req.body

    var ntags = [];
    if (tags) {
        ntags = tags.split(',').map(tag => tag.trim())
    }

    try {

        var post = await Post.findOne(
            { _id: req.params.post_id }
        )

        if (!post) {
            return res.status(400).json({ msg: "Post not found" })
        }

        var userPost = {
            title,
            description,
            tags: ntags,
            image,
            user: post.user
        }

        post = await Post.findOneAndUpdate(
            { _id: req.params.post_id },
            {
                $set: userPost
            },
            { new: true }
        )
        res.json(post)
    } catch (error) {
        console.log(error)
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: "Post not found" })
        }
        return res.status(500).json({ msg: "Server error" })
    }

})


//delete a post
router.delete('/delete/:post_id', authMiddleware, async (req, res) => {
    try {
        var post = await Post.findOne({
            _id: req.params.post_id
        })
        if (!post) {
            return res.status(400).json({ msg: "Post not found" });
        }

        await Post.findOneAndRemove({
            _id: req.params.post_id
        })

        res.json(post)

    } catch (error) {
        console.log(error)
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: "Post not found" })
        }
        return res.status(500).json({ msg: "Server error" })
    }
})


//like a post
router.put('/like/:post_id', authMiddleware, async (req, res) => {
    try {

        const post = await Post.findOne({
            _id: req.params.post_id
        })

        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: "Post already been liked" })
        }

        post.likes.unshift({ user: req.user.id })

        // if (!post) {
        //     return res.status(400).json({ msg: "Post not found" })
        // }

        // let flag = post.likes.filter(like => like.user == req.user.id)
        // if (flag.length > 0) {
        //     return res.status(400).json({ msg: "Post already been liked" })
        // }

        // flag = post.dislikes.filter(dislike => dislike.user == req.user.id)

        // if (flag.length > 0) {
        //     let index = post.dislikes.findIndex(dislike => {
        //         return dislike.user == req.user.id
        //     })
        //     post.dislikes.splice(index, 1);
        // }

        await post.save()
        res.json(post.likes)

    } catch (error) {
        console.log(error)
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: "Post not found" })
        }
        return res.status(500).json({ msg: "Server error" })
    }
})


//dislike a post
router.put('/dislike/:post_id', authMiddleware, async (req, res) => {
    try {

        const post = await Post.findOne({
            _id: req.params.post_id
        })

        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: "Post not been liked yet" })
        }

        const index = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

        post.likes.splice(index, 1)

        // if (!post) {
        //     return res.status(400).json({ msg: "Post not found" })
        // }

        // let flag = post.dislikes.filter(dislike => dislike.user == req.user.id)
        // if (flag.length > 0) {
        //     return res.status(400).json({ msg: "Post already been disliked" })
        // }

        // flag = post.likes.filter(like => like.user == req.user.id)

        // if (flag.length > 0) {
        //     let index = post.likes.findIndex(like => {
        //         return like.user == req.user.id
        //     })
        //     post.likes.splice(index, 1);
        // }

        // post.dislikes.unshift({ user: req.user.id })
        await post.save()
        res.json(post.likes)

    } catch (error) {
        console.log(error)
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: "Post not found" })
        }
        return res.status(500).json({ msg: "Server error" })
    }
})


//add a comment
router.post('/comment/:post_id', [authMiddleware, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        text
    } = req.body


    try {

        let user = await User.findOne({
            _id: req.user.id
        })

        let post = await Post.findOne({
            _id: req.params.post_id
        })

        if (!post) {
            return res.status(400).json({ msg: "Post not found" })
        }

        const comment = {
            text,
            user: req.user.id,
            name: user.name
        }

        post.comments.push(comment)

        await post.save()
        res.json(post.comments)

    } catch (error) {
        console.log(error)
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: "Post not found" })
        }
        return res.status(500).json({ msg: "Server error" })
    }
})


//edit a comment
router.put('/comment/:post_id/:comment_id', [authMiddleware, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        text
    } = req.body


    try {

        let post = await Post.findOne({
            _id: req.params.post_id
        })

        if (!post) {
            return res.status(400).json({ msg: "Post not found" })
        }

        const comment = post.comments.find(comment => comment._id == req.params.comment_id)

        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" })
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorised" })
        }


        post = await Post.findOneAndUpdate(
            { _id: req.params.post_id, 'comments._id': req.params.comment_id },
            {
                $set: {
                    'comments.$.text': text
                },
            },
            { new: true }
        )
        res.json(post.comments)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
})



//delete a comment
router.delete('/comment/:post_id/:comment_id', authMiddleware, async (req, res) => {
    try {

        let post = await Post.findOne({
            _id: req.params.post_id
        })

        if (!post) {
            return res.status(400).json({ msg: "Post not found" })
        }

        const comment = post.comments.find(comment => comment._id == req.params.comment_id)

        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" })
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorised" })
        }

        let index = post.comments.findIndex(comment => {
            return comment._id.toString() === req.params.comment_id
        })
        post.comments.splice(index, 1);
        await post.save()
        res.json(post.comments)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
})



//like a comment
router.put('/likecomment/:post_id/:comment_id', authMiddleware, async (req, res) => {
    try {

        let post = await Post.findOne({
            _id: req.params.post_id
        })

        if (!post) {
            return res.status(404).json({ msg: "Post not found" })
        }

        const comment = post.comments.find(comment => comment._id == req.params.comment_id)
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" })
        }

        let flag = comment.likes.filter(like => like.user == req.user.id)
        if (flag.length > 0) {
            return res.status(400).json({ msg: "Comment already been liked" })
        }

        flag = comment.dislikes.filter(dislike => dislike.user == req.user.id)

        if (flag.length > 0) {
            let index = comment.dislikes.findIndex(dislike => {
                return dislike.user == req.user.id
            })
            comment.dislikes.splice(index, 1);
        }

        comment.likes.unshift({ user: req.user.id })
        await post.save()
        res.json(post)


    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
})



//dislike a comment
router.put('/dislikecomment/:post_id/:comment_id', authMiddleware, async (req, res) => {
    try {

        let post = await Post.findOne({
            _id: req.params.post_id
        })

        if (!post) {
            return res.status(404).json({ msg: "Post not found" })
        }

        const comment = post.comments.find(comment => comment._id == req.params.comment_id)
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" })
        }

        let flag = comment.dislikes.filter(dislike => dislike.user == req.user.id)
        if (flag.length > 0) {
            return res.status(400).json({ msg: "Comment already been disliked" })
        }

        flag = comment.likes.filter(like => like.user == req.user.id)

        if (flag.length > 0) {
            let index = comment.likes.findIndex(like => {
                return like.user == req.user.id
            })
            comment.likes.splice(index, 1);
        }

        comment.dislikes.unshift({ user: req.user.id })
        await post.save()
        res.json(post)


    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
})



//reply a comment
router.put('/replycomment/:post_id/:comment_id', [authMiddleware, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { text } = req.body


    try {

        let post = await Post.findOne({
            _id: req.params.post_id
        })

        if (!post) {
            return res.status(404).json({ msg: "Post not found" })
        }

        const comment = post.comments.find(comment => comment._id == req.params.comment_id)
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" })
        }

        const reply = {
            text,
            user: req.user.id
        }

        comment.replies.push(reply)
        await post.save()
        res.json(post)


    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
})


//like a reply
router.put('/likereply/:post_id/:comment_id/:reply_id', authMiddleware, async (req, res) => {
    try {

        let post = await Post.findOne({
            _id: req.params.post_id
        })

        if (!post) {
            return res.status(404).json({ msg: "Post not found" })
        }

        const comment = post.comments.find(comment => comment._id == req.params.comment_id)
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" })
        }

        const reply = comment.replies.find(reply => reply._id == req.params.reply_id)
        if (!reply) {
            return res.status(404).json({ msg: "Reply not found" })
        }

        let flag = reply.likes.filter(like => like.user == req.user.id)
        if (flag.length > 0) {
            return res.status(400).json({ msg: "Reply already been liked" })
        }

        flag = reply.dislikes.filter(dislike => dislike.user == req.user.id)

        if (flag.length > 0) {
            let index = reply.dislikes.findIndex(dislike => {
                return dislike.user == req.user.id
            })
            reply.dislikes.splice(index, 1);
        }

        reply.likes.unshift({ user: req.user.id })
        await post.save()
        res.json(post)


    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
})



//dislike a reply
router.put('/dislikereply/:post_id/:comment_id/:reply_id', authMiddleware, async (req, res) => {
    try {

        let post = await Post.findOne({
            _id: req.params.post_id
        })

        if (!post) {
            return res.status(404).json({ msg: "Post not found" })
        }

        const comment = post.comments.find(comment => comment._id == req.params.comment_id)
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" })
        }

        const reply = comment.replies.find(reply => reply._id == req.params.reply_id)
        if (!reply) {
            return res.status(404).json({ msg: "Reply not found" })
        }

        let flag = reply.dislikes.filter(dislike => dislike.user == req.user.id)
        if (flag.length > 0) {
            return res.status(400).json({ msg: "Reply already been disliked" })
        }

        flag = reply.likes.filter(like => like.user == req.user.id)

        if (flag.length > 0) {
            let index = reply.likes.findIndex(like => {
                return like.user == req.user.id
            })
            reply.likes.splice(index, 1);
        }

        reply.dislikes.unshift({ user: req.user.id })
        await post.save()
        res.json(post)


    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
})

module.exports = router