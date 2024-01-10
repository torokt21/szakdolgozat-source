import { Box, Button, Fade, Grid, Modal, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
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
import { UploadChild } from "../../../../../utils/types/UploadChild";
import UploadIcon from "@mui/icons-material/Upload";
import { UploadInstitution } from "../../../../../utils/types/UploadInstitution";
import _ from "lodash";
import { makeStyles } from "@mui/styles";

type UploadFileBrowserProps = {
	uploadInstitution: UploadInstitution;
	selectedChild?: UploadChild;
	onFilesChanged: (uploadInstitution: UploadInstitution) => void;
	onSelectionChange: (selectedChildFullPath: string) => void;
	onUploadClick: () => void;
};

const useStyles = makeStyles(() => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		"&:hover": {
			backgroundcolor: "red",
		},
	},
	img: {
		outline: "none",
	},
}));

export default function UploadFileBrowser(props: UploadFileBrowserProps) {
	const [zoomedInFile, setZoomedInFile] = useState<FileWithPath>();
	const classes = useStyles();

	function handlePictureDeleteClick(child: UploadChild, file: FileWithPath) {
		const clone = _.cloneDeep(props.uploadInstitution);

		const foundChild = clone.classes
			.flatMap((f) => f.Children)
			.find((c) => c.fullPath == child.fullPath);

		if (!foundChild) throw Error("A gyermek nem található törlés közben");

		foundChild.pictures = foundChild.pictures.filter((p) => p.path != file.path);

		// Delete empty child folder
		clone.classes.forEach((cl) => {
			cl.Children = cl.Children.filter((c) => c.pictures.length > 0);
		});

		// Delete empty class folder
		clone.classes = clone.classes.filter((c) => c.Children.length > 0);

		props.onFilesChanged(clone);
	}

	function handleChildDelete(child?: UploadChild) {
		if (!child) return;
		if (!confirm("Biztosan törölni szeretnéd az egész mappát?")) return;

		const clone = _.cloneDeep(props.uploadInstitution);

		// Delete empty child folder
		clone.classes.forEach((cl) => {
			cl.Children = cl.Children.filter((c) => c.fullPath !== child.fullPath);
		});

		props.onFilesChanged(clone);
	}

	if (!props.uploadInstitution || props.uploadInstitution.classes.length == 0) return undefined;

	return (
		<Grid container>
			<Modal
				open={!!zoomedInFile}
				onClose={() => setZoomedInFile(undefined)}
				className={classes.modal}>
				<>
					{!!zoomedInFile && (
						<Fade in={!!zoomedInFile} timeout={500} className={classes.img}>
							<img
								src={URL.createObjectURL(zoomedInFile)}
								alt="asd"
								style={{ maxHeight: "90%", maxWidth: "90%" }}
							/>
						</Fade>
					)}
				</>
			</Modal>
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
							key={cl.Directory}
							nodeId={cl.Directory}
							label={
								<Box py={0.5} sx={{ display: "flex" }}>
									<FolderIcon />
									<Typography ml={1}>{cl.Directory}</Typography>
								</Box>
							}>
							{cl.Children.map((ch) => (
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
				<Box mt={2}>
					<Button
						variant="contained"
						color="primary"
						startIcon={<UploadIcon />}
						onClick={props.onUploadClick}>
						Feltöltés
					</Button>
				</Box>
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
						{props.selectedChild?.pictures.map((picture) => (
							<ImageListItem key={picture.path}>
								<img
									srcSet={URL.createObjectURL(picture)}
									src={URL.createObjectURL(picture)}
									alt={picture.name}
									loading="lazy"
									style={{ cursor: "zoom-in" }}
									onClick={() => setZoomedInFile(picture)}
								/>
								<ImageListItemBar
									title={picture.name}
									position="top"
									actionIcon={
										<IconButton
											sx={{ color: "rgba(255, 255, 255, 0.54)" }}
											onClick={() => {
												handlePictureDeleteClick(
													props.selectedChild!,
													picture
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
