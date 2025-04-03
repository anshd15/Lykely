export const constants = {
	API_URL: import.meta.env.VITE_SERVER_URI || 'http://localhost:3000',
	TOAST_MESSAGES: {
		loading: 'Loading...',
		success: 'Operation Successful',
		error: 'Something went wrong',
	},
};
