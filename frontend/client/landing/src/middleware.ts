import axios from "axios";
import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

// Middleware function
export async function middleware(req: NextRequest) {
  const { host } = req.nextUrl;
  
  console.log({host})
  
  let proceed = true;
  let isValid = false;
  let attempts = 0;
  let maxAttempts = 3; // Reduced to account for Vercel's timeout
  let limit = 1000; // Reduced to 1 second
  const initialDelay = 2000; // 2 seconds initial delay for cold starts
  let totalTimeout = 0; // To keep track of total time spent
  
  const maxTotalTimeout = 55000; // 55 seconds, leaving 5 seconds buffer for Vercel's 60-second limit

  let pingUrl = "https://api.nestage.io/api/v1/ping";

  if (host.includes(":4110")) {
    pingUrl = "http://localhost:1335/api/v1/ping";
    proceed = false;
    isValid = true;
    maxAttempts = 2;
    limit = 500;
  } else if (host.includes("v2-test")) {
    pingUrl = "https://prev-api.nestage.io/api/v1/ping";
  }

  if (proceed) {
    // Add initial delay to account for potential cold start
    await new Promise((resolve) => setTimeout(resolve, initialDelay));
    totalTimeout += initialDelay;
    
    while (!isValid && attempts < maxAttempts && totalTimeout < maxTotalTimeout) {
      console.log(`passed - ${attempts}`)
      try {
        const startTime = Date.now();
        const { data, status } = await axios.get(pingUrl, {
          timeout: 10000, // 10 seconds timeout for each request
          headers: {
            "Content-Type": "application/json",
          },
        });
        const endTime = Date.now();
        totalTimeout += (endTime - startTime);

        if (status !== 200) {
          console.error("Validation server error:", status);
          break;
        }

        if (data.status === "success") {
          isValid = true;
        } else {
          console.log("Validation not met, retrying...");
          await new Promise((resolve) => setTimeout(resolve, limit));
          totalTimeout += limit;
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
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
    return new NextResponse("Access denied", { status: 403 });
  }
}

export const config = {
  matcher: "/((?!api).*)",
};