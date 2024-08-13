

const User =[{
    email: 'john.doe@example.com',
    userId: '410544b2-4001-4271-9855-fec4b6a6442a',
    name:'jonhdoe29',
    password:'password',
    date_created:'2022-01-01',
    image:'https://mighty.tools/mockmind-api/content/human/44.jpg',
    role:'editor'  
}]

const Profiles = [{
    id: '410544b2-6011-6291-9855-bec8b6a9442c',
    user_id:'410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'John Doe',
    country:'Nigeria',
    city:'Ikeja',
    zip:'12345',
    date_of_birth:'1990-01-01',
    gender:'Male',
    bio:'I am a software engineer with a passion for technology and design.',
    profile_image_url:'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    cover_image_url:'https://images.unsplash.com/photo-1596387451750-f7bfb51461ef',
    address:'123 Main St, Ikeja'
}]

const Posts = [
    {post_id:'410544b2-4001-1271-9855-fec4b6a6442a',
        user_id:'410544b2-4001-4271-9855-fec4b6a6442a',
        title:'The Rains of Castemare', 
        slug:'my-first-post',
    category_id:'13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    content:'This is my first post on the platform. The halls weep for themselves, and the walls are like the eyes of the dead.',
    image_url:'https://images.unsplash.com/photo-1590420511371-4713ec754cf9',
    type:'featured',
    tags:["GOT", "dragons", "starks", "fantasy"],
    date_created:'2022-01-01', 
    date_updated:'2022-01-02'}
]

const category = [
    {category_id:'13D07535-C59E-4157-A011-F8D2EF4E0CBB', title:'technology', slug:'technology', date_created:'2022-01-01'}
]

const comments = [
    {comment_id:'202444b2-4001-4271-9855-fec4b6a6442a', 
        post_id:'410544b2-4001-1271-9855-fec4b6a6442a', user_id:'410544b2-4001-4271-9855-fec4b6a6442a', 
        comment:'Great post! Thanks.', date_created:'2022-01-02'}
]


const likes = [
    {like_id:'410823b2-7001-4271-1112-fec4b6a6442b', post_id:'3958dc9e-712f-4377-85e9-fec4b6a6442a', 
     user_id:'3958dc9e-742f-4377-85e9-fec4b6a6442a'
    }
]

export {Profiles, likes, comments, User, Posts, category}



