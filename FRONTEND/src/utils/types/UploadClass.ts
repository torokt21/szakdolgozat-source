import { UploadChild } from "./UploadChild";

export type UploadClass = {
	Id?: number;
	Children: UploadChild[];
	Directory: string;
	FullPath: string;
};
