import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { TreeItem, TreeView } from "@mui/x-tree-view";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FileWithPath } from "react-dropzone";
import FolderIcon from "@mui/icons-material/Folder";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
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
	function handlePictureDeleteClick(child: UploadChild, file: FileWithPath) {
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

	function handleChildDelete(child?: UploadChild) {
		if (!child) return;
		if (!confirm("Biztosan törölni szeretnéd az egész mappát?")) return;

		const clone = _.cloneDeep(props.uploadInstitution);

		// Delete empty child folder
		clone.classes.forEach((cl) => {
			cl.children = cl.children.filter((c) => c.fullPath !== child.fullPath);
		});

		props.onFilesChanged(clone);
	}

	return (
		<Grid container>
			<Grid item xs={3}>
				<Typography variant="h6" component="h3">
					Mappák:
				</Typography>
				<TreeView
					defaultCollapseIcon={<ExpandMoreIcon />}
					defaultExpandIcon={<ChevronRightIcon />}
					onNodeSelect={(e, nodeId) => props.onSelectionChange(nodeId)}>
					{props.uploadInstitution.classes.map((cl) => (
						<TreeItem
							key={cl.directory}
							nodeId={cl.directory}
							label={
								<Box py={0.5} sx={{ display: "flex" }}>
									<FolderIcon />
									<Typography ml={1}>{cl.directory}</Typography>
								</Box>
							}>
							{cl.children.map((ch) => (
								<TreeItem
									key={ch.fullPath}
									nodeId={ch.fullPath}
									label={
										<Box py={0.5} sx={{ display: "flex" }}>
											<FolderSharedIcon />
											<Typography ml={1}>{ch.directory}</Typography>
										</Box>
									}
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
								<Box sx={{ display: "flex" }} pb={3}>
									<Box sx={{ flexGrow: 1 }}>
										<strong>Képek a következő mappából:</strong>{" "}
										{props.selectedChild?.fullPath}
									</Box>
									<Tooltip title="Mappa törlése">
										<IconButton
											color="error"
											onClick={() => handleChildDelete(props.selectedChild)}>
											<DeleteIcon />
										</IconButton>
									</Tooltip>
								</Box>
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
												handlePictureDeleteClick(
													props.selectedChild!,
													item
												);
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
