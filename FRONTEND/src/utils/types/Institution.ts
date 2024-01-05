import Class from "./Class";
import dayjs from "dayjs";

type Institution = {
	id: number;
	name: string;
	shortcode: string;
	contactInfo: string | null;
	photographerId: string | null;
	softDeadline: dayjs.Dayjs;
	hardDeadline: dayjs.Dayjs;
	expectedShippingStart: dayjs.Dayjs;
	expectedShippingEnd: dayjs.Dayjs;
	displayMessage: string | null;
	classes: Class[];
};

export default Institution;
