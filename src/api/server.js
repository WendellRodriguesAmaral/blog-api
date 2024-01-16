import { fastify } from "fastify";
import cors from '@fastify/cors'
import { DataBaseController } from "./controllers/PostsController.js";

const server = fastify();

server.register(cors, { 
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: "*"
});

const database = new DataBaseController();

server.get("/", (req, res) => {
  return res.status(200).send("Blog API available.");
});

//all posts
server.get("/posts", async (req, res) => {
  const search = req.query.search;
  const videos = search ? await database.listBySearch(search) : await database.list();
  return videos.reverse(); //retorna o ultimo inserido, na primeira posição.
});

//filter by id
server.get("/posts/:id", async (req, res) => {
  const postId = req.params.id;
  const post = await database.getById(postId);
  return post;
});

//create a new post
server.post("/posts", async (req, res) => {
  const post = req.body;
  await database.create(post);

  return res.status(201).send(await database.list());
});


//update a post
server.put("/posts/:id", async (req, res) => {
  const postId = req.params.id;
  const post = req.body;

  await database.update(postId, post);

  return res.status(204).send();
});


//delete a post
server.delete("/posts/:id", async (req, res) => {
  const postId = req.params.id;
  await database.delete(postId);

  return res.status(204).send();
});

//filter by category
server.get("/posts/category/:category", async (req, res) => {
  const category = req.params.category;
  const postByCategory = await database.listByCategory(category);

  return postByCategory;
});


server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3001,
});

export default server;
