import dayjs from "dayjs";

type Institution = {
	id: number;
	name: string;
	shortcode: string;
	contactInfo: string;
	photographerId: string;
	softDeadline: dayjs.Dayjs;
	hardDeadline: dayjs.Dayjs;
	expectedShippingStart: dayjs.Dayjs;
	expectedShippingEnd: dayjs.Dayjs;
	displayMessage: string;
};

export default Institution;
