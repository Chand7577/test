import express from "express";

const app = express();
const port = 8000;
// accepting data from the frontend side

app.use(express.json());

let users = [];
let nextId = 1;
app.post("/users", (req, res) => {
  const { name, age } = req.body;
  const newUser = { id: nextId++, name, age };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/list", (req, res) => {
  res.status(200).send(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.status(200).send(user);
  }
});

// update user

app.put("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send("User not found");
  } else {
    const { name, age } = req.body;
    user.name = name;
    user.age = age;
    res.status(200).send(user);
  }
});

app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((user) => user.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send("User not found");
  } else {
    users.splice(index, 1);
    res.status(204).send();
  }
});

app.listen(port, () => {
  console.log("Server is running at port number ", port);
});
