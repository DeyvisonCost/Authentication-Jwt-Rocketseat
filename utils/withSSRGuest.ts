
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { redirect } from "next/dist/server/api-utils";
import { parseCookies } from "nookies";



export function withSSRGuest<P>(fn: GetServerSideProps<P>): GetServerSideProps{
  return async(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if(cookies['jwt.token']){
      return{
        redirect: {
          destination: '/dashboard',
          permanent: false,
        }
      }
    }

    return await fn(ctx);
  }
}