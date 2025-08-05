export async function validateResponse(response: Response): Promise<void> {
  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || "Request failed");
    } catch {
      throw new Error(errorText || "Unknown error");
    }
  }
}