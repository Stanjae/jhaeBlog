'use server'
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt'
import { FormData, LoginFormData, SignUpFormState} from './definitions';
import { clientRegisterSchema, signInSchema } from './zod';
import { db } from '@vercel/postgres';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DEFAULT_REDIRECT } from './route';
import { revalidatePath } from 'next/cache';


const client = await db.connect();

export const hashPassword = async (password: string) => {
    const hashpassword = await bcrypt.hash(password, 10)
    return hashpassword;
}

export const compareHashPassword = async (password: string, userPassword:string) => {
    const passwordsMatch = await bcrypt.compare(password, userPassword);
    return passwordsMatch;
}

export const getUserEmailFromDb = async (email: string) => {
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        if(!user) return null
        
        return user.rows[0];
}

export const getProfileById = async (id: string | undefined) => {
  const user = await sql`SELECT * FROM profiles WHERE user_id=${id}`;
  if(!user) return null
  
  return user.rows[0];
}

export const getUserById = async (id: string) => {
  const user = await sql`SELECT * FROM users WHERE id=${id}`;
  if(!user) return null
  return user.rows[0];
}

export const getUserByUserId = async (id: string) => {
  const user = await sql`SELECT * FROM users WHERE userid=${id}`;
  if(!user) return null
  return user.rows[0];
}

export const getUsernameFromDb = async (username: string) => {
    const user = await sql`SELECT * FROM users WHERE name=${username}`;
    if(!user) return null
    
    return user.rows[0];
}

/* register user */
export async function registerUser(formdata:FormData) {
    try {
        const parsedCredentials =  clientRegisterSchema.safeParse(formdata)
        if(!parsedCredentials.success) return {message: "Invalid Data", status:'danger', isTrue:true}

        const {email, password, username} = parsedCredentials.data

        const newUser = await getUserEmailFromDb(email);

        if(newUser) return {message: "Email already exists", status:'danger', isTrue:true};

        const newUsername = await getUsernameFromDb(username);

        if(newUsername) return {message: "Username already exists", status:'danger', isTrue:true}

        const hashedPw = await hashPassword(password)

        await client.sql`
        INSERT INTO users (name, email, password, role)
        VALUES (${username}, ${email}, ${hashedPw}, ${'editor'})
      `;
 
      return {message: "Registration Successful", status:'success', isTrue:true}
      
    } catch (error) {
        return {message: JSON.stringify(error), status:'danger', isTrue:true}
    }
}


// Login User...
 
export async function authenticate(prevState:SignUpFormState, formData:LoginFormData) {
  const validatedData = signInSchema.safeParse(formData);
  if (!validatedData.success) return {message: "Invalid Data, please try again", status:'danger', isTrue:true}
  const {email, password} = validatedData.data
  try {
    await signIn('credentials', {email, password, redirectTo:DEFAULT_REDIRECT});
    return {message: "Login Successful", status:'success', isTrue:true}
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {message: 'Invalid credentials.', status:'danger', isTrue:true};
        default:
          return {message: 'Something went wrong.', status:'danger', isTrue:true};
      }
    }
    throw error;
  }

}

//sign with google

export const signInWithThirdParties = async (newAuth: string) => {
  await signIn(newAuth)
}


//profiles

export const createProfile = async (prevState:SignUpFormState, formData:any) => {
  const newData = Object.fromEntries(formData.entries())
  const {userid, firstname, lastname, country, author, cover, zipcode, city, address, bio, gender, date_of_birth} = newData
  const singleProfile = await getProfileById(userid);

  if(singleProfile){
    try{
       await client.sql`
    UPDATE profiles SET
    first_name = ${firstname}, last_name = ${lastname}, country = ${country}, city = ${city}, bio = ${bio},
    date_of_birth = ${date_of_birth}, gender = ${gender}, profile_image_url = ${author}, cover_image_url = ${cover},
    address = ${address}, zip_code = ${zipcode}
    WHERE user_id = ${userid}
    `
    revalidatePath('/auth/dashboard/settings')
    return {message: 'Profile Updated sucessfully.', status:'success', isTrue:true};
    }catch(error){
      revalidatePath('/auth/dashboard/settings')
      return {message: `${error}`, status:'danger', isTrue:true};
    }
   
    
  }else{
    await client.sql`
    INSERT INTO profiles (user_id, first_name, last_name, country, city, bio, date_of_birth, gender,
    profile_image_url, cover_image_url, address, zip_code)
    VALUES (${userid}, ${firstname}, ${lastname}, ${country}, ${city}, ${bio}, ${date_of_birth}, ${gender}, ${author}, ${cover}, ${address}, ${zipcode})
    `
    revalidatePath('/auth/dashboard/settings')
    return {message: 'Profile Created Sucessfully.', status:'success', isTrue:true};
  }
  
}