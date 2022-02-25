const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../modals/User')
const Profile = require('../modals/Profile')
const Post = require('../modals/Post')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/auth')


//register the user
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password should have minimum 5 characters').isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { name, email, password } = req.body

        var user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists!!' }] })
        }

        user = new User({
            name, email, password
        })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(
            payload,
            "secret",
            {
                expiresIn: 9239920
            },
            (error, token) => {
                if (error) {
                    throw error
                }
                res.json({ token })
            }
        )
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Server error" })
    }
})


//delete a user(and remove everything related to that user)
router.delete('/delete', authMiddleware, async (req, res) => {
    try {
        await Post.deleteMany({
            user: req.user.id
        })

        await Post.updateMany(
            {},
            {
                $pull: {
                    "likes": {
                        user: req.user.id
                    },
                    "dislikes": {
                        user: req.user.id
                    },
                    "comments": {
                        user: req.user.id
                    }
                }
            }
        )
        await Post.updateMany(
            {},
            {
                $pull: {
                    "comments.$[].likes": {
                        user: req.user.id
                    },
                    "comments.$[].dislikes": {
                        user: req.user.id
                    },
                    "comments.$[].replies": {
                        user: req.user.id
                    }
                }
            }
        )
        await Post.updateMany(
            {},
            {
                $pull: {
                    "comments.$[].replies.$[].likes": {
                        user: req.user.id
                    },
                    "comments.$[].replies.$[].dislikes": {
                        user: req.user.id
                    }
                }
            }
        )


        await Profile.deleteOne({
            user: req.user.id
        })

        res.json({ msg: "Everything related to the user has been deleted" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server error" })
    }
})

module.exports = router