import express from 'express';
import passport from "passport";
import "./auth.js";

const app = express();

app.get("/", (req, res) => {
    res.send("<a href='auth/github'>Signup with Github </a>");
})

app.get(
    "/auth/github",
    // console.log('hello')
    // passport.authenticate("github", {scope: ["user:email"]})
    );

app.get("/auth/github/callback", (req, res) => {
    passport.authenticate("github", (req, res) => {
        successRedirect("http://localhost:3000");
        failureRedirect("/auth/errpr");

    })

});

app.listen(8000, () => {
    console.log('Server running on port 8000'); 
})