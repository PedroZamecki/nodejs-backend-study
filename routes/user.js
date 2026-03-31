const express = require('express')
const userRouter = express.Router()

// '/users' route
userRouter.get(
    '/', (
        req,
        res,
    ) => {
        console.log('Requesting data for users')
        res.send("Users data (TEST)")
    }
)

// '/users/:id' route
userRouter.get(
    '/:userId', (
        req,
        res,
    ) => {
        const { userId } = req.params
        console.log(`Request data for user: '${userId}'`);
        res.send(`Data for user '${userId}' (TEST)`)
    }
)

module.exports = userRouter;