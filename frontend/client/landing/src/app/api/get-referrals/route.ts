// export const dynamic = "force-static";
import { ServerAxios } from "@/lib/Axios/server";
import { type NextRequest } from "next/server";
// import * as T from "@/types";
// import { getReqestBody } from "@/utils/server";

export async function GET(request: NextRequest) {
  //   const data = await getReqestBody(request);
  const address = request.nextUrl.searchParams.get("address");
  const withcode = request.nextUrl.searchParams.get("code");

  console.log({withcode, address})

  // try {
  let result, statusCode
  if (address !== null) {
    const { data: d, status: s } = await ServerAxios.get(
      `get-referral?ref=${address}`
    ); 
    result = d
    statusCode = s
  } else if(withcode !== null) {
    const { data: d, status: s } = await ServerAxios.get(
      `g-referral?code=${withcode}`
    );
    result = d
    statusCode = s
  }

  // // Create the response
    const response = new Response(JSON.stringify({data: result, status: statusCode}), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  // } catch (e: any) {

  //   return new Response(JSON.stringify({ error: e.response.data.error }), {
  //     status: 500,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }
}
