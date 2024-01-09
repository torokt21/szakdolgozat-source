import { TreeItem, TreeView } from "@mui/x-tree-view";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FileWithPath } from "react-dropzone";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import React from "react";
import { UploadChild } from "../../../../../utils/types/UploadChild";
import { UploadInstitution } from "../../../../../utils/types/UploadInstitution";
import _ from "lodash";

type UploadFileBrowserProps = {
	uploadInstitution: UploadInstitution;
	onFilesChanged: (uploadInstitution: UploadInstitution) => void;
	selectedChild?: UploadChild;
	onSelectionChange: (selectedChildFullPath: string) => void;
};

export default function UploadFileBrowser(props: UploadFileBrowserProps) {
	function handleDeleteClick(child: UploadChild, file: FileWithPath) {
		const clone = _.cloneDeep(props.uploadInstitution);

		const foundChild = clone.classes
			.flatMap((f) => f.children)
			.find((c) => c.fullPath == child.fullPath);

		if (!foundChild) throw Error("A gyermek nem található törlés közben");

		foundChild.pictures = foundChild.pictures.filter((p) => p.path != file.path);

		// Delete empty child folder
		clone.classes.forEach((cl) => {
			cl.children = cl.children.filter((c) => c.pictures.length > 0);
		});

		// Delete empty class folder
		clone.classes = clone.classes.filter((c) => c.children.length > 0);

		props.onFilesChanged(clone);
	}

	return (
		<Grid container>
			<Grid item xs={3}>
				<TreeView
					defaultCollapseIcon={<ExpandMoreIcon />}
					defaultExpandIcon={<ChevronRightIcon />}
					onNodeSelect={(e, nodeId) => props.onSelectionChange(nodeId)}>
					{props.uploadInstitution.classes.map((cl) => (
						<TreeItem key={cl.directory} nodeId={cl.directory} label={cl.directory}>
							{cl.children.map((ch) => (
								<TreeItem
									key={ch.fullPath}
									nodeId={ch.fullPath}
									label={ch.directory}
								/>
							))}
						</TreeItem>
					))}
				</TreeView>
			</Grid>
			<Grid item xs={9}>
				{props.selectedChild && (
					<ImageList cols={4}>
						<ImageListItem key="Subheader" cols={4}>
							<ListSubheader component="div">
								Képek a következő mappából: {props.selectedChild?.fullPath}
							</ListSubheader>
						</ImageListItem>
						{props.selectedChild?.pictures.map((item) => (
							<ImageListItem key={item.path}>
								<img
									srcSet={URL.createObjectURL(item)}
									src={URL.createObjectURL(item)}
									alt={item.name}
									loading="lazy"
								/>
								<ImageListItemBar
									title={item.name}
									position="top"
									actionIcon={
										<IconButton
											sx={{ color: "rgba(255, 255, 255, 0.54)" }}
											onClick={() => {
												handleDeleteClick(props.selectedChild!, item);
											}}>
											<DeleteIcon />
										</IconButton>
									}
								/>
							</ImageListItem>
						))}
					</ImageList>
				)}
			</Grid>
		</Grid>
	);
}
