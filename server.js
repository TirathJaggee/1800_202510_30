// REQUIRES
const express = require("express");
const fs = require("fs");
const cors = require("cors");


const app = express();
const port = 8000;

// const COMMENTS_FILE = "./app/data/comments.json";

app.use(cors());
app.use(express.json());


// just like a simple web server like Apache web server
// we are mapping file system paths to the app's virtual paths
app.use("/html", express.static("./public/html"));
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/images", express.static("./public/images"));
app.use("/scripts", express.static("./scripts"));

// // Serve static files from the 'public' folder (or adjust path accordingly)
// app.use(express.static('public'));  // 'public' should contain your 'css' folder

app.get("/", (req, res) => {
    let doc = fs.readFileSync("./public/html/index.html", "utf8");
    res.send(doc);
});
app.get("/main", (req, res) => {
    let doc = fs.readFileSync("./public/html/main.html", "utf8");
    res.send(doc);
});
app.get("/game", (req, res) => {
    let doc = fs.readFileSync("./public/html/game.html", "utf8");
    res.send(doc);
});
app.get("/leaderboard", (req, res) => {
    let doc = fs.readFileSync("./public/html/leaderboard.html", "utf8");
    res.send(doc);
});
app.get("/learn", (req, res) => {
    let doc = fs.readFileSync("./public/html/learn.html", "utf8");
    res.send(doc);
});
app.get("/learn/carbohydrates", (req, res) => {
    let doc = fs.readFileSync("./public/html/carbohydrates.html", "utf8");
    res.send(doc);
});
app.get("/learn/protein", (req, res) => {
    let doc = fs.readFileSync("./public/html/protein.html", "utf8");
    res.send(doc);
});
app.get("learn/vitamins", (req, res) => {
    let doc = fs.readFileSync("./public/html/vitamins.html", "utf8");
    res.send(doc);
});
app.get("/learn/supplementation", (req, res) => {
    let doc = fs.readFileSync("./public/html/supplementation.html", "utf8");
    res.send(doc);
});
app.get("/learn/workouts", (req, res) => {
    let doc = fs.readFileSync("./public/html/workouts.html", "utf8");
    res.send(doc);
});
app.get("/login", (req, res) => {
    let doc = fs.readFileSync("./public/html/login.html", "utf8");
    res.send(doc);
});
app.get("/store", (req, res) => {
    let doc = fs.readFileSync("./public/html/store.html", "utf8");
    res.send(doc);
});

app.get("/profile", (req, res) => {
    let doc = fs.readFileSync("./public/html/profile.html", "utf8");
    res.send(doc);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


// // Load comments
// app.get("/comments", (req, res) => {
//     fs.readFile(COMMENTS_FILE, (err, data) => {
//         if (err) {
//             return res.status(500).json({ error: "Error reading comments" });
//         }
//         res.json(JSON.parse(data));
//     });
// });

// // Add a new comment
// app.post("/comments", (req, res) => {
//     const newComment = {
//         name: req.body.name,
//         comment: req.body.comment,
//         timestamp: new Date().toISOString()
//     };

//     fs.readFile(COMMENTS_FILE, (err, data) => {
//         const comments = err ? [] : JSON.parse(data);
//         comments.push(newComment);

//         fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2), (err) => {
//             if (err) {
//                 return res.status(500).json({ error: "Error saving comment" });
//             }
//             res.json(newComment);
//         });
//     });
// });