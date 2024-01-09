import { FileWithPath } from "react-dropzone";

export type UploadChild = {
	pictures: FileWithPath[];
	directory: string;
};
