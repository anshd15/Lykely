export const constants = {
	API_URL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5000',
	TOAST_MESSAGES: {
		loading: 'Loading...',
		success: 'Operation Successful',
		error: 'Something went wrong',
	},
};
