import { fastify } from "fastify";
import { DataBaseController } from "./controllers/PostsController.js";

const server = fastify();
const database = new DataBaseController();

server.get("/", (req, res) => {
  return res.status(200).send("Blog API available.");
});

server.get("/posts", async (req) => {
  const search = req.query.search;
  const videos = search ? await database.listBySearch(search) : await database.list();
  return videos;
});

server.get("/posts/:id", async (req) => {
  const postId = req.params.id;
  const post = await database.getById(postId);
  return post;
});

server.post("/posts", async (req, res) => {
  //create a new post
  const post = req.body;
  await database.create(post);

  return res.status(201).send(await database.list());
});

server.put("/posts/:id", async (req, res) => {
  //update a post
  const postId = req.params.id;
  const post = req.body;

  await database.update(postId, post);

  return res.status(204).send();
});

server.delete("/posts/:id", async (req, res) => {
  //delete a post
  const postId = req.params.id;
  await database.delete(postId);

  return res.status(204).send();
});

server.get("/posts/category/:category", async (req) => {
  const category = req.params.category;
  const postByCategory = await database.listByCategory(category);

  return postByCategory;
});

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3001,
});

export default server;
