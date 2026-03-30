const express = require('express');
const app = express()
const port = 3000

app.use( // app.use -> middleware that executes BEFORE the request given. works BEFORE all methods ("GET"/"POST"/"DELETE"/...)
    "/", (
        req, 
        res, 
        next
    ) => {
        console.log("Middleware function executed")
        // res.send("Anything") <- Be careful, if we send something in the middleware we SHOULDN'T SEND ANYTHING, therefore, no 'next()' should execute
        next() // function to CONTINUE the line of execution, for example, if there is a route that SHOULD be executed afterwards, we will here.
    }
)

app.get( // app.use -> defines the route for GET requests only.
    "/", (
        req,
        res,
    ) =>  {
        console.log("Get route function executed")
        res.send('Test') // Returned when curl 'http://{IP}:{PORT}' 
    }
)

app.get(
    "/route_param/:param/test", ( // This defines the param, everything written between here is accessible by the `req.params.param`
        req,
        res,
    ) => {
        const param = req.params.param
        console.log(`Get route with param executed, param: '${param}'`)
        res.send(`You tested with the param = '${param}'`)
    }
)

app.all( // app.all -> defines the fallback route. Works for EVERY method ("GET"/"POST"/"DELETE"/...)
    "/*path" , (
        req,
        res,
    ) => {
        const path = req.params.path
        console.log("Fallback route function executed")
        res.status(404).send(`Route does not exist: '/${path}'`) // Returned when curl 'http://{IP}:{PORT}/anything_that_doesnt_exist'
    }
)

app.listen(
    port,
    () => {
        console.log(`Server is running on port ${port}`) // Code to run AFTER successfully opening the server
    }
)

// Cases:
// 1. curl 'http://localhost:3000/' -> Executes middlewere + '/' route get function (returning 'Test' in this case)
// 2. curl 'http://localhost:3000/test' -> Executes middlewere only (returning [404] - 'Route does not exist: `/${path}`') <- this happens because of the app.all("/*path", () => {})