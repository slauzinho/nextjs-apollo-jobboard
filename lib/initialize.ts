import { isBrowser } from './isBrowser';
import { AppContext } from './withApollo';
import checkLoggedIn from './checkLoggedIn';
import Router from 'next/router';
import gql from 'graphql-tag';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const guardedRoutes = ['/post'];

export default async function(ctx: AppContext) {
  if (!isBrowser) {
    ctx.apolloClient.writeData({
      //@ts-ignore
      data: { isLoggedIn: !!ctx.req.cookies.token },
    });
  }
  // We only do client-side validation
  // The server validation is done on the server file.
  if (isBrowser) {
    const { isLoggedIn }: any = await ctx.apolloClient.readQuery({
      query: IS_LOGGED_IN,
    });

    // Check if the user is logged and trying to access
    // a page (from the client) which is for unsign users
    if (
      isLoggedIn &&
      (ctx.pathname === '/login' || ctx.pathname === '/register')
    ) {
      console.log(isLoggedIn);
      Router.replace('/');
    }

    // Check if the user is trying to access a protected route
    if (!isLoggedIn && guardedRoutes.includes(ctx.pathname)) {
      Router.replace('/login');
    }
  }
}
