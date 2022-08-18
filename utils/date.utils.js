import { format, isValid, parseISO } from "date-fns";

export const dateFormatter = (dateString) => {
	if (!isValid(parseISO(dateString))) {
		return "No date";
	}
	const date = parseISO(dateString);
	return <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
};
