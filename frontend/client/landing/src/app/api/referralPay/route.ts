import { ServerAxios } from "@/lib/Axios/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body = await request.json();

  const { adminPay, userPay } = body;

  let result, statusCode;

  try {
    const { data: d, status: s } = await ServerAxios.post(`referral/pay`, {
      adminPay,
      userPay,
    });
    result = d;
    statusCode = s;
  } catch (e: any) {
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
