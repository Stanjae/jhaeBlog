


export const ROOT = '/auth/login';
export const PUBLIC_ROUTES =(id:string) =>{
    let pami;
    if (id.startsWith('/detail')){
        pami = id.split('/')[2];
       return ['/', '/posts', `/detail/${pami}`];
    }
    return ['/', '/posts'];     
} 
export const DEFAULT_REDIRECT = '/auth/dashboard';

export const AuthRoutes = [ '/auth/login', '/auth/signup']

export const PrivateRoutes = ['/auth/dashboard', '/auth/dashboard/create-post']