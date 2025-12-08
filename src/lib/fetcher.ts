// Generic fetcher function for SWR
// Handles JSON parsing and error handling for API requests
export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    const errorMessage = `Failed to fetch: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  const data: T = await response.json();
  return data;
};
