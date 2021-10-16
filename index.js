const express = require('express');
const path = require('path');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/videoinfo',async (req, res) => {
    const videoURL = req.query.videoURL;
    const info = await ytdl.getInfo(videoURL); 
    res.status(200).json(info);
});

app.get('/download', async (req, res) => {
    const videoURL = req.query.videoURL;
    const itag = req.query.itag;
    const title = req.query.title;
    res.header("Content-Disposition", `attachment;\ filename=${title}.mp4`);
    res.header('Content-Type', 'video/mp4');
    await ytdl(videoURL, {
        filter: format => format.itag === parseInt(itag)
    }).pipe(res);
})
app.listen(5000, () => {
    console.log('listening on http://localhost:5000')
});