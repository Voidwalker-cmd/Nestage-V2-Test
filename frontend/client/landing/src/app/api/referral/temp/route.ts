import type { NextRequest } from "next/server";
import { ServerAxios } from "@/lib/Axios/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { address, ref } = body;

  let result, statusCode;

  try {
    const { data: d, status: s } = await ServerAxios.post(`tempReferral`, {
      address,
      refCode: ref,
    });
    result = d;
    statusCode = s;
  } catch (err) {
    const e = (err as Error).message;
    console.log({ e });
    result = "Error";
    statusCode = 500;
  }

  return new Response(JSON.stringify({ data: result, status: statusCode }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address");
  const { data, status } = await ServerAxios.get(
    `tempReferral?address=${address}`
  );
  return new Response(
    JSON.stringify({
      data: { code: data.refCode, lvlOne: data.lvlOne },
      status,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function PATCH(request: NextRequest) {
  const data = await request.json();

  const { address } = data;

  let result, statusCode;

  try {
    const { data: d, status: s } = await ServerAxios.patch(`tempReferral`, {
      address,
    });
    result = d;
    statusCode = s;
  } catch (err) {
    const e = (err as Error).message;
    console.log({ e });
    result = "Error";
    statusCode = 500;
  }

  return new Response(JSON.stringify({ data: result, status: statusCode }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
