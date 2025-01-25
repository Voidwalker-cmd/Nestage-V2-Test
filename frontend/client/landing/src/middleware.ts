import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// const EXCLUDED_PATHS = ["/api"];
// const ALLOWED_ORIGINS = [
//   "https://nestage.io",
//   "https://v2-testing.nestage.io",
//   "http://localhost:4110/"
// ];

export async function middleware(req: NextRequest) {
  const { host } = req.nextUrl;


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
  const maxAttempts = 5;

  let pingUrl = "https://api.nestage.io/api/v1/ping";

  if (host.includes("localhost:4110")) {
    pingUrl = "https://localhost:4110/api/v1/ping";
    proceed = !!0;
    isValid = !!1;
  } else if (host.includes("testing")) {
    pingUrl = "https://prev-api.nestage.io:4110/api/v1/ping";
  }


  if (proceed) {
    while (!isValid && attempts < maxAttempts) {
      try {
        const response = await fetch(pingUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Validation server error:", response.status);
          break;
        }

        const data = await response.json();

        if (data.status === "success") {
          isValid = !!1;
        } else {
          console.log("Validation not met, retrying...");
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error("Error during validation:", error);
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
