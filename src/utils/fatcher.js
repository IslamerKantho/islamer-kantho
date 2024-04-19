export const fetcher = (url) => {
	if (!url) return;

	return fetch(url);
};
