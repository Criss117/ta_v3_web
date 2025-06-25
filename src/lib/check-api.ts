export async function checkApi() {
	const apiUrl = import.meta.env.VITE_API_URL;

	if (!apiUrl) {
		throw new Error("VITE_API_URL is not set");
	}

	const response = await fetch(`${apiUrl}/health`);

	if (!response.ok) {
		throw new Error("API is not available");
	}

	return response;
}
