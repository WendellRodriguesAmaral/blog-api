import { sql } from "../db-connect.js";
import { randomUUID } from "crypto";

export class PostsController {

  async list() {
    const posts = await sql`SELECT * FROM posts`;
    return posts;
  }

  async create(post) {
    const postId = randomUUID();
    const { title, image, text, author, date, category, privacy } = post;
    await sql`insert into posts (id, title, image, text, author, date, category, privacy) 
        values (${postId}, ${title}, ${image}, ${text}, ${author}, ${date}, ${category || 'Outros'}, ${privacy || 'publico'})`;
  }

  async getById(postId) {
    const post = await sql`select * from posts where id = ${postId}`;
    return post;
  }

  async update(postId, post) {
    const { title, image, text, author, date, category, privacy } = post;
    await sql`update posts set 
        title = ${title}, 
        image = ${image}, 
        text = ${text}, 
        author = ${author},
        date = ${date}, 
        category = ${category || 'Outros'}, 
        privacy = ${privacy || 'publico'} where id = ${postId}`;
  }


  async delete(postId){
    await sql`delete from posts where id = ${postId}`;
  }

  async listByCategory(category){
    const postByCategory = await sql`select * from posts where category = ${category}`;
    return postByCategory;
  }

  async listBySearch(search){
    const postBySearch = await sql`select * from posts where title ILIKE ${'%' + search + '%'}`; //colocar um order by por ordenar por data
    return postBySearch;
  }
}
