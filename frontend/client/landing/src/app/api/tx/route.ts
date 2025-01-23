// export const dynamic = "force-static";
import { ServerAxios } from "@/lib/Axios/server";
import { type NextRequest } from "next/server";
// import * as T from "@/types";
// import { getReqestBody } from "@/utils/server";

export async function GET(request: NextRequest) {
  const txHash = request.nextUrl.searchParams.get("hash");

  let result, statusCode;

  try {
    const { data: d, status: s } = await ServerAxios.get(
      `verify-hash?txHash=${txHash}`
    );
    result = d;
    statusCode = s;
  } catch (e: any) {
        console.log({e})
    result = "Not found";
    statusCode = 404;
  }

  const response = new Response(
    JSON.stringify({ data: result, status: statusCode }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );

  return response;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { address, type, amount, refBonus } = body;

  let result, statusCode;

  try {
    const { data: d, status: s } = await ServerAxios.post(`save-stat`, {
      type,
      amount,
      refBonus
    });
    result = d;
    if (s === 201) {
      const { data: da } = await ServerAxios.post(`user`, {
        address,
        amount,
      });
      result = da;
    }
    result = "ok";
    statusCode = 201;
  } catch (e: any) {
    console.log({e})
    result = "Error";
    statusCode = 500;
  }

  const response = new Response(
    JSON.stringify({ data: result, status: statusCode }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );

  return response;
}
