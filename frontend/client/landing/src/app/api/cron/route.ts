import {NextResponse} from 'next/server';
import axios from "axios";

export async function GET() {
  
  let pingUrl = "https://api.nestage.io/api/v1/ping"
  
  if (process.env.MODE === 'prev') {
    pingUrl = "https://prev-api.nestage.io/api/v1/ping"
  }
  
  try {
    await axios.get(pingUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    
    return NextResponse.json({ok: true});
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Error during validation:", err.response?.status || err.message)
    } else {
      console.error("Unexpected error during validation:", (err as Error).message)
    }
  }
}