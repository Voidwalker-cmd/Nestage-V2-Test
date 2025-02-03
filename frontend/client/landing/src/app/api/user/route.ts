// export const dynamic = "force-static";
import {ServerAxios} from "@/lib/Axios/server";
import type {NextRequest} from "next/server";
// import { type NextRequest } from "next/server";
// import * as T from "@/types";
// import { getReqestBody } from "@/utils/server";

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address");
  //   const data = await getReqestBody(request);
  const {data, status} = await ServerAxios.get(
    `get-user?address=${address}`
  );
  return new Response(
    JSON.stringify({data, status}),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // } catch (e: any) {
  
  //   return new Response(JSON.stringify({ error: e.response.data.error }), {
  //     status: 500,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }
}
