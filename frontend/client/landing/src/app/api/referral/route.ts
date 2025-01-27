// export const dynamic = "force-static";
import {ServerAxios} from "@/lib/Axios/server";
import {type NextRequest} from "next/server";
// import * as T from "@/types";
// import { getReqestBody } from "@/utils/server";

export async function GET(request: NextRequest) {
  //   const data = await getReqestBody(request);
  const address = request.nextUrl.searchParams.get("address");
  const withcode = request.nextUrl.searchParams.get("withcode");
  const refCode = request.nextUrl.searchParams.get("ref");

  console.log({ withcode, address, refCode });

  // try {
  let result, statusCode;
  if (address !== null) {
    try {
      const { data: d, status: s } = await ServerAxios.get(
        `get-referral?ref=${address}`
      );
      result = d;
      statusCode = s;
    } catch (err) {
      const e = (err as Error).message;
      console.log({e})
      result = "Not found";
      statusCode = 404;
    }
  } else if (withcode !== null) {
    try {
      const { data: d, status: s } = await ServerAxios.get(
        `g-referral?code=${withcode}`
      );
      result = d;
      statusCode = s;
    } catch (err) {
      const e = (err as Error).message;
      console.log({e})
      result = "Not found";
      statusCode = 404;
    }
  } else if (refCode !== null) {
    try {
      const { data: d, status: s } = await ServerAxios.get(
        `get-ref?ref=${refCode}`
      );
      result = d;
      statusCode = s;
    } catch (err) {
      const e = (err as Error).message;
      console.log({e})
      result = "No referral found";
      statusCode = 404;
    }
  }

  // console.log({ result, statusCode });
  // // Create the response
  return new Response(
    JSON.stringify({data: result, status: statusCode}),
    {
      status: 200,
      headers: {"Content-Type": "application/json"},
    }
  );
  // } catch (err) {
  // const e = (err as Error).message;
  // console.log({e})

  //   return new Response(JSON.stringify({ error: e.response.data.error }), {
  //     status: 500,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { address, code } = body;

  let result, statusCode;

  try {
    const { data: d, status: s } = await ServerAxios.post(`referral`, {
      address,
      code
    });
    result = d;
    statusCode = s;
  } catch (err) {
    const e = (err as Error).message;
    console.log({e})
    result = "Error";
    statusCode = 500;
  }
  
  return new Response(
    JSON.stringify({data: result, status: statusCode}),
    {
      status: 200,
      headers: {"Content-Type": "application/json"},
    }
  );
}