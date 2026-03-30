const express = require('express');
const app = express()

app.use( // app.use -> middlewere that executes BEFORE the request given. works BEFORE all methods ("GET"/"POST"/"DELETE"/...)
    "/", (
        req, 
        res, 
        next
    ) => {
        console.log("Middlewere function executed")
        // res.send("Anything") <- Be careful, if we send something in the middlewere we SHOULDN'T SEND ANYTHING, therefore, no 'next()' should execute
        next() // function to CONTINUE the line of execution, for example, if there is a route that SHOULD be executed afterwards, we will here.
    }
)

app.get( // app.use -> defines the route for GET requests only.
    "/", (
        req,
        res,
    ) =>  {
        console.log("Get route function executed")
        res.send('Test') // Returned when curl 'http://{IP}/{PORT}' 
    }
)

app.listen(
    3000, // Port to listen to
    () => {
        console.log("Server is running") // Code to run AFTER successfully opening the server
    }
)

// Cases:
// 1. curl 'http://localhost:3000/' -> Executes middlewere + '/' route get function (returning 'Test' in this case)
// 2. curl 'http://localhost:3000/test' -> Executes middlewere only (returning some HTTP error? study more.)