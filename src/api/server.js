import { fastify } from "fastify";
import cors from '@fastify/cors'
import { PostsController } from "./controllers/PostsController.js";
import { UsersController } from "./controllers/UsersController.js";

const server = fastify();

server.register(cors, { 
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: "*"
});

const postsDatabase = new PostsController();
const usersDatabase = new UsersController();

server.get("/", (req, res) => {
  return res.status(200).send("Blog API available.");
});

//all posts
server.get("/posts", async (req, res) => {
  const search = req.query.search;
  const videos = search ? await postsDatabase.listBySearch(search) : await postsDatabase.list(); //da pra melhorar e colocar uma ordenação por data na query
  return videos.reverse(); //retorna o ultimo inserido, na primeira posição.
});

//filter by id
server.get("/posts/:id", async (req, res) => {
  const postId = req.params.id;
  const post = await postsDatabase.getById(postId);
  return post;
});

//create a new post
server.post("/posts", async (req, res) => {
  const post = req.body;
  await postsDatabase.create(post);

  return res.status(201).send(await postsDatabase.list());
});

//update a post
server.put("/posts/:id", async (req, res) => {
  const postId = req.params.id;
  const post = req.body;

  await postsDatabase.update(postId, post);

  return res.status(204).send();
});


//delete a post
server.delete("/posts/:id", async (req, res) => {
  const postId = req.params.id;
  await postsDatabase.delete(postId);

  return res.status(204).send();
});

//filter by category
server.get("/posts/category/:category", async (req, res) => {
  const category = req.params.category;
  const postByCategory = await postsDatabase.listByCategory(category);

  return postByCategory;
});




server.post("/user/create", async (req, res) => { 
  const user = req.body;
  await usersDatabase.create(user);
  return res.status(201).send();
} );

















server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3001,
});

export default server;
