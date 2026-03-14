export function encodeData(data: any): string {
  const json = JSON.stringify(data);
  const base64 = btoa(encodeURIComponent(json));
  // Make URL-safe: + -> -, / -> _, and remove padding =
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeData(slug: string): any {
  if (!slug) return null;
  try {
    // Restore original Base64: - -> +, _ -> /
    let base64 = slug.replace(/-/g, '+').replace(/_/g, '/');
    // Add back padding if necessary
    while (base64.length % 4) {
      base64 += '=';
    }
    const json = decodeURIComponent(atob(base64));
    return JSON.parse(json);
  } catch (e) {
    console.error("Failed to decode invitation data:", e);
    return null;
  }
}
