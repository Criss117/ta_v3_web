import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
	fetchOptions: {
		credentials: "include", // This is crucial
	},
});
