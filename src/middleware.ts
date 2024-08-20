import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { AuthRoutes, DEFAULT_REDIRECT, PrivateRoutes, PUBLIC_ROUTES, ROOT } from './app/lib/route';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
 const { nextUrl } = req;

 const isAuthenticated = !!req.auth;
 const isPublicRoute = PUBLIC_ROUTES(nextUrl.pathname).includes(nextUrl.pathname);
 const isAuthroutes = AuthRoutes.includes(nextUrl.pathname);
 //const isPrivate = PrivateRoutes.includes(nextUrl.pathname);

 //console.log('path:', nextUrl.pathname, PrivateRoutes.includes('/'));

if(isAuthroutes){
  if(isAuthenticated){
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }
  return
 }

 if(!isAuthenticated && !isPublicRoute){
  return Response.redirect(new URL(ROOT, nextUrl));
 }

 return;



 /* if (!isAuthenticated && isPrivate){
    return Response.redirect(new URL(ROOT, nextUrl));
   }else if(isAuthenticated && isAuthroutes){
       return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
   }else{
    console.log('petyr baelish')
    return 
   } 
    //AUTH_URL=https://jhae-blog.vercel.app/
   */

});

export const config = {
 matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};