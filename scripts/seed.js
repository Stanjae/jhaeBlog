//import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { likes, tags, comments, User, Posts, category} from '../lib/data';

//const client = await db.connect();

async function seedUsers(client) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id TEXT,
      name VARCHAR(255) NOT NULL,
      email TEXT UNIQUE,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      username TEXT UNIQUE,
      country TEXT,
      city TEXT,
      bio TEXT,
      date_of_birth DATE,
      gender VARCHAR(255),
      profile_image_url TEXT,
      cover_image_url TEXT,
      is_admin BOOLEAN DEFAULT false,
      address TEXT,
      zip_code INT,
      role TEXT
    );
  `;

  const insertedUsers = await Promise.all(
    User.map(async (user) => {
      //const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (user_id, name, email, profile_image_url, cover_image_url, username, country, city, bio, date_of_birth, gender, address, zip_code, role)
        VALUES (${user.user_id}, ${user.name}, ${user.email}, ${user.profile_image_url}, ${user.cover_image_url}, ${user.username}, ${user.country}, ${user.city}, ${user.bio}, ${user.date_of_birth}, ${user.gender}, ${user.address}, ${user.zip}, ${user.role})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedPosts(client) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    //FOREIGN KEY (user_id) REFERENCES users (id), FOREIGN KEY (category_id) REFERENCES category (id),
  await client.sql`
    CREATE TABLE IF NOT EXISTS posts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id INT NOT NULL, 
      category_id UUID NOT NULL, 
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      image_url TEXT NOT NULL,
      likes INT DEFAULT 0,
      type TEXT NOT NULL,
      comments INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      slug VARCHAR(255) UNIQUE,
      tags VARCHAR(255)[],
        ON CONFLICT (id) DO NOTHING;
    );
  `;

  const insertedposts = await Promise.all(
    Posts.map(
      (post) => client.sql`
        INSERT INTO posts ( user_id, category_id, title, content, image_url, likes, type, comments, created_at, updated_at, slug, tags)
        VALUES ( ${post.user_id}, ${post.category}, ${post.title}, ${post.content}, ${post.image_url}, ${post.likes}, ${post.type}, ${post.comments}, ${post.date_created}, ${post.date_updated}, ${post.slug}, ${JSON.stringify(post.tags)}
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedposts;
}

async function seedCategory(client) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS category (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug TEXT,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      description TEXT
    );
  `;

  const insertedCategory = await Promise.all(
    category.map(
      (cate) => client.sql`
        INSERT INTO category (title, slug, created_at, description)
        VALUES ( ${cate.title}, ${cate.slug}, ${cate.date_created}, ${cate.description}
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCategory;
}

async function seedCommemts(client) {
    // FOREIGN KEY (post_id) REFERENCES posts (id), FOREIGN KEY (user_id) REFERENCES users (id),
  await client.sql`
    CREATE TABLE IF NOT EXISTS comments(
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      post_id INT,
      user_id INT,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      comment TEXT NOT NULL
      
    );
  `;

  const insertedComments = await Promise.all(
    comments.map(
      (rev) => client.sql`
        INSERT INTO comments ( comment, post_id, user_id, created_at)
        VALUES ( ${rev.comment}, ${rev.post_id}, ${rev.user_id}, ${rev.date_created})
      `,
    ),
  );

  return insertedComments;
}


async function seedTags(client) {
    await client.sql`
      CREATE TABLE IF NOT EXISTS tags (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug TEXT,
        
      );
    `;
  
    const insertedTags = await Promise.all(
      tags.map(
        (tag) => client.sql`
          INSERT INTO tags ( title, slug)
          VALUES ( ${tag.title}, ${tag.slug})
        `,
      ),
    );
  
    return insertedTags;
  }

  async function seedLikes(client) {
    //FOREIGN KEY (post_id) REFERENCES posts (id), FOREIGN KEY (user_id) REFERENCES users (id),
    await client.sql`
      CREATE TABLE IF NOT EXISTS likes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        post_id UUID NOT NULL,
        user_id UUID NOT NULL,  
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        value BOOLEAN NOT NULL,  
      );
    `;
  
    const insertedLikes = await Promise.all(
      likes.map(
        (like) => client.sql`
          INSERT INTO likes (post_id, user_id, created_at, value)
          VALUES ( ${like.post_id}, ${like.user_id}, ${like.date_created}, ${like.value}
        `,
      ),
    );
  
    return insertedLikes;
  }

async function main() {
    const client = await db.connect();
  
    await client.sql`BEGIN`;
    await seedUsers(client);
    await seedPosts(client);
    await seedCategory(client);
    await seedCommemts(client);
    await seedTags(client);
    await seedLikes(client);
    await client.sql`COMMIT`;
    await client.end();
    return Response.json({ message: 'Database seeded successfully' }); 
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });