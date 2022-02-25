const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    image: {
        type: String
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    dislikes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            name: {
                type: String
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            likes: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    }
                }
            ],
            dislikes: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    }
                }
            ],
            replies: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    },
                    text: {
                        type: String,
                        required: true
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    },
                    likes: [
                        {
                            user: {
                                type: mongoose.Schema.Types.ObjectId,
                                ref: 'user'
                            }
                        }
                    ],
                    dislikes: [
                        {
                            user: {
                                type: mongoose.Schema.Types.ObjectId,
                                ref: 'user'
                            }
                        }
                    ],
                }
            ]
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

const PostModel = mongoose.model('post', PostSchema)

module.exports = PostModel