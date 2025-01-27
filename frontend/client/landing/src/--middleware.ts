import axios from "axios";
import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

// Middleware function
export async function middleware(req: NextRequest) {
  const {host} = req.nextUrl;
  
  let proceed = !!1;
  let isValid = !!0;
  let attempts = 0;
  let maxAttempts = 20;
  let limit = 1500;
  
  let pingUrl = "https://api.nestage.io/api/v1/ping";
  
  if (host.includes(":4110")) {
    pingUrl = "http://localhost:1335/api/v1/ping";
    proceed = !!0;
    isValid = !!1;
    maxAttempts = 5;
    limit = 500;
  } else if (host.includes("testing")) {
    pingUrl = "https://prev-api.nestage.io/api/v1/ping";
  }
  
  if (proceed) {
    while (!isValid && attempts < maxAttempts) {
      try {
        const {data, status} = await axios.get(pingUrl, {
          timeout: 9500,
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
          // Retry if timeout occurs or response is not received
          if (err.code === 'ECONNABORTED') {
            console.error("Request timed out. Retrying...");
          } else {
            console.error("Error during validation:", err.response?.status || err.message);
          }
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