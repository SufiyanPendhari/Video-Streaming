const router = require('express').Router();
const fs = require("fs");

router.get('/',(req,res)=>{
    res.sendFile('index.html',{root:__dirname})
})
router.get('/video',(req,res)=>{
const range = req.headers.range;
if(!range){
    res.status(400).send("Require Header");
}

// Define Video Path Here
const videoPath = "myVideo.mp4"
const videoSize = fs.statSync("myVideo.mp4").size


// Parse range
const chunk = 10**6;
// Remove the alphabet from header
const start = Number(range.replace(/\D/g,""))

// to stop sending data if video is complete
const end = Math.min(start+chunk,videoSize-1)

const contentLength = end - start +1;
// Partial Content
res.writeHead(206,{
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges":"bytes",
    "Content-Length": contentLength,
    "Content-Type":"video/mp4"
})

// Create video stream
const videoStream = fs.createReadStream(videoPath,{start,end});
//  send stream
videoStream.pipe(res)

})
module.exports = router
