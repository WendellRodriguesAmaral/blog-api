import { fastify } from "fastify";
import cors from "@fastify/cors";
import jsonwebtoken from "jsonwebtoken";

import { parameters } from "./utils.js";
import { PostsController } from "./controllers/PostsController.js";
import { UsersController } from "./controllers/UsersController.js";

//LEMBRAR QUE EM TODAS AS ALTERAÇÕES NO PERFIL OU NO POST PRECISO RECEBER O ID DO USUARIO PRA ALTERAR SOMENTE NA CONTA DELE

const postsDatabase = new PostsController();
const usersDatabase = new UsersController();
const server = fastify();

function isTokenJWTValid(req, res) {
  const token = req.headers["x-access-token"];

  jsonwebtoken.verify(token, parameters.secret, (err) => {
    if (err) return res.status(401).send();
  });
}

server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: "*",
});



server.get("/", (req, res) => {
  return res.status(200).send("Blog API available.");
});

//all posts
server.get("/posts", async (req, res) => {
  const search = req.query.search;

  //query que busque pela lista de amigos antes e dps passe para a query abaixo para filtrar os posts

  //na query abaixo ainda falta filtrar pelos ids do user e dos seus amigos
  const posts = search
    ? await postsDatabase.listBySearch(search)
    : await postsDatabase.list(); //da pra melhorar e colocar uma ordenação por data na query

  //esse trecho serve somente para que cada montar cada post com as info do seu autor
  const usersId = posts.map((post) => post.author);
  console.log(usersId);
  //--

  return posts.reverse(); //retorna o ultimo inserido, na primeira posição.
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
});

server.post("/user/auth", async (req, res) => {
  const user = req.body;
  const userAuth = await usersDatabase.loginUser(user);
  const qtdUsuarioQueDeveRetornar = parameters.QtyUserMustReturn;
  console.log(userAuth);

  if (userAuth.length == qtdUsuarioQueDeveRetornar) {
    const token = jsonwebtoken.sign({ id: userAuth[0].id }, parameters.secret, {
      expiresIn: parameters.fiveMinutes,
    });

    return res.status(200).send({token});
  }

  return res.status(401).send();
});

server.get("/user/:userId", async (req, res) => {
  isTokenJWTValid(req, res);

  const id = req.params.userId;
  const user = await usersDatabase.getUser(id);
  return user;
});



server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3001,
});

export default server;
