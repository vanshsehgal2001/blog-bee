const express = require('express')
const connectMongoDB = require('./config/mongoDB')
const app = express()
const PORT = process.env.PORT || 8000
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const usersRoutes = require('./routes/users')
const postsRoutes = require('./routes/posts')


connectMongoDB()

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
// app.use(express.static('images'))


app.use('/posts', postsRoutes)
app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/profile', profileRoutes)

app.get('/', (req, res) => {
    res.send('Hey')
})


if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`)
})