import axios from 'axios'

export async function GET() {
  let isValid = false
  let attempts = 0
  const maxAttempts = 5
  const limit = 1000 // 1 second between retries
  let totalTimeout = 0
  
  const maxTotalTimeout = 55000 // 55 seconds, leaving 5 seconds buffer for the 60-second limit
  
  let pingUrl = "https://api.nestage.io/api/v1/ping"
  
  // Check if we're in a development environment
  if (process.env.MODE === 'dev') {
    pingUrl = "http://localhost:1335/api/v1/ping"
    isValid = true // Skip validation in development
  } else if (process.env.MODE === 'prev') {
    pingUrl = "https://prev-api.nestage.io/api/v1/ping"
  }
  
  if (!isValid) {
    while (!isValid && attempts < maxAttempts && totalTimeout < maxTotalTimeout) {
      try {
        const startTime = Date.now()
        const {data, status} = await axios.get(pingUrl, {
          timeout: 10000, // 10 seconds timeout for each request
          headers: {
            "Content-Type": "application/json",
          },
        })
        const endTime = Date.now()
        totalTimeout += (endTime - startTime)
        
        if (status !== 200) {
          console.error("Validation server error:", status)
          break
        }
        
        if (data.status === "success") {
          isValid = true
        } else {
          console.log("Validation not met, retrying...")
          await new Promise((resolve) => setTimeout(resolve, limit))
          totalTimeout += limit
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.code === 'ECONNABORTED') {
            console.error("Request timed out. Retrying...")
          } else {
            console.error("Error during validation:", err.response?.status || err.message)
          }
        } else {
          console.error("Unexpected error during validation:", (err as Error).message)
        }
        break
      }
      attempts++
    }
  }
  
  let response
  
  if (isValid) {
    response = new Response(
      JSON.stringify({status: 'success', message: 'Access granted'}),
      {
        status: 200,
        headers: {"Content-Type": "application/json"},
      }
    );
  } else {
    response = new Response(
      JSON.stringify({status: 'error', message: 'Access denied'}),
      {
        status: 403,
        headers: {"Content-Type": "application/json"},
      }
    );
  }
  return response;
}