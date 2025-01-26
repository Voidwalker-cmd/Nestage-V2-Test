import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import axios from "axios";

// const EXCLUDED_PATHS = ["/api"];
// const ALLOWED_ORIGINS = [
//   "https://nestage.io",
//   "https://v2-testing.nestage.io",
//   "http://localhost:4110/"
// ];

export async function middleware(req: NextRequest) {
  const {host} = req.nextUrl;
  
  
  // if (
  //   EXCLUDED_PATHS.some((excludedPath) => pathname.startsWith(excludedPath))
  // ) {
  //   return NextResponse.next();
  // }
  //
  //
  // const referer = req.headers.get("referer") || "";
  // const origin = req.headers.get("origin") || "";
  //
  // const isOriginAllowed = ALLOWED_ORIGINS.some((allowedOrigin) => {
  //   return referer.startsWith(allowedOrigin) || origin === allowedOrigin;
  // });
  //
  // console.log({isOriginAllowed, referer, origin})
  // if (!isOriginAllowed) {
  //   return new NextResponse("Forbidden: Not allowed to visit", { status: 403 });
  // }
  
  let proceed = !!1;
  let isValid = !!0;
  let attempts = 0;
  let maxAttempts = 20;
  let limit = 1500
  
  let pingUrl = "https://api.nestage.io/api/v1/ping";
  
  if (host.includes(":4110")) {
    pingUrl = "http://localhost:1335/api/v1/ping";
    proceed = !!0;
    isValid = !!1;
    maxAttempts = 5
    limit = 500
  } else if (host.includes("testing")) {
    pingUrl = "https://prev-api.nestage.io/api/v1/ping";
  }
  
  
  if (proceed) {
    while (!isValid && attempts < maxAttempts) {
      try {
        const {data, status} = await axios.get(pingUrl, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (status !== 200) {
          console.error("Validation server error:", status);
          break;
        }
        
        if (data.status === "success") {
          isValid = !!1;
        } else {
          console.log("Validation not met, retrying...");
          await new Promise((resolve) => setTimeout(resolve, limit));
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Error during validation:", err.response?.status || err.message);
        } else {
          console.error("Unexpected error during validation:", (err as Error).message);
        }
        break;
      }
      
      attempts++;
    }
  }
  if (isValid) {
    return NextResponse.next();
  } else {
    return new NextResponse("Access denied", {status: 403});
  }
}

export const config = {
  matcher: "/((?!api).*)",
};
