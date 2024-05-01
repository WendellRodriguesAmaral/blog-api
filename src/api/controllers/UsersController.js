import { sql } from "../db-connect.js";
import { randomUUID } from "crypto";

export class UsersController {

  async loginUser(user){
    const {email, password} = user;

    const userAuth = await sql`SELECT * 
    FROM users 
    WHERE email = ${email}
    AND password = ${password};`

    return userAuth;
  }

  async create(user) {
    const userId = randomUUID();
    const {
      fullName,
      nickname,
      profilePicture,
      shortPhrase,
      biography,
      email,
      secondaryEmail,
      phoneNumber,
      password,
      dateOfBirth,
      gender,
      profession,
    } = user;

    await sql`insert into users (id, full_name, nickname, profile_picture, short_phrase, biography, email, secondary_email, phone_number, password, date_of_birth,
         gender, profession) 
        values (${userId}, ${fullName}, ${nickname}, ${profilePicture}, ${shortPhrase}, ${biography}, ${email}, ${secondaryEmail}, ${phoneNumber},
             ${password}, ${dateOfBirth}, ${ gender}, ${profession})`;
  }



  async update(userId, user) {
    const {
        fullName,
        nickname,
        profilePicture,
        shortPhrase,
        biography,
        email,
        secondaryEmail,
        phoneNumber,
        password,
        dateOfBirth,
        gender,
        profession,
      } = user;

    await sql`update users set 
        full_name = ${fullName}, 
        nickname = ${nickname}, 
        profile_picture = ${profilePicture}, 
        short_phrase = ${shortPhrase},
        biography = ${biography}, 
        email = ${email}, 
        secondary_email = ${secondaryEmail},
        phone_number = ${phoneNumber}, 
        password = ${password}, 
        date_of_birth = ${dateOfBirth},
        gender = ${gender},
        profession = ${profession} where id = ${userId}`;
  }


  async delete(userId){
    await sql`delete from users where id = ${userId}`;
  }

  async getUsers(usersId){
    await sql `select * from users where id in (${usersId})`;
  }

  async getUser(userID){
    return await sql`select * from users where id = ${userID}`;
  }

}

