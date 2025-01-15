import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "0",
  database: "0",
  user: "0",
  password: "0",
  port: 0,
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  const [result, fields] = await connection.query("SELECT * FROM user");
  res.json(result);
});

app.get("/user/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!isNaN(id)) {
    try {
      const [result] = await connection.query("SELECT * FROM user WHERE id=?", [
        id,
      ]);
      if (result.length) {
        res.json(result);
      } else {
        res.send("no user found");
      }
    } catch (e) {
      res.status(500).send("Something went wrong");
    }
  } else {
    res.status(400).send("ID is not a valid number");
  }
});
app.post("/post", async (req, res) => {
  const { id, title, content } = req.body;

  const [result] = await connection.query(`
    INSERT INTO post(title, content, user_id)
    VALUES('${title}','${content}', ${id});
    `);

  res.json(result);
});

app.get("/query", (req, res) => {
  res.send(req.query);
});
app.get("/post", async (req, res) => {
  const [result] = await connection.query(`
        SELECT * FROM post
        `);
  res.json(result);
});

app.listen(3000, () => {
  console.log("Server started");
});
