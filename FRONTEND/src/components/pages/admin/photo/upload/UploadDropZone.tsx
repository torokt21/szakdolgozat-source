import { FileWithPath, useDropzone } from "react-dropzone";
import { useCallback, useMemo } from "react";

import { UploadInstitution } from "../../../../../utils/types/UploadInstitution";
import _ from "lodash";

type DropZoneProps = {
	uploadInstitution: UploadInstitution;
	onFilesChanged: (uploadInst: UploadInstitution) => void;
};

const baseStyle = {
	flex: 1,
	display: "flex",
	//flexDirection: "column",
	alignItems: "center",
	padding: "20px",
	borderWidth: 2,
	borderRadius: 2,
	borderColor: "#eeeeee",
	borderStyle: "dashed",
	backgroundColor: "#fafafa",
	color: "#bdbdbd",
	outline: "none",
	transition: "border .24s ease-in-out",
};

const focusedStyle = {
	borderColor: "#2196f3",
};

const acceptStyle = {
	borderColor: "#00e676",
};

const rejectStyle = {
	borderColor: "#ff1744",
};

export default function UploadDropZone(props: DropZoneProps) {
	const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
		const [passedFiles, erroredFiles] = _.partition(acceptedFiles, (f) => {
			// Trim slash from the beginning
			if (!f.path) return false;
			const path = f.path.replace(/^\/+|\/+$/g, "");

			const split = path.split("/");

			if (split.length !== 4) return false;

			return true;
		});

		if (
			erroredFiles.length > 0 &&
			!confirm(
				`Az ellenőrzés során ${erroredFiles.length} db kép nem a megfelelő mappában van, mint például a következő:\r\n${erroredFiles[0]?.path}\r\nSzeretné folytatni a további ${passedFiles.length} kép felöltését?`
			)
		)
			return;

		if (passedFiles.length == 0) return;

		props.onFilesChanged(mergeUploadInstitutionModel(props.uploadInstitution, acceptedFiles));
	}, []);
	const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
		noClick: true,
		onDrop: onDrop,
	});

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isFocused ? focusedStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isFocused, isDragAccept, isDragReject]
	);

	return (
		<div className="container">
			<div {...getRootProps({ style })}>
				<input {...getInputProps()} />
				<p>Húzza ide a feltölteni kívánt mappát!</p>
			</div>
		</div>
	);
}

/** Merges all accepted files into the upload institution object. Does not overwrite already existing files */
function mergeUploadInstitutionModel(uploadInstitution: UploadInstitution, files: FileWithPath[]) {
	const uInst = _.cloneDeep(uploadInstitution);
	// Builds the uploadInstitution object
	files.forEach((file) => {
		const split = file.path!.replace(/^\/+|\/+$/g, "").split("/");
		const institutionDir = split[0];
		const classDir = split[1];
		const childDir = split[2];

		let foundClass = uInst.classes.find((c) => c.directory == classDir);
		if (!foundClass) {
			foundClass = {
				children: [],
				directory: classDir,
				fullPath: `${institutionDir}/${classDir}`,
			};
			uInst.classes = [...uInst.classes, foundClass];
		}

		let foundChild = foundClass.children.find((c) => c.directory == childDir);
		if (!foundChild) {
			foundChild = {
				pictures: [],
				directory: childDir,
				fullPath: `${institutionDir}/${classDir}/${childDir}`,
			};
			foundClass.children = [...foundClass.children, foundChild];
		}

		// Checking if the picture is already stored
		const foundPicture = foundChild.pictures.find(
			(p) => p.path === file.path && p.size === file.size
		);
		if (!foundPicture) foundChild.pictures = [...foundChild.pictures, file];
	});

	return uInst;
}
