import Class from "./Class";
import dayjs from "dayjs";

type Institution = {
	Id: number;
	Name: string;
	Shortcode: string;
	ContactInfo: string | null;
	PhotographerId: string | null;
	SoftDeadline: dayjs.Dayjs;
	HardDeadline: dayjs.Dayjs;
	ExpectedShippingStart: dayjs.Dayjs;
	ExpectedShippingEnd: dayjs.Dayjs;
	DisplayMessage: string | null;
	Classes: Class[];
};

export default Institution;
