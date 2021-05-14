const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "CRUDDataBase",
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlInsert = "select * from movies;";
  db.query(sqlInsert, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  console.log(movieName, movieReview);
  console.log(req.body);

  const sqlInsert = "INSERT INTO movies (movieName,movieReview) VALUES (?,?);";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:movieName", (req, res) => {

  const movieName = req.params.movieName;
  sqlDelete = "Delete from movies where movieName  = ?;";
  db.query(sqlDelete, [movieName], (err, result) => {
    console.log(result);
  });

});

app.put("/api/update", (req, res) => {

    const Name = req.body.movieName;
    const Review = req.body.movieReview;

    console.log(Name,Review);

    sqlupdate = "UPDATE movies SET movieReview  = ? WHERE movieName = ?;"
    db.query(sqlupdate, [Review,Name], (err, result) => {
      console.log(result);
    });
  
  });

app.listen(3001, (req, res) => {
  console.log("Server Started");
});
