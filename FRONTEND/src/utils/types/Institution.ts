type Institution = {
	id: number;
	name: string;
	shortcode: string;
	contactInfo: string;
	photographerId: string;
	softDeadline: Date;
	hardDeadline: Date;
	expectedShippingStart: Date;
	expectedShippingEnd: Date;
	displayMessage: string;
};

export default Institution;
