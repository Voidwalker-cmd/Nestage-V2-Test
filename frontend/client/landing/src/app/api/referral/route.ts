// export const dynamic = "force-static";
import {ServerAxios} from "@/lib/Axios/server";
import {type NextRequest} from "next/server";
// import * as T from "@/types";
// import { getReqestBody } from "@/utils/server";

export async function GET(request: NextRequest) {
  //   const data = await getReqestBody(request);
  const address = request.nextUrl.searchParams.get("address");
  const withCode = request.nextUrl.searchParams.get("withcode");
  const refCode = request.nextUrl.searchParams.get("ref");
  const mode = request.nextUrl.searchParams.get("mode");
  
  console.log({mode})
  
  // console.log({ withCode, address, refCode });
  
  // try {
  let result, statusCode;
  if (address !== null) {
    if (mode === "getPoints") {
      try {
        const rex = await ServerAxios.get(
          `user?address=${address}&points=true`
        );
        console.log({rex})
        const {data, status} = rex
        console.log({data})
        result = data.points;
        statusCode = status;
      } catch (err) {
        const e = (err as Error).message;
        console.log({e})
        result = "No Address found";
        statusCode = 404;
      }
    } else if (mode === "temp") {
      try {
        const rex = await ServerAxios.get(
          `user?address=${address}&points=true`
        );
        console.log({rex})
        const {data, status} = rex
        console.log({data})
        result = data.points;
        statusCode = status;
      } catch (err) {
        const e = (err as Error).message;
        console.log({e})
        result = "No Address found";
        statusCode = 404;
      }
    }else {
      try {
        const {data: d, status: s} = await ServerAxios.get(
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
    }
  } else if (withCode !== null) {
    try {
      const {data: d, status: s} = await ServerAxios.get(
        `g-referral?code=${withCode}`
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
      const {data: d, status: s} = await ServerAxios.get(
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
  } else if (mode !== null) {
    if (mode === 'pay') {
      try {
        const ad = request.nextUrl.searchParams.get("user");
        const {data, status} = await ServerAxios.get(
          `referral/pay?address=${ad}`
        );
        result = data.total;
        statusCode = status;
      } catch (err) {
        const e = (err as Error).message;
        console.log({e})
        result = "No Address found";
        statusCode = 404;
      }
    } else if (mode === "getRef") {
      try {
        const {data, status} = await ServerAxios.get(
          `user?address=${address}`
        );
        result = data;
        statusCode = status;
      } catch (err) {
        const e = (err as Error).message;
        console.log({e})
        result = "No Address found";
        statusCode = 404;
      }
    } else if (mode === "getPoints") {
      try {
        const {data, status} = await ServerAxios.get(
          `user?address=${address}&points=true`
        );
        result = data.points;
        statusCode = status;
      } catch (err) {
        const e = (err as Error).message;
        console.log({e})
        result = "No Address found";
        statusCode = 404;
      }
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
  
  const {address, code} = body;
  
  let result, statusCode;
  
  try {
    const {data: d, status: s} = await ServerAxios.post(`referral`, {
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