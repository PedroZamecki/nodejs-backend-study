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

app.get(
    "/search", ( // No special treatment here, in this case this is simply a GET route
        req,
        res,
    ) => {
        const search = req.query.search // Here we search for the query 'search'
        if (!search) { // This enforces that the route is `/search?search=...`
            console.log('Get executed without query \'search\'') 
            return res.status(404).send('No value for query \'search\'')
        }
        console.log(`Get executed with query 'search'=${search}`)
        res.send(`You tested with query search=${search}`)
    }
)

app.get(
    "/error", (
        req,
        res,
    ) => {
        throw new Error("This is a test error")
    }
)

app.use( 
        // This is also a middleware, with the exception that it deals with the error cases
        // Note: the previous middleware ALSO runs.
    (
        err, 
        req, 
        res, 
        next,
    ) => {
        console.error(`Error middleware executed: err=\'${err}\'`)
        res.status(500).send(`We got an error! Error: '${err}'`)
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