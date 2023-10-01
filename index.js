import express from 'express';
import passport from "passport";
import session from "express-session";
import "./auth.js";

const app = express();
const { SESSION_SECRET } = process.env;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

function validateLogin(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.get("/", (req, res) => {
    res.send("<a href='auth/github'>Signup with Github </a>");
})

app.get(
    "/auth/github",
    passport.authenticate("github",{scope: ["user:email"]})
    );

    app.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: "/auth/error" }), (req, res) => {
        // Authentication was successful, redirect to /home
        res.redirect("http://localhost:3000/home");
    });
    



app.get("/home", validateLogin, (req, res) => {
    res.send("Hello from dashboard");
  });
  
  app.get("/auth/error", (req, res) => {
    res.send("Error occured");
  });
  
  app.get("/home/logout", (req, res) => {
    req.logout((err) => {
      if (err) throw err;
      else {
        req.session.destroy();
        res.redirect("/");
      }
    });
  });

app.listen(8000, () => {
    console.log('Server running on port 8000'); 
})