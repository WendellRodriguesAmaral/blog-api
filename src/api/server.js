import { fastify } from "fastify";
import { DataBaseController } from "./controllers/PostsController.js";

const server = fastify();

const database = new DataBaseController();

server.get("/", (req, res) => {
  res = setAccessControl(res);
  return res.status(200).send("Blog API available.");
});

server.get("/posts", async (req, res) => {
  res = setAccessControl(res);
  const search = req.query.search;
  const videos = search ? await database.listBySearch(search) : await database.list();
  return videos;
});

server.get("/posts/:id", async (req, res) => {
  res = setAccessControl(res);
  const postId = req.params.id;
  const post = await database.getById(postId);
  return post;
});

server.post("/posts", async (req, res) => {
  res = setAccessControl(res);

  //create a new post
  const post = req.body;
  await database.create(post);

  return res.status(201).send(await database.list());
});

server.put("/posts/:id", async (req, res) => {
  res = setAccessControl(res);

  //update a post
  const postId = req.params.id;
  const post = req.body;

  await database.update(postId, post);

  return res.status(204).send();
});

server.delete("/posts/:id", async (req, res) => {
  res = setAccessControl(res);

  //delete a post
  const postId = req.params.id;
  await database.delete(postId);

  return res.status(204).send();
});

server.get("/posts/category/:category", async (req, res) => {
  res = setAccessControl(res);

  const category = req.params.category;
  const postByCategory = await database.listByCategory(category);

  return postByCategory;
});


function setAccessControl(res){
  return res.header("Access-Control-Allow-Origin","*");
}

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3001,
});

export default server;
