import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { Profiles, likes, comments, User, Posts, category} from '../lib/datay';

const client = await db.connect();

/* 
CREATE TABLE users
(
  id SERIAL,
  userId UUID DEFAULT uuid_generate_v4()
  name VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(100),
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  role TEXT,
 
  PRIMARY KEY (id)
) */

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      userId UUID DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      emailVerified TIMESTAMPTZ,
      image TEXT,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      role TEXT
    );
  `;
  const insertedUsers = await Promise.all(
    User.map(async (user) => { 
      const hashedPassword = await bcrypt.hash(user.password, 10)
      return client.sql`
        INSERT INTO users (userId, name, email, password, role, image)
        VALUES (${user.userId}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role}, ${user.image});
      `;
    }),
  );

  return insertedUsers;
}



/* seed profiles */
async function seedProfiles() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS profiles (
      id SERIAL PRIMARY KEY,
      user_id UUID NOT NULL,
      first_name VARCHAR(50),
      last_name VARCHAR(50),
      country TEXT,
      city TEXT,
      bio TEXT,
      date_of_birth DATE,
      gender VARCHAR(255),
      profile_image_url TEXT,
      cover_image_url TEXT,
      address TEXT,
      zip_code TEXT,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedProfiles = await Promise.all(
    Profiles.map(async (profile) => { 
      return client.sql`
        INSERT INTO profiles (id, user_id, name, profile_image_url, cover_image_url, country, city, bio, date_of_birth, gender, address, zip_code)
        VALUES (${profile.id}, ${profile.user_id}, ${profile.name}, ${profile.profile_image_url}, ${profile.cover_image_url}, ${profile.country}, ${profile.city}, ${profile.bio}, ${profile.date_of_birth}, ${profile.gender}, ${profile.address}, ${profile.zip})
      `;
    })
  );

  return insertedProfiles;
}


async function seedPosts() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
   
  await client.sql`
    CREATE TABLE IF NOT EXISTS posts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL, 
      category_id UUID NOT NULL, 
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      content TEXT NOT NULL,
      image_url TEXT NOT NULL,
      type TEXT NOT NULL,
      tags TEXT,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedposts = await Promise.all(
    Posts.map(
      (post) => client.sql`
        INSERT INTO posts (id, user_id, category_id, title, content, image_url, type, slug, tags)
        VALUES (${post.post_id}, ${post.user_id}, ${post.category_id}, ${post.title}, ${post.content}, ${post.image_url}, ${post.type}, ${post.slug}, ${JSON.stringify(post.tags)})
      `,
    ),
  );
  return insertedposts;
}

async function seedCategory() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS category (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedCategory = await Promise.all(
    category.map((cate) => client.sql`
        INSERT INTO category (id, title, slug)
        VALUES (${cate.category_id}, ${cate.title}, ${cate.slug})
      `,
    ),
  );

  return insertedCategory;
}

async function seedCommemts() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS comments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      post_id UUID NOT NULL,
      user_id UUID NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      comment TEXT NOT NULL  
    );
  `;

  const insertedComments = await Promise.all(
    comments.map((rev) => client.sql`
        INSERT INTO comments (id, comment, post_id, user_id)
        VALUES (${rev.comment_id}, ${rev.comment}, ${rev.post_id}, ${rev.user_id})
      `,
    ),
  );

  return insertedComments;
}

  async function seedLikes() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
      CREATE TABLE IF NOT EXISTS likes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        post_id UUID NOT NULL,
        user_id UUID NOT NULL,  
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `;
  
    const insertedLikes = await Promise.all(
      likes.map((like) => client.sql`
          INSERT INTO likes (id, post_id, user_id)
          VALUES (${like.like_id}, ${like.post_id}, ${like.user_id})
          `,
      ),
    );
    return insertedLikes;
  }
export async function GET() {
  try {
    await client.sql`BEGIN`;
    //await seedUsers();
    //await seedProfiles();
    //await seedPosts();
    //await seedCategory();
    //await seedCommemts();
    //await seedLikes();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500});
  }
}