const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_URL is missing. Check your .env configuration.");
}

export async function analyzeDeal(payload: any) {
  const controller = new AbortController();

  // 25s is perfect for Render cold start
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(`${API_BASE_URL}/deal/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    // Attempt to parse response safely
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Backend error:", data);
      throw new Error(`Backend returned ${response.status}`);
    }

    return data;

  } catch (error: any) {

    if (error.name === "AbortError") {
      throw new Error("Request timed out. Backend may be waking up.");
    }

    throw error;

  } finally {
    clearTimeout(timeout);
  }
}
