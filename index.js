import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.send("backend is working!");
})

app.listen(8000, () => {
    console.log('Server running on port 8000'); 
})