// export const dynamic = "force-static";
import { ServerAxios } from "@/lib/Axios/server";
// import { type NextRequest } from "next/server";
// import * as T from "@/types";
// import { getReqestBody } from "@/utils/server";

export async function GET() {
  //   const data = await getReqestBody(request);
    const { data, status } = await ServerAxios.get(
      `admin-address`
    );
  const response = new Response(
    JSON.stringify({ data, status }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

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
