const app = require('express')();
const router = require('./router')

// Server Listening 
app.use('/',router)
app.listen(3000,()=>console.log(`Server listening at port 3000`))